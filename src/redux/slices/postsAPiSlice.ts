import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PostProps } from '../../components/mainPage/Post';

export const postsApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com',
	}),
	endpoints: (builder) => ({
		getAllPosts: builder.query<PostProps[], void>({
			query: () => '/posts',
		}),
		getPostByIndex: builder.query<PostProps, string>({
			query: (index) => `/posts/${index}`,
		}),
	}),
});

export const { useGetPostByIndexQuery, useGetAllPostsQuery } = postsApi;
