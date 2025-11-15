import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    New: [],
    Completed: [],
    Progress: [],
    Canceled: [],
  },
  reducers: {
    SetNewTasks: (state, action) => {
      state.New = action.payload;
    },
    SetCompletedTasks: (state, action) => {
      state.Completed = action.payload;
    },
    SetProgressTasks: (state, action) => {
      state.Progress = action.payload;
    },
    SetCanceledTasks: (state, action) => {
      state.Canceled = action.payload;
    },
  },
});

export const {
  SetNewTasks,
  SetCompletedTasks,
  SetProgressTasks,
  SetCanceledTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
