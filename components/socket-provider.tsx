"use client";

import { useAppState } from "@/store/store";
import {
  PropsWithChildren,
  createContext,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = { socket: Socket | null };

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  const socketRef = useRef<Socket | null>(null);
  const [hasSocket, setHasSocket] = useState<boolean | null>(false);
  const [soloConnection, setSoloConnection] = useState<boolean | null>(false);
  const { solo, group } = useAppState();

  useEffect(() => {
    if (solo) {
      socketRef.current = null;
      setSoloConnection(true);
      setHasSocket(null);
    }
    if (group) {
      if (!socketRef.current) {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
        socket.on("connect", () => {
          socketRef.current = socket;
          setHasSocket(true);
        });
        socket.on("disconnect", () => {
          setHasSocket(false);
        });
      }
    }
  }, []);

  let value: SocketContextType = {
    socket: socketRef.current,
  };

  if (hasSocket === false)
    return (
      <div className="flex items-center justify-center h-screen text-3xl bg-slate-800 text-white">
        Connecting to socket...
      </div>
    );

  if (soloConnection == true) {
    value = { socket: null };
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const value = use(SocketContext);
  if (!value) throw new Error("Not wrapped with SocketProvider");
  return value;
}
