import { createSlice } from "@reduxjs/toolkit";

let initialState = 0 as number;

const botaoClickSlice = createSlice({
  name: "buttonClick",
  initialState,
  reducers: {
    mudaEstado: (state) => {
      if (state < 5) {
        return state + 1;
      }else{
        return 4
      }
    },
    voltaEstado: (state) => {
      if (state >= 1) {
        return state - 1;
      }
    },
    resetButton: () => initialState 
  },
});

export const { mudaEstado, voltaEstado, resetButton } = botaoClickSlice.actions;
export default botaoClickSlice.reducer;
