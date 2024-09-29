import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const myProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),

      providesTags: [tagTypes.manageUser],
    }),
    updateUsers: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/update-role-status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.manageUser],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUsersMutation } = myProfileApi;
