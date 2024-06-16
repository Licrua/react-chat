import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: usersAdapter.addOne,
        addUsers : usersAdapter.addMany,
        removeUser: usersAdapter.removeOne,
    }
})
console.log('selectors', selectors);
export const {addUser, addUsers, removeUser} = usersSlice.actions;
export default usersSlice.reducer
export const { selectAll: alUsersSelect, selectById: selectByIdUsers } =
usersAdapter.getSelectors((state) => state.users);

