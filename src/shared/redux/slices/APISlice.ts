import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PostProps } from '../../../entities/post/ui/post-card';
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

export const postsApi = createApi({
	reducerPath: 'postApi',

	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	endpoints: (builder) => ({
		getAllPosts: builder.query<PostProps[], void>({
			query: () => '/posts',
		}),
		getPostByIndex: builder.query<PostProps, number>({
			query: (index) => `/posts/${index}`,
		}),
	}),
});

export const usersApi = createApi({
	reducerPath: 'userApi',

	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
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

export const { useGetAllPostsQuery, useGetPostByIndexQuery } = postsApi;

export const { useGetAllUsersQuery, useGetUserByIndexQuery } = usersApi;
