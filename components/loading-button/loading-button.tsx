import React, { useState, ReactNode, MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

export type MouseOnClickEvent = MouseEventHandler<HTMLButtonElement>;

export type loadingState = "" | "loading" | "error" | "done";


export type LoadingButtonType = {
  children: ReactNode;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function LoadingButton({
  children: inChildren,
  onClick,
  ...restProps
}: LoadingButtonType) {
  const { props, children } = useLoadingButton(inChildren, onClick);

  return (
    <Button {...restProps} {...props}>
      {children}
    </Button>
  );
}

function useLoadingButton(
  children: ReactNode,
  asyncOnClick?: MouseOnClickEvent
) {
  const [state, setState] = useState<loadingState>("");

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setState("loading");
    
    if (asyncOnClick) {
      try {
        await asyncOnClick(event);
      } catch (e: unknown) {
        console.log("error", e);
        setState("error");
      }
    }
    setState("done");
  };

  const props = {
    onClick: onButtonClick,
    disabled: state === "loading",
  };

  let c = children;
  if ("loading" === state) {
    c = <>Loading</>;
  } else if ("error" === state) {
    c = <>Error</>;
  } else if ("done" === state) {
    c = <>Done</>;
  }

  return { props, children: c };
}
