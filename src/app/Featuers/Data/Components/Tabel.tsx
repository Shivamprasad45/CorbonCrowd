"use client";
import React, { useEffect, useState } from "react";
import MaxWidthRappers from "@/app/components/MaxWidthRapper";
import Navbar from "@/app/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemSelector,
  PageCarbonAmetionDataAsync,
  SortActios,
} from "../DataSlice";
import CompanyForm from "./TableForm";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Tabelpagination from "./Tabelpagination";

import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import EditTable from "./EditTable";
import { IoCaretDown, IoCaretUpSharp, IoCloseSharp } from "react-icons/io5";
import { IoIosImage } from "react-icons/io";

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
  const [Open, setOpen] = useState<number>();
  const [Edit, setEdit] = useState<Boolean>(false);
  const [EditIndexData, setEditIndexData] = useState<CompanyData>();
  const [ShowImage, setShowImage] = useState<boolean>(false);
  const [ImageUrl, setImageUrl] = useState<string>();
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
    dispatch(PageCarbonAmetionDataAsync({ offset: 1, limit: 10 }));
  }, []);
  const EditLog = (company: CompanyData) => {
    setEditIndexData(company);
    setEdit(true);
  };
  const [Show, setShow] = useState<Boolean>(false);

  return (
    <>
      <Navbar />

      <MaxWidthRappers className="flex flex-col justify-center text-center pb-3 items-center   ">
        <SearchBar />
        <table className="border border-gray-300 shadow-lg rounded-lg relative">
          <thead>
            {Show && (
              <div className="absolute w-full h-full bg-opacity-75 backdrop-blur-lg transition-opacity delay-200 z-0">
                <button
                  className="hover:bg-yellow-50 bg-black text-white hover:text-black font-bold p-2 rounded-full z-10 ml-[480px] "
                  onClick={() => setShow(false)}
                >
                  <IoCloseSharp
                    className="text-white hover:text-black"
                    size={30}
                  />
                </button>
                <CompanyForm />
              </div>
            )}
            {Edit && (
              <div className="absolute w-full h-full bg-opacity-75 backdrop-blur-lg">
                <button
                  className=" text-white font-bold py-2 px-4 rounded-full  "
                  onClick={() => setEdit(false)}
                >
                  <IoCloseSharp color="black" />
                </button>
                <EditTable EditTableDataValue={EditIndexData} />
              </div>
            )}
            {ShowImage && (
              <div className="absolute flex w-full h-full justify-center items-center bg-opacity-75 backdrop-blur-lg">
                <button
                  className="bg-blue-300  text-white font-bold py-2 px-4 rounded-full absolute left-[920px] top-72 cursor-pointer"
                  onClick={() => {
                    setShowImage(false);
                  }}
                >
                  <IoCloseSharp color="black" />
                </button>
                <Image
                  src={ImageUrl}
                  alt="In"
                  width={1000}
                  height={1000}
                  className="absolute"
                />
              </div>
            )}
            <tr className="bg-gray-200 md:text-sm text-xs  space-x-4">
              <th className="px-1 py-2 md:px-4 md:py-2">Name</th>
              <th className="px-1 py-2 md:px-4 md:py-2">Sector</th>

              <th className="px-3 py-2 md:px-4 md:py-2 space-x-2  items-center  ">
                {SortIndex && SortIndex.field === "scope1" && (
                  <>
                    {SortIndex.method === "Asc" && (
                      <IoCaretUpSharp
                        onClick={() =>
                          SortlogicScope1({
                            field: "scope1",
                            method: SortIndex.method === "Asc" ? "Dsc" : "Asc",
                          })
                        }
                      />
                    )}
                    {SortIndex.method === "Dsc" && (
                      <IoCaretDown
                        onClick={() =>
                          SortlogicScope1({
                            field: "scope1",
                            method: SortIndex.method === "Dsc" ? "Asc" : "Dsc",
                          })
                        }
                      />
                    )}
                  </>
                )}
                <span>Scope 1</span>
              </th>

              <th
                className="px-3 py-2 md:px-4 md:py-2 space-x-2  items-center  "
                colSpan={1}
              >
                {SortIndex2 && SortIndex2.field === "scope2" && (
                  <>
                    {SortIndex2.method === "Asc" && (
                      <IoCaretUpSharp
                        onClick={() =>
                          SortlogicScope2({
                            field: "scope2",
                            method: SortIndex2.method === "Asc" ? "Dsc" : "Asc",
                          })
                        }
                      />
                    )}
                    {SortIndex2.method === "Dsc" && (
                      <IoCaretDown
                        onClick={() =>
                          SortlogicScope2({
                            field: "scope2",
                            method: SortIndex2.method === "Dsc" ? "Asc" : "Dsc",
                          })
                        }
                      />
                    )}
                  </>
                )}
                <span>Scope 2</span>
              </th>

              <th className="px-3 py-2 md:px-4 md:py-2 space-x-2  ">
                {SortIndex3 && SortIndex3.field === "scope3" && (
                  <>
                    {SortIndex3.method === "Asc" && (
                      <IoCaretUpSharp
                        onClick={() =>
                          SortlogicScope3({
                            field: "scope3",
                            method: SortIndex3.method === "Asc" ? "Dsc" : "Asc",
                          })
                        }
                      />
                    )}
                    {SortIndex3.method === "Dsc" && (
                      <IoCaretDown
                        onClick={() =>
                          SortlogicScope3({
                            field: "scope3",
                            method: SortIndex3.method === "Dsc" ? "Asc" : "Dsc",
                          })
                        }
                      />
                    )}
                  </>
                )}
                <span>Scope 3</span>
              </th>
              <th className="px-1 py-2 md:px-4 md:py-2">Country</th>

              <th className="px-1 py-2 md:px-4 md:py-2">
                Child <span>laborfree</span>{" "}
              </th>
              <th className="px-1 py-2 md:px-4 md:py-2">MSME</th>
              <th className="px-1 py-2 md:px-4 md:py-2">
                Record <span>year</span>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {DataTabel &&
              DataTabel.map((company, Index: number) => (
                <>
                  <tr key={Index} className="border border-blue-300 ">
                    <td
                      className="px-1 py-2 md:px-4 md:py-2 flex items-center text-xs md:text-sm "
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
                    <td className="px-1 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.sector}
                    </td>
                    <td className="px-0 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.scope1}
                    </td>
                    <td className="px-0 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.scope2}
                    </td>
                    <td className="px-0 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.scope3}
                    </td>
                    <td className="px-0 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.country}
                    </td>

                    <td className="px-0 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.childLaborFree ? "Yes" : "No"}
                    </td>
                    <td className="px-0 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.is_msme ? "Yes" : "No"}
                    </td>
                    <td className="px-0 py-2 md:px-4 md:py-2 text-xs md:text-sm">
                      {company.recordYear === "" ? 2023 : company.recordYear}
                    </td>
                  </tr>
                  {Open === Index && (
                    <td
                      colSpan={13}
                      className="px-1  py-2 md:px-4 md:py-2 text-xs md:text-sm "
                    >
                      <MaxWidthRappers className="w-full space-y-3 ">
                        <main className="flex  justify-between  items-center w-full ">
                          <div className="text-center w-20 m-2">
                            <h1 className="font-bold">
                              Emission intensity unit
                            </h1>
                            <p>{company.emission_intensity_unit}</p>
                          </div>
                          <div className="text-center w-20 m-2">
                            <h1 className="font-bold">Emission intensity</h1>
                            <p>{company.emission_intensity}</p>
                          </div>{" "}
                          <div className="text-center w-20 m-2">
                            <h1 className="font-bold">Drivideby</h1>
                            <p>{company.emission_intensity_derived_by}</p>
                          </div>
                        </main>
                        {/* //button */}
                        <main className="flex justify-between items-center w-full">
                          <div>
                            <h1
                              className="  items-center text-center flex flex-col w-20 m-2 "
                              onClick={() =>
                                ImageOpen(
                                  "https://media.istockphoto.com/id/1178808605/photo/paper.jpg?s=1024x1024&w=is&k=20&c=qJoOGtTgWMvxUNfvK4dLX5rLKZ3Z8PEYv0mbxfwFZZA="
                                )
                              }
                            >
                              <IoIosImage />

                              <span> Esg report</span>
                            </h1>
                          </div>
                          <div>
                            <h1
                              className=" items-center text-center flex flex-col w-20 m-2 "
                              onClick={() =>
                                ImageOpen(
                                  "https://media.istockphoto.com/id/1178808605/photo/paper.jpg?s=1024x1024&w=is&k=20&c=qJoOGtTgWMvxUNfvK4dLX5rLKZ3Z8PEYv0mbxfwFZZA="
                                )
                              }
                            >
                              <IoIosImage />
                              <span> Child labour report</span>
                            </h1>
                          </div>{" "}
                          <div className="w-20 m-2">
                            <button
                              className="bg-black text-white font-bold py-2 px-4 rounded-full"
                              onClick={() => EditLog(company)}
                            >
                              Dispute
                            </button>
                          </div>
                        </main>
                      </MaxWidthRappers>
                    </td>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </MaxWidthRappers>
      <MaxWidthRappers className="flex justify-between items-center ">
        <Tabelpagination />
        <button
          className="bg-black text-white font-bold p-2 md:p-3 rounded-full  flex text-center items-center  pb-4 "
          onClick={() => setShow(true)}
        >
          {" "}
          <BiPlus size={50} />
        </button>
      </MaxWidthRappers>
    </>
  );
};

export default Tabel;
