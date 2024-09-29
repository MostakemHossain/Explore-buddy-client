import { IMeta } from "@/types";
import { Trip } from "@/types/tour/tour";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const tourApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTour: build.mutation({
      query: (data) => {
        return {
          url: "/trips",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        };
      },
      invalidatesTags: [tagTypes.myTrips],
    }),
    getMyTrip: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/trips/my-trips",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: { data: Trip[]; meta: IMeta }) => {
        return response;
      },
      providesTags: [tagTypes.myTrips],
    }),
    getTrip: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/trips/my-trips/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.myTrips],
    }),
    updateMyTrip: build.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/trips/my-trips/${id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.myTrips],
    }),
    createTravelBuddyRequest: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/trip/${id}/request`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        };
      },
      invalidatesTags: [tagTypes.myTrips],
    }),

    deleteMyTrip: build.mutation({
      query: (id) => {
        return {
          url: `/trips/my-trips/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.myTrips],
    }),
  }),
});

export const {
  useCreateTourMutation,
  useGetMyTripQuery,
  useDeleteMyTripMutation,
  useGetTripQuery,
  useUpdateMyTripMutation,
  useCreateTravelBuddyRequestMutation,
} = tourApi;
