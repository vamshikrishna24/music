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

type SocketContextType = {
  socket: Socket | null;
  roomId: Number | null;
  username: string | null;
};

const SocketContext = createContext<SocketContextType | null>(null);

function getUserDataObjectFromLocalStorage(): {
  username: string | null;
  roomId: number | null;
  solo: boolean;
  group: boolean;
} {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return { username: "", roomId: null, solo: false, group: false };
  }

  const userDataString = localStorage.getItem("userData") || "";
  return JSON.parse(userDataString);
}

export function SocketProvider({ children }: PropsWithChildren) {
  const socketRef = useRef<Socket | null>(null);
  const { setGroup, setSolo } = useAppState();

  const [hasSocket, setHasSocket] = useState<boolean | null>(false);
  const { solo, group, roomId, username } = getUserDataObjectFromLocalStorage();

  useEffect(() => {
    setSolo(solo);
    setGroup(group);
    if (solo) {
      socketRef.current = null;
      setHasSocket(null);
    }
    if (group) {
      if (!socketRef.current) {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
        socket.on("connect", () => {
          socketRef.current = socket;
          setHasSocket(true);
          socket.emit("join-room", roomId);
        });
        socket.on("disconnect", () => {
          setHasSocket(false);
        });
      }
    }
  }, []);

  let value: SocketContextType = {
    socket: socketRef.current,
    roomId,
    username,
  };

  if (hasSocket === false)
    return (
      <div className="flex items-center justify-center h-screen text-3xl bg-slate-200  dark:bg-slate-800 dark:text-white">
        Connecting to socket...
      </div>
    );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const value = use(SocketContext);
  if (!value) throw new Error("Not wrapped with SocketProvider");
  return value;
}
