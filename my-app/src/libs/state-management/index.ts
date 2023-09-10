
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import movielistSlicereducer from "./sliceFiles/movielistslice"
import movieDetailSlicereducer from "./sliceFiles/moviedetailslice";
const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};
const rootReducer = combineReducers({
    movies:movielistSlicereducer,
    movieDetail:movieDetailSlicereducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: { persistedReducer },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;




