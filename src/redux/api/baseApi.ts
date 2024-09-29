import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "../tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://tour-buddy-server.vercel.app/api",
    // baseUrl: "http://localhost:8000/api",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
