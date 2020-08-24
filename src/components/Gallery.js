import React from "react";
import { css } from "@emotion/core";
import { readdirSync } from "fs";
import { shell } from "electron";

export default function Gallery(props) {
  const { folders } = props;
  const folder = folders[0];
  const subdirectories = readdirSync(folder, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return (
    <div
      css={css`
        padding: 48px 16px;
        display: flex;
        flex-flow: row wrap;
      `}
    >
      {subdirectories.map((subdir) => (
        <img
          key={subdir}
          src={`file://${folder}/${subdir}/thumbnail.jpg`}
          onClick={() => shell.openPath(`${folder}/${subdir}/`)}
          css={css`
            cursor: pointer;
            flex: none;
            width: ${100 / 3}%;
            padding: 0 8px;
            border-radius: 8px;
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.025);
            }
          `}
        />
      ))}
    </div>
  );
}
