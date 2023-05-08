import * as rtkQuery from '@reduxjs/toolkit/dist/query/react';
import Data from 'models/Data.type';
import URLConstants from 'models/URLConstants';

type TypeRtkQuery = typeof rtkQuery & { default?: unknown };

const { buildCreateApi, coreModule, reactHooksModule, fetchBaseQuery } = ((rtkQuery as TypeRtkQuery)
  .default ?? rtkQuery) as typeof rtkQuery;

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

const cardDataAPI = createApi({
  reducerPath: 'cardDataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: URLConstants.BASE_URL,
  }),
  endpoints: (build) => ({
    fetchAllCardData: build.query<Data[], string>({
      query: (value) => ({
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
