import React, { useRef } from "react";
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
import { useRouter } from "next/navigation";
import { useAppState } from "@/store/store";
import { cn } from "@/lib/utils";

const options = [
  { Home: "/" },
  { "Online songs": "/online" },
  { "Uploaded songs": "/music" },
];

const Menu = () => {
  const router = useRouter();
  const { navigation, setNavigation } = useAppState();
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleClick = (option: any) => {
    const key = Object.keys(option)[0];
    const route = option[key];
    router.push(route);
    setNavigation(route);
    btnRef.current?.click();
  };

  return (
    <Sheet>
      <SheetTrigger>Music App</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
        <SheetHeader>
          <SheetTitle>MENU</SheetTitle>
          <SheetDescription>choose where to go</SheetDescription>
        </SheetHeader>

        {options.map((option, index) => (
          <div
            className={cn(
              //@ts-ignore
              navigation === option[Object.keys(option)[0] as string]
                ? "bg-gray-300 font-bold"
                : "",
              "text-left hover:bg-gray-200 cursor-pointer p-2 rounded-lg "
            )}
            onClick={() => handleClick(option)}
            key={index}
          >
            {Object.keys(option)[0]}
          </div>
        ))}

        <SheetFooter>
          <SheetClose asChild>
            <button ref={btnRef} className="hidden">
              Save changes
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
