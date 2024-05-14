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
  esg: string;
}
interface Data {
  data: CompanyData;
  esg_report: any;
  child_labor_report: any;
}
interface UpdateData {
  data: CompanyData;
  esg_report: any;
  child_labor_report: any;
}
export async function fetchCarbonAmetionDataApi(): Promise<CompanyData[]> {
  return new Promise<CompanyData[]>(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}`);
      const data = await response.json();
      console.log(data, "data");
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function creatData(Data: Data) {
  console.log(Data, "Data  create data");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}`, {
      method: "POST",
      body: JSON.stringify(Data),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();

    resolve(Data);
  });
}

export function UpdateData(Data: Data) {
  console.log(Data, "Update data API");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BACKEND_URL}/${Data.data.id}`, {
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
      const response = await fetch(
        `${BACKEND_URL}/page?offset=${page.offset}&limit=${page.limit}`
      );
      const Data = await response.json();
      console.log(Data, "data APA ");
      resolve(Data);
    } catch (error) {
      reject(error);
    }
  });
}
