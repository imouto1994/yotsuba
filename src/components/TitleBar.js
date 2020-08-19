import React, { useState } from "react";
import { css } from "@emotion/core";
import { remote } from "electron";

const buttonStyle = css`
  padding: 11px 18px;

  &:hover {
    background: #212121;
  }
`;

export default function TitleBar() {
  const [maximized, setMaximized] = useState(true);

  return (
    <div
      css={css`
        display: flex;
        flex-flow: row-reverse nowrap;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
      `}
    >
      <button
        css={css`
          ${buttonStyle}
        `}
        onClick={() => remote.getCurrentWindow().close()}
      >
        <IconClose />
      </button>
      <button
        css={css`
          ${buttonStyle}
        `}
        onClick={() => {
          if (maximized) {
            setMaximized(false);
            remote.getCurrentWindow().unmaximize();
          } else {
            setMaximized(true);
            remote.getCurrentWindow().maximize();
          }
        }}
      >
        {maximized ? <IconMaximizeActive /> : <IconMaximizeInactive />}
      </button>
      <button
        css={css`
          ${buttonStyle}
        `}
        onClick={() => remote.getCurrentWindow().minimize()}
      >
        <IconMinimize />
      </button>
    </div>
  );
}

const iconStyle = css`
  width: 10px;
  height: 10px;
`;

function IconMinimize() {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 10.2 1"
      css={css`
        ${iconStyle}
      `}
    >
      <rect fill="#fff" width="10.2" height="1"></rect>
    </svg>
  );
}

function IconMaximizeInactive() {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 10.2 10.1"
      css={css`
        ${iconStyle}
      `}
    >
      <path fill="#fff" d="M0,0v10.1h10.2V0H0z M9.2,9.2H1.1V1h8.1V9.2z"></path>
    </svg>
  );
}

function IconMaximizeActive() {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 10.2 10.2"
      css={css`
        ${iconStyle}
      `}
    >
      <path
        fill="#fff"
        d="M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z"
      ></path>
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 10.2 10.2"
      data-radium="true"
      css={css`
        ${iconStyle}
      `}
    >
      <polygon
        fill="#fff"
        points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 "
      ></polygon>
    </svg>
  );
}
