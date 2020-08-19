import React from "react";
import { Global, css } from "@emotion/core";

import TitleBar from "./TitleBar";

const globalStyle = css`
  html {
    /* Prevent padding and border from affecting element width */
    box-sizing: border-box;
    height: 100%;
    line-height: 1.5;

    /* Breaks words to prevent overflow in all browsers */
    overflow-wrap: break-word;

    /* Remove the grey highlight on links in iOS */
    -webkit-tap-highlight-color: transparent;

    /* Prevent adjustments of font size after orientation changes in iOS. */
    -webkit-text-size-adjust: 100%;

    /* Font Smoothing */
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    padding: 0;
    margin: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  button {
    padding: 0;
    line-height: inherit;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 0;
  }

  button:focus {
    outline: 0;
  }
`;

export default function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <TitleBar />
      <h1>Test</h1>
    </>
  );
}
