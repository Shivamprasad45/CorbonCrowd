import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PageNationCarbonAmetionDataApi,
  SearchCarbonAmetionDataApi,
  UpdateData,
  creatData,
  fetchCarbonAmetionDataApi,
} from "./DataAPI";

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
}

interface State {
  CarbonAmetion: PostDataInter[];

  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

interface PostDataInter {
  data: CompanyData;
  esg_report: any;
  child_labor_report: any;
}

const initialState: State = {
  CarbonAmetion: [],

  status: "idle",
};

export const fetchCarbonAmetionDataAsync = createAsyncThunk(
  "Item/fetchCarbonAretinoDataApi",
  async () => {
    try {
      const response = await fetchCarbonAmetionDataApi();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//Craete data

export const CreatCarbonAmetionDataAsync = createAsyncThunk(
  "Item/creatData",
  async (data: PostDataInter) => {
    try {
      const response = await creatData(data);
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
  async (data) => {
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
      console.error(error);
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
      .addCase(fetchCarbonAmetionDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCarbonAmetionDataAsync.fulfilled,
        (state, action: PayloadAction<CompanyData[]>) => {
          state.CarbonAmetion = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchCarbonAmetionDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
        (state, action: PayloadAction<CompanyData>) => {}
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

      .addCase(
        PageCarbonAmetionDataAsync.fulfilled,
        (state, action: PayloadAction<CompanyData[]>) => {
          state.CarbonAmetion = action.payload.data;
        }
      );
  },
});

export default ItemSlice.reducer;

// Simple ItemSelector without createSelector
export const ItemSelector = (state: { ItemReduce: State }) =>
  state.ItemReduce.CarbonAmetion;

export const { SortActios } = ItemSlice.actions;
