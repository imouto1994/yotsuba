import React, { useState } from "react";
import { css } from "@emotion/core";
import { remote } from "electron";

export default function Preferences(props) {
  const { dispatch, folders } = props;
  const [showPreferences, setShowPreferences] = useState(false);

  async function onAddNewFolderButtonClick() {
    const dialogRes = await remote.dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (!dialogRes.canceled) {
      dispatch({
        type: "FOLDERS_APPEND",
        payload: {
          folders: dialogRes.filePaths,
        },
      });
    }
  }

  function onFolderRemove(folder) {
    dispatch({
      type: "FOLDER_REMOVE",
      payload: {
        folder,
      },
    });
  }

  return (
    <>
      <button
        css={css`
          position: fixed;
          bottom: 16px;
          right: 16px;
          line-height: 0;
          z-index: 1;
        `}
        onClick={() => setShowPreferences(!showPreferences)}
      >
        <IconPreferences />
      </button>
      {showPreferences && (
        <div
          css={css`
            position: fixed;
            top: 32px;
            left: 0;
            right: 0;
            bottom: 0;
            background: #141414;
            z-index: 2;
            padding: 16px 32px;
          `}
        >
          <h1
            css={css`
              font-size: 32px;
              font-weight: 600;
            `}
          >
            Preferences
          </h1>
          <h2
            css={css`
              font-size: 24px;
              font-weight: 600;
            `}
          >
            Gallery Folders
          </h2>
          {folders.map((folder) => (
            <div key={folder}>
              <span>{folder}</span>
              <button onClick={() => onFolderRemove(folder)}>Delete</button>
            </div>
          ))}
          <button onClick={onAddNewFolderButtonClick}>
            Add new gallery folder
          </button>
        </div>
      )}
    </>
  );
}

function IconPreferences() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      css={css`
        width: 32px;
        height: 32px;
        fill: #576574;

        &:hover {
          fill: #fff;
        }
      `}
    >
      <path d="M478.9 194.94l-21.44-1.53a210.09 210.09 0 00-14.83-35.73l14.07-16.27a35.76 35.76 0 00-1.75-48.5l-35.98-35.98a35.76 35.76 0 00-48.53-1.72L354.18 69.3a209.97 209.97 0 00-35.74-14.8l-1.55-21.45A35.76 35.76 0 00281.35 0h-50.88a35.75 35.75 0 00-35.53 33.1l-1.53 21.44a210.02 210.02 0 00-35.57 14.75l-16.28-14.1a35.76 35.76 0 00-48.53 1.74L57.06 92.9a35.76 35.76 0 00-1.75 48.51l14.07 16.26a210 210 0 00-14.84 35.72l-21.46 1.54A35.75 35.75 0 000 230.47v50.88a35.76 35.76 0 0033.06 35.53l21.43 1.55a210.11 210.11 0 0014.8 35.73l-14.1 16.28a35.76 35.76 0 001.74 48.53l17.39 17.38a8 8 0 0011.3-11.3l-17.4-17.39a19.72 19.72 0 01-.95-26.75L85 360.44a7.99 7.99 0 00.92-9.14 193.96 193.96 0 01-17.64-42.6 7.99 7.99 0 00-7.12-5.81l-26.94-1.95a19.72 19.72 0 01-18.24-19.6v-50.87a19.72 19.72 0 0118.25-19.6l26.98-1.93a7.99 7.99 0 007.12-5.81A194 194 0 0186 160.55a8 8 0 00-.92-9.15l-17.7-20.45a19.72 19.72 0 01.97-26.75l35.98-35.97c7.25-7.26 19-7.67 26.75-.96L151.56 85a7.99 7.99 0 009.14.93 193.76 193.76 0 0142.45-17.6 8 8 0 005.8-7.13l1.93-26.97a19.71 19.71 0 0119.6-18.25h50.88c10.24 0 18.85 8 19.6 18.23l1.95 26.96a7.99 7.99 0 005.8 7.12 193.94 193.94 0 0142.6 17.64 7.99 7.99 0 009.15-.93l20.45-17.72a19.72 19.72 0 0126.76.95l35.98 35.98c7.24 7.24 7.67 19 .96 26.74l-17.7 20.47a8 8 0 00-.91 9.14 194 194 0 0117.68 42.58 8 8 0 007.12 5.81l26.97 1.93a19.72 19.72 0 0118.25 19.6v50.87c0 10.25-8 18.86-18.23 19.6l-26.96 1.95a7.99 7.99 0 00-7.11 5.82 194 194 0 01-17.65 42.6 7.99 7.99 0 00.93 9.14l17.72 20.45a19.72 19.72 0 01-.95 26.76l-35.98 35.98a19.72 19.72 0 01-26.75.96l-20.46-17.7a7.99 7.99 0 00-9.14-.91 193.98 193.98 0 01-42.74 17.72 8 8 0 00-5.81 7.12l-1.95 26.94a19.72 19.72 0 01-19.6 18.24h-50.87a19.72 19.72 0 01-19.6-18.25l-1.93-26.98a7.99 7.99 0 00-5.81-7.12A193.98 193.98 0 01160.55 426a8 8 0 00-9.15.92l-20.45 17.7a19.72 19.72 0 01-26.75-.97 8 8 0 00-11.3 11.3 35.76 35.76 0 0048.51 1.75l16.26-14.07a210.09 210.09 0 0035.72 14.84l1.54 21.46A35.76 35.76 0 00230.47 512h50.88a35.76 35.76 0 0035.53-33.07l1.55-21.42a209.97 209.97 0 0035.89-14.88l16.27 14.07a35.76 35.76 0 0048.5-1.75l35.98-35.98a35.75 35.75 0 001.72-48.53l-14.09-16.26c6.03-11.44 11-23.42 14.8-35.73l21.44-1.56A35.77 35.77 0 00512 281.36v-50.88a35.76 35.76 0 00-33.1-35.54z" />
      <path d="M256 169.18c8.73 0 17.35 1.29 25.6 3.83a7.99 7.99 0 104.7-15.27 102.8 102.8 0 00-30.3-4.55c-56.69 0-102.8 46.12-102.8 102.81 0 56.69 46.11 102.8 102.8 102.8S358.8 312.7 358.8 256c0-32.45-14.84-62.32-40.72-81.95a7.99 7.99 0 10-9.66 12.73 86.22 86.22 0 0134.4 69.22c0 47.87-38.95 86.82-86.82 86.82-47.87 0-86.82-38.95-86.82-86.82 0-47.88 38.94-86.82 86.82-86.82z" />
    </svg>
  );
}
