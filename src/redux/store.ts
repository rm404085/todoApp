import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./features/counter/counterSlice";
import TaskReducer from "./features/task/taskSlice";
import wishlistReducer from "./features/wishList/wishListSlice"
import authReducer from "./features/auth/authSlice";  
import preferenceReducer from "./features/preference/preferenceSlice"
import bookingsReducer from "./features/bookingsSlice/bookingsSlice"
import { baseApi } from "./api/baseApi";  
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
   whitelist: ["tasks", "counter", "wishlist", "auth", "preferences", "bookings"], 
};

const rootReducer = combineReducers({
  auth: authReducer, 
  tasks: TaskReducer,
  counter: CounterReducer,
  wishlist: wishlistReducer,
  preferences: preferenceReducer,
  bookings: bookingsReducer ,
  [baseApi.reducerPath]: baseApi.reducer, // RTK Query Reducer
});

// persist reducer wrap
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware), 
});

export const persistor = persistStore(store);

// TypeScript Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
