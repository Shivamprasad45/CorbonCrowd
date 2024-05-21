import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PageNationCarbonAmetionDataApi,
  SearchCarbonAmetionDataApi,
  UpdateData,
  createData,
} from "./DataAPI";

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
//Post data interface
interface PostData {
  data: CreCompanyData;
  esg_report: any;
  child_labor_report: any;
  child_labor_File: any;
  esg_File: any;
}

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

interface State {
  CarbonAmetion: CompanyData[];

  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: State = {
  CarbonAmetion: [],
  status: "idle",
};

//Create data

export const CreatCarbonAmetionDataAsync = createAsyncThunk(
  "Item/CreCompanyData",
  async (data: PostData) => {
    try {
      const response = await createData(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Update data
export const UpdateCarbonAmetionDataAsync = createAsyncThunk(
  "Item/UpdateData",
  async (data: CompanyData) => {
    try {
      const response = await UpdateData(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Search
export const SearchCarbonAmetionDataAsync = createAsyncThunk(
  "Item/SearchCarbonAmetionDataApi",
  async (data: string) => {
    try {
      const response = await SearchCarbonAmetionDataApi(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//Paginations
export const PageCarbonAmetionDataAsync = createAsyncThunk(
  "Item/PageNationCarbonAmetionDataApi",
  async (page: { offset: number; limit: number }) => {
    try {
      const response = await PageNationCarbonAmetionDataApi(page);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const ItemSlice = createSlice({
  name: "Item",
  initialState,
  reducers: {
    SortActios: (state, action) => {
      state.CarbonAmetion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(CreatCarbonAmetionDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        CreatCarbonAmetionDataAsync.fulfilled,
        (state, action: PayloadAction<CompanyData>) => {
          state.CarbonAmetion.push(action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(CreatCarbonAmetionDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(UpdateCarbonAmetionDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        UpdateCarbonAmetionDataAsync.fulfilled,
        (state, action: PayloadAction<CompanyData>) => {
          const NewData = [...state.CarbonAmetion];
          const Index: number = NewData.findIndex(
            (item) => item.id === action.payload.id
          );

          NewData[Index] = action.payload;
          state.CarbonAmetion = NewData;
        }
      )
      .addCase(SearchCarbonAmetionDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        SearchCarbonAmetionDataAsync.fulfilled,
        (state, action: PayloadAction<CompanyData[]>) => {
          state.CarbonAmetion = action.payload;
        }
      )
      .addCase(PageCarbonAmetionDataAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        PageCarbonAmetionDataAsync.fulfilled,
        (state, action: PayloadAction<CompanyData[]>) => {
          state.CarbonAmetion = action.payload;
          state.status = "succeeded";
          state.error = " ";
        }
      )
      .addCase(PageCarbonAmetionDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ItemSlice.reducer;

// Simple ItemSelector without createSelector
export const ItemSelector = (state: { ItemReduce: State }) =>
  state.ItemReduce.CarbonAmetion;
export const ItemError = (state: { ItemReduce: State }) =>
  state.ItemReduce.error;
export const ItemStatus = (state: { ItemReduce: State }) =>
  state.ItemReduce.status;
export const { SortActios } = ItemSlice.actions;
