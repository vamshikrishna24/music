"use client";
import { Themetoggler } from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppState } from "@/store/store";
import Link from "next/link";

const Home = () => {
  const { setSolo, setGroup } = useAppState();
  function handleSoloClick() {
    setSolo(true);
    setGroup(false);
  }

  function handleGroupClick() {
    setGroup(true);
    setSolo(false);
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
              <Link href="/music">Solo</Link>
            </Button>
            <Button onClick={handleGroupClick}>
              <Link href="/music">Group</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
