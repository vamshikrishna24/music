"use client";

import {
  PropsWithChildren,
  createContext,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = { socket: Socket };

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  const socketRef = useRef<Socket | null>(null);
  const [hasSocket, setHasSocket] = useState<boolean>(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
      setHasSocket(true);
    }
  }, []);

  const value = {
    socket: socketRef.current!,
  };

  if (hasSocket == false) return "Connecting to socket...";
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const value = use(SocketContext);
  if (!value) throw new Error("Not wrapped with SocketProvider");
  return value;
}
