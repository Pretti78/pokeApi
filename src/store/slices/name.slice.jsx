import { createSlice } from '@reduxjs/toolkit';

export const nameSlice = createSlice({
	name: 'name',
	initialState: '',
	reducers: {
		changeName: (state, userName) => {
			const userValue = userName.payload;
			return userValue;
		},
	},
});

export const { changeName } = nameSlice.actions;

export default nameSlice.reducer;
