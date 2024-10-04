import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  messages: {}, // Если ты хочешь хранить сообщения по каналам, оставляем это
  currentChannelId: null,
  currentChannel: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { channelId, message } = action.payload;
      'channelId', channelId;
      'приходящий message', message;
      if (!state.messages[channelId]) {
        ('da');
        state.messages[channelId] = messagesAdapter.getInitialState();
        'state', current(state);
      }

      state.messages[channelId] = messagesAdapter.addOne(
        state.messages[channelId],
        message,
      );
      'channelidId', channelId;
      'typeofChannelId', typeof channelId;
    },
    // setCurrentChannelId: (state, action) => {
    //   state.currentChannelId = action.payload;
    // },
    // Удалить все операции, не относящиеся к сообщениям
    removeMessagesByChannelId: (state, action) => {
      const { channelId } = action.payload;
      delete state.messages[channelId];
    },
  },
});

export const { addMessage, removeMessagesByChannelId } = messagesSlice.actions;

export default messagesSlice.reducer;

// Селекторы для сообщений
export const { selectAll: selectAllMessages, selectById: selectMessageById } =
  messagesAdapter.getSelectors((state) => state.messages);

// Селектор для получения сообщений по ID канала
export const selectMessagesByChannelId = (state, channelId) => {
  const channelMessages = state.messages?.messages[channelId];
  'channelMessages', channelMessages;
  return channelMessages
    ? messagesAdapter.getSelectors().selectAll(channelMessages)
    : [];
};
