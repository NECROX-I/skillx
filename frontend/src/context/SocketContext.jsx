import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'
import { useNotificationStore } from '../store/notificationStore'

const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const socketRef  = useRef(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {

    const connect = () => {
      if (socketRef.current?.connected) return
      const token = localStorage.getItem('accessToken')
      if (!token) return

      const url    = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
      const socket = io(url, {
        auth:                 { token },
        transports:           ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay:    1000,
      })

      socket.on('connect',    () => setConnected(true))
      socket.on('disconnect', () => setConnected(false))

      socket.on('chat:receive', () => {
        useNotificationStore.getState().incrementUnread()
      })

      socket.on('session:new_request', data => {
        useNotificationStore.getState().addNotification({
          type: 'session_request', title: '📅 New session request',
          body: `${data.learnerName} wants to learn ${data.skillName}`,
          sessionId: data.sessionId,
        })
        toast.success(`📅 ${data.learnerName} wants to learn ${data.skillName}`, { duration: 5000 })
      })

      socket.on('session:accepted', data => {
        useNotificationStore.getState().addNotification({
          type: 'session_accepted', title: '✅ Session accepted!',
          body: 'Your session has been accepted.',
          sessionId: data.sessionId,
        })
        toast.success('✅ Your session was accepted!', { duration: 5000 })
      })

      socket.on('session:cancelled', data => {
        useNotificationStore.getState().addNotification({
          type: 'session_cancelled', title: '❌ Session cancelled',
          body: data.reason ? `Reason: ${data.reason}` : 'A session was cancelled.',
          sessionId: data.sessionId,
        })
        toast.error(
          data.refunded ? 'Session cancelled — credit refunded' : 'Session cancelled',
          { duration: 5000 }
        )
      })

      socket.on('session:meeting_updated', data => {
        useNotificationStore.getState().addNotification({
          type: 'meeting_link', title: '🔗 Meeting link updated',
          body: `${data.updatedBy} set the meeting link.`,
          sessionId: data.sessionId,
        })
        toast('🔗 Meeting link was updated', { duration: 4000 })
      })

      socket.on('session:reminder', data => {
        useNotificationStore.getState().addNotification({
          type: 'reminder', title: '⏰ Session starting soon',
          body: data.message, sessionId: data.sessionId,
        })
        toast(`⏰ ${data.message}`, { icon: '📅', duration: 8000 })
      })

      socket.on('session:rate_prompt', data => {
        useNotificationStore.getState().addRatingPrompt(data.sessionId)
        useNotificationStore.getState().addNotification({
          type: 'rate_prompt', title: '⭐ Rate your session',
          body: 'Your session is complete. Leave a rating for your partner.',
          sessionId: data.sessionId,
        })
        toast.success('Session complete! Please rate your partner.', { duration: 6000 })
      })

      socketRef.current = socket
    }

    const disconnect = () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
        setConnected(false)
      }
    }

    // Connect immediately if already logged in when this mounts
    if (useAuthStore.getState().user?._id) connect()

    // Subscribe to auth store changes OUTSIDE React's render cycle.
    // This fires only when user._id actually changes (login/logout).
    // Re-renders of SocketProvider from ANY cause never trigger this.
    const unsub = useAuthStore.subscribe(
      s => s.user?._id,
      (userId, prevUserId) => {
        if (userId && !prevUserId)   connect()     // logged in
        if (!userId && prevUserId)   disconnect()  // logged out
        // same userId = token refresh or profile update — do nothing
      }
    )

    return () => { unsub(); disconnect() } // only on app unmount
  }, []) // ← EMPTY DEPS — this effect runs exactly once, forever immune to re-renders

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)