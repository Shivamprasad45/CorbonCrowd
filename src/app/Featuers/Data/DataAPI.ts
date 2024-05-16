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
  child_labor_File: any;
  esg_File: any;
}
//Create
export function createData(Data: Postdata) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(Data.data));

  // Convert ArrayBuffer to Blob for child_labor_report if it exists
  if (Data.child_labor_report) {
    const childLaborReportBlob = new Blob([Data.child_labor_report]);
    formData.append("child_labor_report", childLaborReportBlob);
    formData.append("child_labor_File", Data.child_labor_File.name);
  }

  // Convert ArrayBuffer to Blob for esg_report if it exists
  if (Data.esg_report) {
    const esgReportBlob = new Blob([Data.esg_report]);
    formData.append("esg_report", esgReportBlob);
    formData.append("esg_File", Data.esg_File.name);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/carbondata", {
        method: "POST",
        body: formData,
        // No need to set content-type header, it will be automatically set for FormData
      });
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
    }
  });
}
//Update
export function UpdateData(Data: CompanyData): Promise<CompanyData[]> {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}?id=${Data.id}`, {
      method: "POST",
      body: JSON.stringify(Data),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    resolve(data);
  });
}
//Search
export async function SearchCarbonAmetionDataApi(
  companyname: string
): Promise<CompanyData[]> {
  return new Promise<CompanyData[]>(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}?name=${companyname}`);
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// Pagination

export async function PageNationCarbonAmetionDataApi(page: {
  offset: number;
  limit: number;
}): Promise<CompanyData[]> {
  return new Promise<CompanyData[]>(async (resolve, reject) => {
    try {
      const limit = page["limit"];
      const offset = page["offset"] * limit;
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
