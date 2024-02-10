import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PostProps } from '../../../entities/post/ui/post-card';
import { API_URL } from "../../config";

export const postsApi = createApi({
	reducerPath: 'postApi',
	
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
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
