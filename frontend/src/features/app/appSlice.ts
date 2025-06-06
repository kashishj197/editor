import { createSlice, createAction } from "@reduxjs/toolkit";
import { BlockDefinition } from "../../utils/models/models";

// Action with payload (pathname string)
export const fetchAppData = createAction<string>("app/fetchAppData");

const appSlice = createSlice({
  name: "app",
  initialState: {
    page: null,
    theme: null,
    blockDefinitions: [] as BlockDefinition[],
    layouts: [],
    loading: false,
  },
  reducers: {
    setAppData: (state, action) => {
      const { page, theme, blockDefinitions, layouts } = action.payload;
      state.page = page;
      state.theme = theme;
      state.blockDefinitions = blockDefinitions;
      state.layouts = layouts;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateGlobalBlock: (state, action) => {
      const updated = action.payload;
      if (!state.page) return;

      if (state.page.globals?.header === updated.id) {
        state.page.globals.headerData = updated;
      } else if (state.page.globals?.footer === updated.id) {
        state.page.globals.footerData = updated;
      }
    },
    addBlockToPage: (state, action) => {
      state.page?.blocks.push(action.payload);
    },
    setBlocks: (state, action) => {
      state.page.blocks = action.payload;
    },
  },
});

export const {
  setAppData,
  setLoading,
  updateGlobalBlock,
  addBlockToPage,
  setBlocks,
} = appSlice.actions;

export default appSlice.reducer;
