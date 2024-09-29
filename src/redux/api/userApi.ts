import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const tourApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMyProfileQuery } = tourApi;
