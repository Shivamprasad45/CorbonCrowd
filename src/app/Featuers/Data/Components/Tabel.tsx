"use client";
import React, { useEffect, useState } from "react";
import MaxWidthRappers from "@/app/components/MaxWidthRapper";
import Navbar from "@/app/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RiExternalLinkLine } from "react-icons/ri";
import {
  ItemSelector,
  ItemStatus,
  PageCarbonAmetionDataAsync,
  SortActios,
} from "../DataSlice";
import CompanyForm from "./TableForm";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Tabelpagination from "./Tabelpagination";

import { MdExpandLess, MdExpandMore } from "react-icons/md";

import { IoCaretDown, IoCaretUpSharp, IoCloseSharp } from "react-icons/io5";

import Drawers from "@/app/components/Drawer";
import { DrawerDialogDemo } from "@/app/components/EditDrawer";

const Tabel = () => {
  interface CompanyData {
    name: string;
    sector: string;
    country: string;
    scope1: number;
    scope2: number;
    scope3: number;
    emission_intensity: number;
    emission_intensity_unit: string;
    emission_intensity_derived_by: string;
    childLaborFree: boolean;
    is_msme: boolean;
    recordYear: string;
    link_childlabour: any;
    esg: any;
  }
  interface sortInter {
    field: string;
    method: string;
  }
  const dispatch = useDispatch();
  const DataTabel = useSelector(ItemSelector);
  const TabelStatus = useSelector(ItemStatus);
  const [Open, setOpen] = useState<number>();
  console.log(TabelStatus, "table status");
  const [ShowImage, setShowImage] = useState<boolean>(false);
  const [ImageUrl, setImageUrl] = useState<string | undefined>();
  const [SortIndex, setSortIndex] = useState<sortInter>({
    field: "scope1",
    method: "Asc",
  });
  const [SortIndex2, setSortIndex2] = useState<sortInter>({
    field: "scope2",
    method: "Asc",
  });
  const [SortIndex3, setSortIndex3] = useState<sortInter>({
    field: "scope3",
    method: "Asc",
  });
  //Image open logic
  const ImageOpen = (Image: string) => {
    setShowImage(true);
    setImageUrl(Image);
  };
  const SortlogicScope1 = ({
    field,
    method,
  }: {
    field: string;
    method: string;
  }) => {
    setSortIndex({ field, method });
    const Newdata: CompanyData[] = [...DataTabel];

    method === "Asc"
      ? Newdata.sort((a, b) => a.scope1 - b.scope1)
      : Newdata.sort((a, b) => b.scope1 - a.scope1);
    dispatch(SortActios(Newdata));
  };

  const SortlogicScope2 = ({
    field,
    method,
  }: {
    field: string;
    method: string;
  }) => {
    setSortIndex2({ field, method });

    const Newdata: CompanyData[] = [...DataTabel];

    method === "Asc"
      ? Newdata.sort((a, b) => a.scope2 - b.scope2)
      : Newdata.sort((a, b) => b.scope2 - a.scope2);
    dispatch(SortActios(Newdata));
  };
  const SortlogicScope3 = ({
    field,
    method,
  }: {
    field: string;
    method: string;
  }) => {
    setSortIndex3({ field, method });
    const Newdata: CompanyData[] = [...DataTabel];

    method === "Asc"
      ? Newdata.sort((a, b) => a.scope3 - b.scope3)
      : Newdata.sort((a, b) => b.scope3 - a.scope3);
    dispatch(SortActios(Newdata));
  };
  useEffect(() => {
    dispatch(PageCarbonAmetionDataAsync({ offset: 0, limit: 10 }));
  }, []);
  //loading

  const [Show, setShow] = useState<Boolean>(false);
  // if (TabelStatus === "idle") {
  //   return (
  //     <div className="w-full h-full justify-center items-center text-center">
  //       {" "}
  //       <Loading />
  //     </div>
  //   );
  // }
  // if (TabelStatus === "loading") {
  //   return (
  //     <div className="w-full h-full justify-center items-center text-center">
  //       {" "}
  //       <Loading />
  //     </div>
  //   );
  // }
  return (
    <>
      <Navbar />
      <MaxWidthRappers className="flex flex-col text-center justify-center pb-3 overflow-y-hidden text-xs md:text-sm ">
        <SearchBar />
        <table className="w-full border border-gray-300 shadow-lg rounded-lg relative table-auto">
          <thead>
            {Show && (
              <tr className="absolute w-full h-full bg-opacity-75 backdrop-blur-lg transition-opacity delay-200 z-0">
                <th>
                  <button
                    className="hover:bg-yellow-50 bg-black text-white hover:text-black font-bold p-2 rounded-full z-10 ml-[480px]"
                    onClick={() => setShow(false)}
                  >
                    <IoCloseSharp
                      className="text-white hover:text-black"
                      size={30}
                    />
                  </button>
                  <CompanyForm />
                </th>
              </tr>
            )}

            {ShowImage && (
              <tr className="absolute flex w-full h-full  bg-opacity-75 backdrop-blur-lg">
                <th className="absolute w-full h-full justify-center items-center">
                  <Image
                    src={ImageUrl}
                    alt="In"
                    width={1000}
                    height={1000}
                    className="absolute"
                  />
                  <button
                    className="py-2 px-4 absolute top-0 cursor-pointer hover:bg-yellow-50 bg-black text-white hover:text-black font-bold p-2 rounded-full"
                    onClick={() => {
                      setShowImage(false);
                    }}
                  >
                    <IoCloseSharp className="hover:text-black text-white" />
                  </button>
                </th>
              </tr>
            )}
            <tr className="m-0 border-t p-0 even:bg-muted bg-gray-200 md:text-sm text-xs space-x-4">
              <th className="border px-4 py-2 text-left font-bold">Name</th>
              <th className="border px-4 py-2 text-left font-bold">Sector</th>
              <th className="border px-4 py-2 text-left font-bold">
                <div className="flex items-center space-x-2">
                  {SortIndex && SortIndex.field === "scope1" && (
                    <>
                      {SortIndex.method === "Asc" && (
                        <IoCaretUpSharp
                          onClick={() =>
                            SortlogicScope1({
                              field: "scope1",
                              method:
                                SortIndex.method === "Asc" ? "Dsc" : "Asc",
                            })
                          }
                        />
                      )}
                      {SortIndex.method === "Dsc" && (
                        <IoCaretDown
                          onClick={() =>
                            SortlogicScope1({
                              field: "scope1",
                              method:
                                SortIndex.method === "Dsc" ? "Asc" : "Dsc",
                            })
                          }
                        />
                      )}
                    </>
                  )}
                  <span>Scope 1</span>
                </div>
              </th>
              <th className="border px-4 py-2 text-left font-bold">
                <div className="flex items-center space-x-2">
                  {SortIndex2 && SortIndex2.field === "scope2" && (
                    <>
                      {SortIndex2.method === "Asc" && (
                        <IoCaretUpSharp
                          onClick={() =>
                            SortlogicScope2({
                              field: "scope2",
                              method:
                                SortIndex2.method === "Asc" ? "Dsc" : "Asc",
                            })
                          }
                        />
                      )}
                      {SortIndex2.method === "Dsc" && (
                        <IoCaretDown
                          onClick={() =>
                            SortlogicScope2({
                              field: "scope2",
                              method:
                                SortIndex2.method === "Dsc" ? "Asc" : "Dsc",
                            })
                          }
                        />
                      )}
                    </>
                  )}
                  <span>Scope 2</span>
                </div>
              </th>
              <th className="border px-4 py-2 text-left font-bold">
                <div className="flex items-center space-x-2">
                  {SortIndex3 && SortIndex3.field === "scope3" && (
                    <>
                      {SortIndex3.method === "Asc" && (
                        <IoCaretUpSharp
                          onClick={() =>
                            SortlogicScope3({
                              field: "scope3",
                              method:
                                SortIndex3.method === "Asc" ? "Dsc" : "Asc",
                            })
                          }
                        />
                      )}
                      {SortIndex3.method === "Dsc" && (
                        <IoCaretDown
                          onClick={() =>
                            SortlogicScope3({
                              field: "scope3",
                              method:
                                SortIndex3.method === "Dsc" ? "Asc" : "Dsc",
                            })
                          }
                        />
                      )}
                    </>
                  )}
                  <span>Scope 3</span>
                </div>
              </th>
              <th className="border px-4 py-2 text-left font-bold">Country</th>
              <th className="border px-4 py-2 text-left font-bold">
                Emission Intensity Unit
              </th>
              <th className="border px-4 py-2 text-left font-bold">
                Emission Intensity
              </th>
            </tr>
          </thead>
          <tbody>
            {DataTabel &&
              DataTabel.map((company, Index: number) => (
                <>
                  <tr
                    key={company.id}
                    className="m-0 border-t p-0 even:bg-muted border border-blue-300"
                  >
                    <td
                      className="border px-4 py-2 text-left flex items-center text-xs md:text-sm"
                      onClick={() =>
                        setOpen((prevOpen) =>
                          prevOpen === Index ? undefined : Index
                        )
                      }
                    >
                      {Open === Index ? (
                        <MdExpandLess className="cursor-pointer" size={23} />
                      ) : (
                        <MdExpandMore className="cursor-pointer" size={23} />
                      )}
                      {company.name}
                    </td>
                    <td className="border px-4 py-2 text-left text-xs md:text-sm">
                      {company.sector}
                    </td>
                    <td className="border px-4 py-2 text-left text-xs md:text-sm">
                      {company.scope1}
                    </td>
                    <td className="border px-4 py-2 text-left text-xs md:text-sm">
                      {company.scope2}
                    </td>
                    <td className="border px-4 py-2 text-left text-xs md:text-sm">
                      {company.scope3}
                    </td>
                    <td className="border px-4 py-2 text-left text-xs md:text-sm">
                      {company.country}
                    </td>
                    <td className="border px-4 py-2 text-left text-xs md:text-sm">
                      {company.emission_intensity_unit}
                    </td>
                    <td className="border px-4 py-2 text-left text-xs md:text-sm">
                      {company.emission_intensity}
                    </td>
                  </tr>
                  {Open === Index && (
                    <tr className="bg-gray-50">
                      <td
                        colSpan={8}
                        className="border px-4 py-2 text-left text-xs md:text-sm"
                      >
                        <MaxWidthRappers className="w-full space-y-3">
                          <div className="flex justify-between items-center w-full">
                            <div className="text-center w-1/3 m-2">
                              <h1 className="font-bold">Childlaborfree</h1>
                              <p>{company.childLaborFree ? "Yes" : "No"}</p>
                            </div>
                            <div className="text-center w-1/3 m-2">
                              <h1 className="font-bold">Msme</h1>
                              <p>{company.is_msme ? "yes" : "no"}</p>
                            </div>
                            <div className="text-center w-1/3 m-2">
                              <h1 className="font-bold">Drivide by</h1>
                              <p>{company.emission_intensity_derived_by}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <div className="text-center w-1/3 m-2">
                              <div
                                className="items-center text-center flex flex-col cursor-pointer"
                                onClick={() =>
                                  ImageOpen(
                                    "https://media.istockphoto.com/id/1178808605/photo/paper.jpg?s=1024x1024&w=is&k=20&c=qJoOGtTgWMvxUNfvK4dLX5rLKZ3Z8PEYv0mbxfwFZZA="
                                  )
                                }
                              >
                                <RiExternalLinkLine size={20} />
                                <span>ESG report</span>
                              </div>
                            </div>
                            <div className="text-center w-1/3 m-2">
                              <div
                                className="items-center text-center flex flex-col cursor-pointer"
                                onClick={() =>
                                  ImageOpen(
                                    "https://media.istockphoto.com/id/1178808605/photo/paper.jpg?s=1024x1024&w=is&k=20&c=qJoOGtTgWMvxUNfvK4dLX5rLKZ3Z8PEYv0mbxfwFZZA="
                                  )
                                }
                              >
                                <RiExternalLinkLine size={20} />
                                <span>Child labour report</span>
                              </div>
                            </div>
                            <div className="text-center w-1/3 m-2">
                              <DrawerDialogDemo EditTableDataValue={company} />
                            </div>
                          </div>
                        </MaxWidthRappers>
                      </td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between pt-2 md:pt-4 items-center">
          <Tabelpagination />
          <Drawers />
        </div>
      </MaxWidthRappers>
    </>
  );
};

export default Tabel;
