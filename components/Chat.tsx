"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { MessageData } from "@/typings";
import { useSocket } from "./socket-provider";
import { v4 as uuid } from "uuid";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { userId, username, socket, roomId } = useSocket();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  socket?.on("receiveMessage", (data) => {
    setMessages((msgs) => {
      if (msgs.some((msg) => msg.Id === data.Id)) {
        return msgs;
      }
      return [...msgs, data];
    });
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClick = () => {
    if (message === "") return;
    const constMessage: MessageData = {
      userId,
      username,
      message,
      Id: uuid(),
    };
    setMessages((msgs) => [...msgs, constMessage]);
    setMessage("");
    socket?.emit("sendMessage", constMessage, roomId);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <span>Chat</span>
      </SheetTrigger>
      <SheetContent className="w-full ">
        <SheetHeader>
          <SheetTitle>Chat space</SheetTitle>
          {/* <SheetDescription>Will be added later</SheetDescription> */}
        </SheetHeader>
        <div
          className="flex flex-col"
          style={{ height: "calc(100vh - 160px)" }}
        >
          <div
            className="flex-grow overflow-y-scroll my-3"
            ref={chatContainerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`bg-slate-200 dark:bg-slate-700 p-2 my-2 flex flex-col max-h-max max-w-max rounded-lg ${
                  msg.userId === userId ? "ml-auto" : ""
                }`}
              >
                {msg.userId !== userId && (
                  <div className="font-bold text-sm">{msg.username}</div>
                )}
                <div className="whitespace-normal break-words">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="flex gap-x-2 mb-3 w-full">
            <Input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleClick();
              }}
            />
            <Button onClick={handleClick}>Send</Button>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Chat;
