import { createSlice } from "@reduxjs/toolkit";
import { IPesoais } from "../../tipos/funcao";

const initialState = [
  {
    name: "",
  },
] as IPesoais[];

const pessoaisSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    cadastraPessoa: (state, { payload }) => {
      return state = payload
    },
  },
});

export const { cadastraPessoa } = pessoaisSlice.actions;
export default pessoaisSlice.reducer;
