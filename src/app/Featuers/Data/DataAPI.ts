const url = process.env.URL_DATA;
const BACKEND_URL = "http://0.0.0.0:8000/carbondata";

interface CompanyData {
  id: string;
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
  esg_report: any;
  child_labor_report: any;
}

interface CreCompanyData {
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
}

interface Postdata {
  data: CreCompanyData;
  esg_report: any;
  child_labor_report: any;
}

const postData: Postdata = {
  data: {
    name: "Company Name",
    sector: "Sector",
    country: "Country",
    scope1: 100,
    scope2: 200,
    scope3: 300,
    emission_intensity: 10,
    emission_intensity_unit: "Unit",
    emission_intensity_derived_by: "Derived By",
    childLaborFree: true,
    is_msme: false,
    recordYear: "2022",
  },
  esg_report: null,
  child_labor_report: null,
};

createData(postData)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

export function createData(Data: Postdata) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(Data.data));

  // Convert ArrayBuffer to Blob for child_labor_report if it exists
  if (Data.child_labor_report) {
    const childLaborReportBlob = new Blob([Data.child_labor_report]);
    formData.append("child_labor_report", childLaborReportBlob);
  }

  // Convert ArrayBuffer to Blob for esg_report if it exists
  if (Data.esg_report) {
    const esgReportBlob = new Blob([Data.esg_report]);
    formData.append("esg_report", esgReportBlob);
  }

  console.log(formData, "Formdata");

  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/carbondata", {
      method: "POST",
      body: formData,
      // No need to set content-type header, it will be automatically set for FormData
    });
    const data = await response.json();
    resolve(data);
  });
}

export function UpdateData(Data: CompanyData): Promise<CompanyData[]> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/${Data.id}`, {
      method: "POST",
      body: JSON.stringify(Data),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    resolve(data);
  });
}

export async function SearchCarbonAmetionDataApi(
  companyname: string
): Promise<CompanyData[]> {
  return new Promise<CompanyData[]>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/search?query=${companyname}`
      );
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// export async function SortCarbonAmetionDataApi(
//   data: Sort
// ): Promise<CompanyData[]> {
//   return new Promise<CompanyData[]>(async (resolve, reject) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/CarbonAgnationData?field=${data.field}&Order=${data.method}`
//       );
//       const Data = await response.json();
//       resolve(Data);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export async function PageNationCarbonAmetionDataApi(page: {
  offset: number;
  limit: number;
}): Promise<CompanyData[]> {
  return new Promise<CompanyData[]>(async (resolve, reject) => {
    try {
      const limit = page["limit"];
      const offset = (page["offset"] - 1) * limit;
      const response = await fetch(
        `http://localhost:8000/carbondata/page/?limit=${limit}&offset=${offset}`
      );
      const Data = await response.json();
      console.log(Data, "data APA ");
      resolve(Data);
    } catch (error) {
      reject(error);
    }
  });
}
