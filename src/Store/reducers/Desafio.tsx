import { createSlice } from "@reduxjs/toolkit";
import { IDesafio } from "../../tipos/funcao";

const initialState = [
  {
    desafio: "",
    presencial: "",
  },
] as IDesafio[];

const desafioSlice = createSlice({
  name: "desafio",
  initialState,
  reducers: {
    cadastraDesafio: (state, { payload }) => {
      return (state = payload);
    },
    resetDesafio: () => initialState 
  },
});

export const { cadastraDesafio, resetDesafio } = desafioSlice.actions;
export default desafioSlice.reducer;
