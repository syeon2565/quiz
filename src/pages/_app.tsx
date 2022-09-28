import type { AppProps } from "next/app";
import {
  QueryClientProvider,
  QueryClient,
  QueryFunction,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        limit={1}
      />
    </QueryClientProvider>
  );
}

export default MyApp;
