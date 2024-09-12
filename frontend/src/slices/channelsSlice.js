import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const messagesAdapter = createEntityAdapter();
const usersAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  messages: {},
  users: usersAdapter.getInitialState(),
  currentChannelId: null,
  currentChannel: null,
  channelsName: [],
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeSomeChannel: channelsAdapter.removeOne,
    editSomeChannel: channelsAdapter.updateOne,
    getChannelsName: (state, action) => {
      state.channels.channelsName.push(action.payload);
    },
    setConcurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    addMessager: (state, action) => {
      const { channelId, message } = action.payload;
      console.log('channelId', channelId);
      console.log('приходящий message', message);
      if (!state.messages[channelId]) {
        console.log('da');
        state.messages[channelId] = messagesAdapter.getInitialState();
        console.log('state', current(state));
      }
      state.messages[channelId] = messagesAdapter.addOne(
        state.messages[channelId],
        message,
      );
      console.log('channelidId', channelId);
      console.log('typeofChannelId', typeof channelId);
    },
    setConcurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addUser: (state, action) => {
      console.log('добавление юзера', action.payload);
      usersAdapter.addOne(state.users, action.payload);
    },
    removeChannel: channelsAdapter.removeOne,
  },
});

export const {
  addChannel,
  addChannels,
  addMessager,
  addUser,
  removeSomeChannel,
  setConcurrentChannel,
  setConcurrentChannelId,
  getChannelsName,
  editSomeChannel,
} = channelsSlice.actions;
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
  return channelMessages
    ? messagesAdapter.getSelectors().selectAll(channelMessages)
    : [];
};
