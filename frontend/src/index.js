import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "state";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// all the info will be stored in the local storage, unless they clear the cache.
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";

// default: localstorage ; data version - 1
const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
