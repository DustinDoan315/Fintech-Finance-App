import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user/userSlice';
import videoReducer from './video/videoSlice';
import walletReducer from './wallet/walletSlice';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  whitelist: ['user', 'video', 'wallet'],
};
const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  wallet: walletReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
      immutableCheck: {
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
