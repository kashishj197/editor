import { createSlice } from "@reduxjs/toolkit";

interface PreviewState {
  enabled: boolean;
}

const initialState: PreviewState = {
  enabled: false,
};

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    togglePreviewMode(state) {
      state.enabled = !state.enabled;
    },
    setPreviewMode(state, action) {
      state.enabled = action.payload;
    },
  },
});

export const { togglePreviewMode, setPreviewMode } = previewSlice.actions;
export default previewSlice.reducer;
