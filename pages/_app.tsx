import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={undefined}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
