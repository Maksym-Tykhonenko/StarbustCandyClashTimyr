import { createSlice } from '@reduxjs/toolkit';

const myCandiesSlice = createSlice({
    name: 'myCandies',
    initialState: [],
    reducers: {
        addCandy: (state, action) => {
            state.push({
                id: Date.now(),
                ...action.payload,
            });
        },
        removeCandy: (state, action) =>
            state.filter(candy => candy.id !== action.payload),
        clear: () => []
    },
});

export const { addCandy, removeCandy, clear } = myCandiesSlice.actions;
export default myCandiesSlice.reducer;
