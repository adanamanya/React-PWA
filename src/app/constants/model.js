import {
  action,
  createStore,
  StoreProvider,
  useStore,
  useActions,
} from 'easy-peasy';

// 👇 create your store, providing the model
export const store = createStore({
  todos: {
    items: [],
    // 👇 define actions directly on your model
    add: action((state, payload) => {
      // simply mutate state to update, and we convert to immutable updates
      state.items.push(payload);
      // (you can also return a new immutable version of state if you prefer)
    }),
    setItem: action((state, payload) => {
      state.items = payload;
    }),
  },
});
