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
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Chat = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span>Chat</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat space</SheetTitle>
          <SheetDescription>Will be added later</SheetDescription>
        </SheetHeader>
        <div
          className="flex flex-col"
          style={{ height: "calc(100vh - 145px)" }}
        >
          <div className="flex-grow"></div>
        </div>
        <SheetFooter>
          <div className="flex gap-x-2">
            <Input />
            <Button>Send</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Chat;
