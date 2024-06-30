// store.js
import {
  configureStore,
  createSlice,
  createEntityAdapter,
  current,
} from '@reduxjs/toolkit';

// Создаем адаптеры для каждой сущности

const messagesAdapter = createEntityAdapter();
const usersAdapter = createEntityAdapter();
const channelsAdapter = createEntityAdapter();

// Создаем начальное состояние для всех адаптеров
const initialState = {
  messages: {},
  users: usersAdapter.getInitialState(),
  channels: channelsAdapter.getInitialState(),
};

// Создаем срез с действиями для добавления и удаления элементов
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (!state.messages.entities) {
        state.messages = messagesAdapter.getInitialState();

        console.log(current(state));
      }
      // Теперь добавляем сообщение, используя адаптер
      messagesAdapter.addOne(state.messages, action.payload);
    },
    removeMessage: (state, action) => {
      messagesAdapter.removeOne(state.messages, action.payload);
    },
    addUser: (state, action) => {
      usersAdapter.addOne(state.users, action.payload);
    },
    removeUser: (state, action) => {
      usersAdapter.removeOne(state.users, action.payload);
    },
    addChannel: (state, action) => {
      channelsAdapter.addOne(state.channels, action.payload);
    },
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state.channels, action.payload);
    },
  },
});

// Экспортируем действия и редуктор
export const {
  addMessage,
  removeMessage,
  addUser,
  removeUser,
  addChannel,
  removeChannel,
} = appSlice.actions;
export default appSlice.reducer;

// Создаем и экспортируем магазин
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
store.subscribe(() => {
  const value = store.getState();
  console.log(value);
});
