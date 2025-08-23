"use client"

import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface SocketContextType {
  ws: WebSocket | null
  isConnected: boolean
  joinRoom: (room: string) => void
  setLanguage: (language: string) => void
  otherLanguage: string
  onUserJoined: (callback: (data: { room: string, userCount: number, isSecondUser: boolean }) => void) => void
}

const SocketContext = createContext<SocketContextType | null>(null)

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const wsRef = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [otherLanguage, setOtherLanguage] = useState('')
  const userJoinedCallbackRef = useRef<((data: { room: string, userCount: number, isSecondUser: boolean }) => void) | null>(null)

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('Connected to WebSocket server:', wsUrl)
      setIsConnected(true)
    }

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      if (msg.type === 'peer-language') {
        setOtherLanguage(msg.payload.language)
      }
      if (msg.type === 'user-joined' && userJoinedCallbackRef.current) {
        userJoinedCallbackRef.current(msg.payload)
      }
    }

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server')
      setIsConnected(false)
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setIsConnected(false)
    }

    return () => {
      ws.close()
    }
  }, [])

  const joinRoom = (room: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'join', payload: { room } }))
    }
  }

  const setLanguage = (language: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'set-language', payload: { language } }))
    }
  }

  const onUserJoined = (callback: (data: { room: string, userCount: number, isSecondUser: boolean }) => void) => {
    userJoinedCallbackRef.current = callback
  }

  const value: SocketContextType = {
    ws: wsRef.current,
    isConnected,
    joinRoom,
    setLanguage,
    otherLanguage,
    onUserJoined
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}
