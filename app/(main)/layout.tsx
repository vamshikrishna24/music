import Header from "@/components/Header";
import { SocketProvider } from "@/components/socket-provider";

import { Toaster } from "react-hot-toast";

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <Header />
      {children}
      <Toaster />
    </SocketProvider>
  );
}
