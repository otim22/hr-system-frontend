import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/auth";
import staffReducer from "./slices/staff";
import messageReducer from "./slices/message";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
 
const store = configureStore({
    reducer: {
        auth: authReducer,
        staff: staffReducer,
        message: messageReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;