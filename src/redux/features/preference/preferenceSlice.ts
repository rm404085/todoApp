import type { PreferencesState } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



const initialState: PreferencesState = {
  theme: "light",
  language: "en",
  layout: "grid",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<"en" | "bn">) {
      state.language = action.payload;
    },
    setLayout(state, action: PayloadAction<"grid" | "list">) {
      state.layout = action.payload;
    },
  },
});

export const { setTheme, setLanguage, setLayout } = preferencesSlice.actions;
export default preferencesSlice.reducer;
