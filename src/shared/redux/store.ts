import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { postsApi, usersApi, commentsApi } from './slices/APISlice';

export const store = configureStore({
	reducer: {
		[postsApi.reducerPath]: postsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[commentsApi.reducerPath]: commentsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(postsApi.middleware)
			.concat(usersApi.middleware)
			.concat(commentsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
