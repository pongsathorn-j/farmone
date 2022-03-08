import React from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Auth from "../components/Auth";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <>
      <Head>
        <title>Farm</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <SessionProvider session={session}>
            {Component.getLayout ? (
              <Component {...pageProps} />
            ) : (
              <>
                {Component.auth ? (
                  <Auth role={Component.auth.role}>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </Auth>
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </>
            )}
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
