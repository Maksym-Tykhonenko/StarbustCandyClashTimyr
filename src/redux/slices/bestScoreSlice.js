// features/bestScoreSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bestScore: 0,
};

const bestScoreSlice = createSlice({
    name: 'bestScore',
    initialState,
    reducers: {
        updateBestScore: (state, action) => {
            const newScore = action.payload;
            if (newScore > state.bestScore) {
                state.bestScore = newScore;
            }
        },
        resetBestScore: (state) => {
            state.bestScore = 0;
        },
    },
});

export const { updateBestScore, resetBestScore } = bestScoreSlice.actions;

export default bestScoreSlice.reducer;
