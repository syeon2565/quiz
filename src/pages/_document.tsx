/* eslint-disable import/extensions */
import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

import { getCssText } from "~styles/stithes.config";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
