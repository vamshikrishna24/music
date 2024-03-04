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

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <div className="flex flex-row-reverse w-full">
//             <Themetoggler />
//           </div>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
