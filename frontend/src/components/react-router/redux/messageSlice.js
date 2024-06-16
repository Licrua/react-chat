import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messageSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addChannel: messagesAdapter.addOne,
        addChannels : messagesAdapter.addMany,
        RemoveChannel: messagesAdapter.removeOne,
    }
})
export const {addChannel, addChannels, RemoveChannel} = messageSlice.actions;
export default messageSlice.reducer
export const { selectAll: selectAllMessage, selectById: selectByIdMessages } =
messagesAdapter.getSelectors((state) => state.messages);
