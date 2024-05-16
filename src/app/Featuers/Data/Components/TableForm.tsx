"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreatCarbonAmetionDataAsync } from "../DataSlice";
import { FaFilePdf, FaFileWord } from "react-icons/fa";

const CompanyForm = () => {
  const dispatch = useDispatch();
  const [Childlabour, setChildlabour] = useState<any>();
  const [esgFile, setEsgFile] = useState<any>();
  const [childFile, setChildFile] = useState<any>();
  const [Esg, setEsg] = useState<any>();
  const EsghandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Set the image file
    setEsgFile(file);

    if (file) {
      // Create a new FileReader instance
      const reader = new FileReader();

      // Define a function to handle the onload event of the FileReader
      reader.onload = (event) => {
        // Get the binary data from the result of the FileReader
        const binaryData = event.target?.result as ArrayBuffer;

        // Use binaryData as needed, such as sending it to a server or processing it further
        setEsg(binaryData);
      };

      // Read the file as binary data
      reader.readAsArrayBuffer(file);
    }

    // Revoke the previous object URL if it exists
  };
  ///Ecg handle Image
  const ChildhandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setChildFile(file);
    // Set the image file

    if (file) {
      // Create a new FileReader instance
      const reader = new FileReader();

      // Define a function to handle the onload event of the FileReader
      reader.onload = (event) => {
        // Get the binary data from the result of the FileReader
        const binaryData = event.target?.result as ArrayBuffer;

        // Use binaryData as needed, such as sending it to a server or processing it further
        setChildlabour(binaryData);
      };

      // Read the file as binary data
      reader.readAsArrayBuffer(file);
    }

    // Revoke the previous object URL if it exists
  };

  async function FormInVoice(formData: FormData) {
    let rawFormData = {
      // Convert to string and provide empty string as default
      name: formData.get("name"),
      sector: formData.get("sector"),
      country: formData.get("country") || "",
      scope1: Number(formData.get("scope1")) || 0, // Convert to number and provide 0 as default
      scope2: Number(formData.get("scope2")) || 0, // Convert to number and provide 0 as default
      scope3: Number(formData.get("scope3")) || 0, // Convert to number and provide 0 as default
      emission_intensity: formData.get("emission_intensity") || 0,
      emission_intensity_unit: formData.get("emission_intensity_unit") || "",
      emission_intensity_derived_by: formData.get("derived_by") || "",
      childLaborFree: formData.get("childLaborFree") === "on",
      recordYear: formData.get("recordYear") || 2023,

      is_msme: formData.get("is_msme") === "on", // For checkbox, check if it's "on"
    };

    const PostData = {
      data: rawFormData,
      esg_report: Esg || null,
      child_labor_report: Childlabour || null,
      child_labor_File: childFile,
      esg_File: esgFile,
    };

    dispatch(CreatCarbonAmetionDataAsync(PostData));
  }

  return (
    <div className="max-w-xl mx-auto px-10 py-3 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Emission form</h2>
      <div className="max-w-md mx-auto mt-3">
        <form action={FormInVoice} className="space-y-2">
          {/* Name and Sector */}
          <div className="flex justify-between">
            <div className="w-1/2">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="TATA MOTORS"
                required
                name="name"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="sector"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sector
              </label>
              <input
                type="text"
                id="sector"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sector"
                required
                name="sector"
              />
            </div>
          </div>

          {/* Country and Record Year */}
          <div className="flex justify-between">
            <div className="w-1/2">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Country"
                required
                name="country"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="record_year"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Record Year
              </label>
              <input
                type="text"
                id="record_year"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="YYYY"
                name="record_year"
              />
            </div>
          </div>

          {/* Scope 1, 2, 3 */}
          <div className="flex justify-between">
            <div className="w-1/3">
              <label
                htmlFor="scope_1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Scope 1
              </label>
              <input
                type="number"
                id="scope_1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Scope 1"
                step="any"
                name="scope_1"
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="scope_2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Scope 2
              </label>
              <input
                type="number"
                id="scope_2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Scope 2"
                step="any"
                name="scope_2"
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="scope_3"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Scope 3
              </label>
              <input
                type="number"
                id="scope_3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Scope 3"
                step="any"
                name="scope_3"
              />
            </div>
          </div>

          {/* Emission Intensity and Unit */}
          <div className="flex justify-between">
            <div className="w-1/2">
              <label
                htmlFor="emission_intensity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Emission Intensity
              </label>
              <input
                type="number"
                id="emission_intensity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Emission Intensity"
                step="any"
                name="emission_intensity"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="emission_intensity_unit"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Unit
              </label>
              <input
                type="text"
                id="emission_intensity_unit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Emission Intensity unit"
                name="emission_intensity_unit"
              />
            </div>
          </div>

          {/* Derived By */}
          <div className="w-1/2">
            <label
              htmlFor="derived_by"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Derived By
            </label>
            <select
              id="derived_by"
              name="derived_by"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Self require">Self require</option>
              <option value="Verified">Verified</option>
            </select>
          </div>

          {/* Checkboxes */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                id="child_labor_free"
                type="checkbox"
                defaultChecked
                name="childLaborFree"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="child_labor_free"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Child labor free
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="is_msme"
                type="checkbox"
                defaultChecked
                value=""
                name="is_msme"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="is_msme"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                MSME
              </label>
            </div>
          </div>

          {/* File Uploads */}
          <div className="flex justify-between items-center space-x-2">
            <div className="w-1/2">
              <label
                htmlFor="esg_report"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ESG Report
              </label>
              <div className="relative">
                <input
                  id="esg_report"
                  onChange={EsghandleImage}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  type="file"
                />
                <div className="border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:placeholder-gray-400 p-2 flex items-center justify-center">
                  <FaFilePdf className="h-6 w-6 mr-1 text-red-500" />
                  {esgFile ? (
                    <span className="text-gray-900 dark:text-gray-300">
                      {esgFile.name}
                    </span>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-300">
                      Choose file
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="child_report"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Child Report
              </label>
              <div className="relative">
                <input
                  id="child_report"
                  onChange={ChildhandleImage}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  type="file"
                />
                <div className="border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:placeholder-gray-400 p-2 flex items-center justify-center">
                  <FaFileWord className="h-6 w-6 mr-1 text-blue-500" />
                  {childFile ? (
                    <span className="text-gray-900 dark:text-gray-300">
                      {childFile.name}
                    </span>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-300">
                      Choose file
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
