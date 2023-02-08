import noticeboardReducer from "@/states/noticeboard/slices";
import { reducer as tutorialReducer } from "@/states/tutorial/slice";
// import { reducer as agoraReducer } from "@/states/agora/slices";
import { reducer as userReducer } from "@/states/user/slice";
import { reducer as feedbackReducer } from "@/states/feedback/slices";
import { reducer as zoomReducer } from "@/states/zoom/slice";
import { reducer as chatReducer } from "@/states/chat/slice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  tutorial: tutorialReducer,
  // agora: agoraReducer,
  noticeboard: noticeboardReducer,
  feedback: feedbackReducer,
  zoom: zoomReducer,
  chat: chatReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "feedback"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
