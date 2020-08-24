import React, { useReducer } from "react";
import { Global, css } from "@emotion/core";
import Store from "electron-store";

import Gallery from "./Gallery";
import Preferences from "./Preferences";
import TitleBar from "./TitleBar";

const globalStyle = css`
  html {
    /* Prevent padding and border from affecting element width */
    box-sizing: border-box;
    height: 100%;
    line-height: 1.5;
    color: #576574;

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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  button {
    padding: 0;
    margin: 0;
    line-height: inherit;
    font-size: 14px;
    font-family: inherit;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 0;
  }

  button:hover {
    color: #fff;
  }

  button:focus {
    outline: 0;
  }
`;

const config = new Store();

function reducer(state, action) {
  switch (action.type) {
    case "FOLDERS_APPEND": {
      const currentFolders = state.folders;
      const {
        payload: { folders: appendedFolders },
      } = action;
      const newFolders = appendedFolders.filter(
        (folder) => currentFolders.indexOf(folder) === -1,
      );
      const updatedFolders = [...state.folders, ...newFolders];
      config.set("folders", updatedFolders);

      return {
        ...state,
        folders: updatedFolders,
      };
    }
    case "FOLDER_REMOVE": {
      const {
        payload: { folder },
      } = action;
      const currentFolders = state.folders;
      const updatedFolders = currentFolders.filter((f) => f !== folder);

      return {
        ...state,
        folders: updatedFolders,
      };
    }
    default:
      return state;
  }
}

export default function App() {
  const [store, dispatch] = useReducer(reducer, {
    folders: config.get("folders", []),
  });

  return (
    <>
      <Global styles={globalStyle} />
      <TitleBar />
      <Gallery folders={store.folders} />
      <Preferences folders={store.folders} dispatch={dispatch} />
    </>
  );
}
