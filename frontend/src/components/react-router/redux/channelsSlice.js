import { createSlice, createEntityAdapter, current } from "@reduxjs/toolkit";
import socket from "../webSocket";

const channelsAdapter = createEntityAdapter();
const messagesAdapter = createEntityAdapter();
const usersAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  messages: {},
  users: usersAdapter.getInitialState(),
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    addMessager: (state, action) => {
      const { channelId, message } = action.payload;
      console.log("channelId", channelId);
      console.log("приходящий message", message);
      if (!state.messages[channelId]) {
        console.log("da");
        state.messages[channelId] = messagesAdapter.getInitialState();
        console.log('state', current(state));
      }
      state.messages[channelId] = messagesAdapter.addOne(
        state.messages[channelId],
        message
      );
      console.log("channelidId", channelId);
      console.log("typeofChannelId", typeof channelId);
    
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addUser: (state, action) => {
      usersAdapter.addOne(state.users, action.payload);
    },
    removeChannel: channelsAdapter.removeOne,
  },
});

export const { addChannel, addChannels, addMessager, addUser } =
  channelsSlice.actions;
export default channelsSlice.reducer;

export const { selectAll: selectAllChannels, selectById: selectByIdChannels } =
  channelsAdapter.getSelectors((state) => state.channels);
export const { selectAll: selectAllMessages, selectById: selectMessageById } =
  messagesAdapter.getSelectors((state) => state.channels.messages);
export const { selectAll: selectAllUsers, selectById: selectByIdUsers } =
  usersAdapter.getSelectors((state) => state.channels.users);

  export const selectMessagesByChannelId = (state, channelId) => {
    const channelMessages = state.channels.messages[channelId];
    console.log('channelMessages', channelMessages);
    // console.log('channelMessagesSelectors', messagesAdapter.getSelectors().selectAll(channelMessages) || []);
    return channelMessages ? messagesAdapter.getSelectors().selectAll(channelMessages) : [];
  };

// const object = {
//   1: {
//     entities: {id: 1, name: 'petro'},
//     ids: [1]
//   }, 
//   2: {
//     entities: {id: 2, name: 'petroPony'},
//     ids: [2]
//   }
// }

// console.log(object['1']);
// console.log(object['2']);
