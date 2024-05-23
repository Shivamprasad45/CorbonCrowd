"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CompanyForm from "../Featuers/Data/Components/TableForm";

const Drawers = () => {
  return (
    <div className="">
      <Drawer>
        <DrawerTrigger className="rounded-md bg-black p-2 ">
          {" "}
          <PlusIcon className="w-6 h-6 stroke-white" />
        </DrawerTrigger>

        <DrawerContent className="  w-full flex max-w-xl ">
          <DrawerHeader>
            <DrawerTitle className="scroll-m-20 text-2xl font-semibold tracking-tight  text-center">
              Emisson form
            </DrawerTitle>
            <div className=" items-center flex justify-center ">
              <CompanyForm />
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Drawers;
