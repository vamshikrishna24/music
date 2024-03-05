"use client";
import { Themetoggler } from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const { setSolo, setGroup } = useAppState();
  function handleSoloClick() {
    setSolo(true);
    setGroup(false);
    router.push("/music");
  }

  function handleGroupClick() {
    setGroup(true);
    setSolo(false);
    router.push("/music");
  }
  return (
    <div className=" flex flex-col h-screen">
      <div className="flex flex-row-reverse w-full">
        <Themetoggler />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-[350px] ">
          <CardHeader>
            <CardTitle>Welcome to Music App</CardTitle>
            <CardDescription>Select the Session you want</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSoloClick}>
              Solo
            </Button>
            <div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button>Group</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                      <DrawerTitle>Enter below Creds</DrawerTitle>
                      <DrawerDescription>
                        Upcoming feature, you can just click sumbit for now
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex-1 ">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Name"
                            className="mt-1"
                          />
                          <div className="mt-3"></div>
                          <Label htmlFor="room">Room ID</Label>
                          <Input
                            id="room"
                            type="number"
                            placeholder="Room ID"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="mt-3 h-[120px]"></div>
                    </div>
                    <DrawerFooter>
                      <Button onClick={handleGroupClick}>Submit</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
