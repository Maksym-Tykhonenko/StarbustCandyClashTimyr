// redux/slices/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        toggleFavorite: (state, action) => {
            const exists = state.find(item => item.name === action.payload.name);
            if (exists) {
                return state.filter(item => item.name !== action.payload.name);
            } else {
                return [...state, action.payload];
            }
        },
        clearFavorites: () => [],
    },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
