// import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';

// const channelsAdapter = createEntityAdapter();
// const messagesAdapter = createEntityAdapter();
// const usersAdapter = createEntityAdapter();
// const initialState = channelsAdapter.getInitialState({
//   messages: {},
//   users: usersAdapter.getInitialState(),
//   currentChannelId: null,
//   currentChannel: null,
//   channelsName: [],
// });

// const channelsSlice = createSlice({
//   name: 'channels',
//   initialState,
//   reducers: {
//     addChannel: channelsAdapter.addOne,
//     addChannels: channelsAdapter.addMany,
//     removeSomeChannel: channelsAdapter.removeOne,
//     editSomeChannel: channelsAdapter.updateOne,
//     getChannelsName: (state, action) => {
//       state.channels.channelsName.push(action.payload);
//     },
//     setCurrentChannel: (state, action) => {
//       state.currentChannel = action.payload;
//     },
//     addMessage: (state, action) => {
//       const { channelId, message } = action.payload;
//       ('channelId', channelId);
//       ('приходящий message', message);
//       if (!state.messages[channelId]) {
//         ('da');
//         state.messages[channelId] = messagesAdapter.getInitialState();
//         ('state', current(state));
//       }

//       state.messages[channelId] = messagesAdapter.addOne(
//         state.messages[channelId],
//         message,
//       );
//       ('channelidId', channelId);
//       ('typeofChannelId', typeof channelId);
//     },
//     setCurrentChannelId: (state, action) => {
//       state.currentChannelId = action.payload;
//     },
//     addUser: (state, action) => {
//       ('добавление юзера', action.payload);
//       usersAdapter.addOne(state.users, action.payload);
//     },
//     removeChannel: channelsAdapter.removeOne,
//   },
// });

// export const {
//   addChannel,
//   addChannels,
//   addMessage,
//   addUser,
//   removeSomeChannel,
//   setCurrentChannel,
//   setCurrentChannelId,
//   getChannelsName,
//   editSomeChannel,
// } = channelsSlice.actions;
// export default channelsSlice.reducer;

// export const { selectAll: selectAllChannels, selectById: selectByIdChannels } =
//   channelsAdapter.getSelectors((state) => state.channels);
// export const { selectAll: selectAllMessages, selectById: selectMessageById } =
//   messagesAdapter.getSelectors((state) => state.channels.messages);
// export const { selectAll: selectAllUsers, selectById: selectByIdUsers } =
//   usersAdapter.getSelectors((state) => state.channels.users);

// export const selectMessagesByChannelId = (state, channelId) => {
//   const channelMessages = state.channels.messages[channelId];
//   ('channelMessages', channelMessages);
//   // ('channelMessagesSelectors', messagesAdapter.getSelectors().selectAll(channelMessages) || []);
//   return channelMessages
//     ? messagesAdapter.getSelectors().selectAll(channelMessages)
//     : [];
// };

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
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
    removeChannel: channelsAdapter.removeOne,
    editChannel: channelsAdapter.updateOne,
    getChannelsName: (state, action) => {
      state.channelsName.push(action.payload);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const {
  addChannel,
  addChannels,
  removeChannel,
  editChannel,
  getChannelsName,
  setCurrentChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;

// Селекторы для каналов
export const { selectAll: selectAllChannels, selectById: selectByIdChannels } =
  channelsAdapter.getSelectors((state) => state.channels);
