import type { AppProps } from "next/app";
import {
  QueryClientProvider,
  QueryClient,
  QueryFunction,
} from "@tanstack/react-query";

import "normalize.css";
import Axios from "../lib/Axios";

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const { data } = await Axios.get(queryKey[0] as string);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

export default MyApp;
