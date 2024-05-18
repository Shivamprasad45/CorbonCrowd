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
import MaxWidthRappers from "./MaxWidthRapper";
import CompanyForm from "../Featuers/Data/Components/TableForm";

const Drawers = () => {
  return (
    <MaxWidthRappers className="">
      <Drawer>
        <DrawerTrigger className="bg-black rounded-md p-2">
          {" "}
          <PlusIcon className="w-6 h-6 stroke-white" />
        </DrawerTrigger>
        <DrawerContent className="flex justify-center  items-center">
          <DrawerHeader>
            <DrawerTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Emisson form
            </DrawerTitle>

            <CompanyForm />
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </MaxWidthRappers>
  );
};

export default Drawers;
