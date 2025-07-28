import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import myCandiesReducer from './slices/myCandiesSlice';
import bestScoreReducer from './slices/bestScoreSlice';
import favoritesReducer from './slices/favoritesSlice';

const rootReducer = combineReducers({
  myCandies: myCandiesReducer,
  bestScore: bestScoreReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
