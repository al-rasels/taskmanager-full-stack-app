import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import taskReducer from "../state-slice/task-slice";
import summaryReducer from "../state-slice/summary-slice";
import profileReducer from "../state-slice/profile-slice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    summery: summaryReducer,
    task: taskReducer,
    profile: profileReducer,
  },
});

export default store;
