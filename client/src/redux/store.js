import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import themeModeSlice from "./features/themeModeSlice";
import authModalSlice from "./features/authModalSlice";
import appStateSlice from "./features/appStateSlice";
import globalLoadingSlice  from "./features/globalLoadingSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        themeMode: themeModeSlice,
        authModal: authModalSlice,
        appState: appStateSlice,
        globalLoading: globalLoadingSlice,
    }
});

export default store;
