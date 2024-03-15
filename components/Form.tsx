"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { DrawerClose } from "./ui/drawer";
import { UserData } from "@/typings";

const FormSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  roomId: z.string().min(4, {
    message: "Room ID must be at least 4 characters.",
  }),
});

export function InputForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const userData: UserData = {
      username: data.username,
      roomId: Number(data.roomId),
      solo: false,
      group: true,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    router.push("/music");
  }

  return (
    <div className="flex items-center justify-center m-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room ID</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Room ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3 h-[120px]"></div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </form>
      </Form>
    </div>
  );
}
