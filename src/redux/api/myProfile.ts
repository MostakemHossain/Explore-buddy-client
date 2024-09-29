import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const myProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyOwnProfile: build.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),

      providesTags: [tagTypes.profile],
    }),

    updateMyProfile: build.mutation({
      query: (data) => {
        return {
          url: `/profile/update-my-profile`,
          method: "PATCH",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetMyOwnProfileQuery, useUpdateMyProfileMutation } =
  myProfileApi;
