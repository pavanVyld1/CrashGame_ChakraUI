// SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import socketService from './socketService';

type SocketContextType = {
  emit: (event: string, data?: any) => void;
  on: <T = any>(event: string, callback: (data: T) => void) => void;
  off: (event: string) => void;
  isConnected: boolean;
  socketId: string | null;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  token: string;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ token, children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState<string | null>(null);

  useEffect(() => {
    socketService.connect(token);

    const updateConnectionStatus = () => {
      setIsConnected(socketService.isConnected());
      setSocketId(socketService.getSocketId());
    };

    socketService.on('connect', updateConnectionStatus);
    socketService.on('disconnect', updateConnectionStatus);

    return () => {
      socketService.disconnect();
    };
  }, [token]);

  const value: SocketContextType = {
    emit: socketService.emit.bind(socketService),
    on: socketService.on.bind(socketService),
    off: socketService.off.bind(socketService),
    isConnected,
    socketId,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
