import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Data from 'models/Data.type';
import URLConstants from 'models/URLConstants';

const cardDataAPI = createApi({
  reducerPath: 'cardDataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: URLConstants.BASE_URL,
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    fetchAllCardData: build.query<Data[], string>({
      query: (value = '') => ({
        url: '/',
        params: {
          q: value,
        },
      }),
    }),
    fetchModalCardData: build.query<Data[], number | null>({
      query: (value = null) => ({
        url: '/',
        params: {
          id: value,
        },
      }),
    }),
  }),
});

export default cardDataAPI;
