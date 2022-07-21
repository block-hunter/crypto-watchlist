import { configureStore } from '@reduxjs/toolkit'
import watchlistReducer from './reducers/watchlistReducer';

const store = configureStore({
  reducer: watchlistReducer,
});

export default store;