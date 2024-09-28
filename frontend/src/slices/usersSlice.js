import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectByIdUsers } =
  usersAdapter.getSelectors((state) => state.users);
