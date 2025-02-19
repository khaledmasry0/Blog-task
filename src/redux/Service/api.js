import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Post", "Comment", "User"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    likePost: builder.mutation({
      query: ({ id, userId, currentLikes }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: { likes: [...currentLikes, userId] },
      }),
      invalidatesTags: ["Post"],
    }),
    dislikePost: builder.mutation({
      query: ({ id, userId, currentLikes }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: { likes: currentLikes.filter((uid) => uid !== userId) },
      }),
      invalidatesTags: ["Post"],
    }),

    // 💬 Comments API
    getCommentsByPostId: builder.query({
      query: (postId) => `/comments?postId=${postId}`,
      providesTags: ["Comment"],
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment"],
    }),

    updateComment: builder.mutation({
      query: ({ id, ...updatedComment }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: updatedComment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Comment", id }],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: ({ username, password }) => ({
        url: `/users?username=${username}&password=${password}`,
        method: "GET",
      }),
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useDislikePostMutation,
  useLikePostMutation,
  useGetCommentsByPostIdQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useGetUsersQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = api;
