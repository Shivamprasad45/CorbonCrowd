import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductServices } from "./AuthAPI";
import data from "@/app/components/data";
interface AuthState {
  Usersdata: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
const initialState: AuthState = {
  Usersdata: data,
  status: "idle",
};

export const fetchProductServecesAsync = createAsyncThunk(
  "user/fetchProductServeces",
  async () => {
    try {
      const response = fetchProductServices();

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductServecesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductServecesAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.Usersdata = action.payload;
        }
      );
  },
});

export default AuthSlice.reducer;
