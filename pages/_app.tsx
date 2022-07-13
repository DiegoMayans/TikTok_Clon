import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // SSR --> Server Side Rendered
  const [isSSR, setIsSSR] = useState(true);

  // useEffect only takes place on CSR --> Client Side Rendered
  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div>
      <Head>
        <title>TikTik App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
        <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
          <Navbar />
          <div className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
            <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default MyApp;
