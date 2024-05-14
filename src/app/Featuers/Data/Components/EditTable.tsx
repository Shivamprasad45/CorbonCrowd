import React, { useState } from "react";
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
  link_childlabour: string;
  esg: string;
}

const EditTable = ({
  EditTableDataValue,
}: {
  EditTableDataValue: CompanyData;
}) => {
  const [Childlabour, setChildlabour] = useState<any>();
  const [Esg, setEsg] = useState<any>();
  const EsghandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Set the image file

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
  const FormInVoice = (formData: FormData) => {
    let rawFormData = {
      // Convert to string and provide empty string as default
      name: formData.get("name") || "",
      sector: formData.get("sector") || "",
      country: formData.get("country"),
      scope1: Number(formData.get("scope1")) || 0, // Convert to number and provide 0 as default
      scope2: Number(formData.get("scope2")) || 0, // Convert to number and provide 0 as default
      scope3: Number(formData.get("scope3")) || 0, // Convert to number and provide 0 as default
      emission_intensity: formData.get("emission_intensity"),
      emission_intensity_unit: formData.get("emission_intensity_unit") || "",
      emission_intensity_derived_by: formData.get("derived_by") || "",
      childLaborFree: formData.get("childLaborFree") || "",
      recordYear: formData.get("recordYear"),

      is_msme: formData.get("is_msme") === "on", // For checkbox, check if it's "on"
      link_childlabour: Childlabour,
      esg: Esg,
    };
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Emission form Update</h2>
      <div className="max-w-md mx-auto mt-8">
        <form action={FormInVoice} className="space-y-4 ">
          <div className="flex justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="first_name"
                defaultValue={EditTableDataValue.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="TATA MOTERS"
                required
                name="name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Sector
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sector"
                required
                name="sector"
                defaultValue={EditTableDataValue.sector}
              />
            </div>
          </div>
          {/* //County Recorders */}
          <div className="flex justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Country
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Country"
                required
                name="country"
                defaultValue={EditTableDataValue.country}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Record year
              </label>
              <input
                type="text"
                name="recordYear"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="yyyy"
                defaultValue={EditTableDataValue.recordYear}
              />
            </div>
          </div>

          {/* Add more input fields for other properties */}
          <section className="flex justify-between  space-x-2">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Scope 1
              </label>
              <input
                type="number"
                defaultValue={EditTableDataValue.scope1}
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Scope 1"
                step="any"
                name="scope1"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Scope 2
              </label>
              <input
                type="number"
                defaultValue={EditTableDataValue.scope2}
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Scope 2"
                step="any"
                name="scope2"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Scope 3
              </label>
              <input
                type="number"
                id="number-input"
                defaultValue={EditTableDataValue.scope3}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Scope 3"
                step="any"
                name="scope3"
              />
            </div>
          </section>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Emission Intensity{" "}
              </label>
              <input
                type="number"
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="emission_intensity"
                step="any"
                name="emission_intensity"
                defaultValue={EditTableDataValue.emission_intensity}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Unit
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Emission Intensity unit"
                name="emission_intensity_unit"
                defaultValue={EditTableDataValue.emission_intensity_unit}
              />
            </div>

            <div className="w-fit">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Derived By
              </label>
              <select
                name="derived_by"
                defaultValue={EditTableDataValue.emission_intensity_derived_by}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Self require">Self require</option>
                <option value="Verified">Verified</option>
              </select>
            </div>
          </div>
          {/* ??Image uploads */}

          <div className="flex justify-between items-center space-x-2">
            <div className=" ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Esg report
              </label>
              <input
                onChange={EsghandleImage}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
              />
            </div>
            <div className=" ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Child report
              </label>
              <input
                onChange={ChildhandleImage}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                defaultChecked
                name="childLaborFree"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Child labour free
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                defaultChecked
                value=""
                name="is_msme"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                MSME
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTable;
