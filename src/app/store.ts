import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import searchSlice from "../features/search/searchSlice";
import filtersSlice from "../features/filters/filtersSlice";

const persistConfig = {
  key: "root",
  storage,
};

/**
 * Creates a persisted reducer using the given persist configuration and auth reducer.
 * @param {PersistConfig} persistConfig - The configuration object for persisting the state.
 * @param {Reducer} authReducer - The reducer function for handling authentication state.
 * @returns The persisted reducer.
 */
const persistedReducer = persistReducer(persistConfig, authReducer);

/**
 * Configures and creates a Redux store with the specified reducers, middleware, and dev tools.
 * @param {object} reducer - The reducer object that defines the state shape and how to handle actions.
 * @param {function} getDefaultMiddleware - A function that returns the default middleware for the store.
 * @returns The configured Redux store.
 */
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer,
    search: searchSlice,
    filters: filtersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
