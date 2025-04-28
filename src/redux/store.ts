import { configureStore } from '@reduxjs/toolkit';
import cartSlice from "./features/cartSlice";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from './storage';


const persistOptions = {
  key: "cart",
  storage,
}

const persistedCart = persistReducer(persistOptions, cartSlice);

export const makeStore = () => {
  return configureStore({
    reducer: {
        cart: persistedCart
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']