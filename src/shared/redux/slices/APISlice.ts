import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config';

export interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export interface IComment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export const postsApi = createApi({
	reducerPath: 'postApi',

	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: (builder) => ({
		getAllPosts: builder.query<IPost[], void>({
			query: () => '/posts',
		}),
		getPostByIndex: builder.query<IPost, number>({
			query: (index) => `/posts/${index}`,
		}),
	}),
});

export const usersApi = createApi({
	reducerPath: 'userApi',

	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: (builder) => ({
		getAllUsers: builder.query<IUser[], void>({
			query: () => '/users',
		}),
		getUserByIndex: builder.query<IUser, number>({
			query: (index) => `/users/${index}`,
		}),
	}),
});

export const commentsApi = createApi({
	reducerPath: 'commentsApi',

	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: (builder) => ({
		getAllComments: builder.query<IComment[], void>({
			query: () => '/comments',
		}),
	}),
});

export const { useGetAllPostsQuery, useGetPostByIndexQuery } = postsApi;

export const { useGetAllUsersQuery, useGetUserByIndexQuery } = usersApi;

export const { useGetAllCommentsQuery } = commentsApi;
