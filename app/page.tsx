"use client";
import { InputForm } from "@/components/Form";
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
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppState } from "@/store/store";

import { UserData } from "@/typings";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const { setNavigation } = useAppState();
  function handleSoloClick() {
    const userData: UserData = {
      username: null,
      roomId: null,
      solo: true,
      group: false,
      navigation: "/online",
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    router.replace("/online");
    setNavigation("/online");
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
                    </DrawerHeader>
                    <InputForm />
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
