import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userContact: build.mutation({
      query: (userData) => ({
        url: `/contact/create-contact`,
        method: "POST",
        contentType: "application/json",
        data: userData,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
    getUserContact: build.query({
      query: () => ({
        url: `/contact`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUserContactMutation, useGetUserContactQuery } = contactApi;
