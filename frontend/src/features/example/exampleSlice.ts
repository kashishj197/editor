import { createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  data: string[];
}

const initialState: ExampleState = { data: [] };

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    fetchData: () => {},
    setData: (state, action) => { state.data = action.payload; },
  },
});

export const { fetchData, setData } = exampleSlice.actions;
export default exampleSlice.reducer;