import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/index.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import tokenStore from "@/store/tokenStore";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
