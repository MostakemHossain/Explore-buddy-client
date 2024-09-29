import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const tripRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTripRequest: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/trip/travel-buddies/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.tripRequest],
    }),
    getALLTripRequest: build.query({
      query: () => ({
        url: `/trip/travel-request`,
        method: "GET",
      }),
      providesTags: [tagTypes.tripRequest],
    }),
    getALLApprovalTripRequest: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/trips/all-trips`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tripRequest],
    }),
    updateUserTripRequest: build.mutation({
      query: ({ id, newStatus }) => {
        return {
          url: `/trip/travel-buddies/${id}/respond`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: { newStatus },
        };
      },
      invalidatesTags: [tagTypes.myTrips],
    }),
    updateSpecificTripRequest: build.mutation({
      query: (id) => {
        return {
          url: `/trip/${id}/request`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: [tagTypes.myTrips],
    }),
  }),
});

export const {
  useGetTripRequestQuery,
  useGetALLTripRequestQuery,
  useUpdateSpecificTripRequestMutation,
  useGetALLApprovalTripRequestQuery,
  useUpdateUserTripRequestMutation,
} = tripRequestApi;
