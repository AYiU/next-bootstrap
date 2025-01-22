import React from "react";


interface IfElseProps {
  condition: boolean;
  children: React.ReactNode;
}

export const IfElse: React.FC<IfElseProps> = ({ condition, children }) => {
  if (Array.isArray(children)) {
    if (!!condition) {
      return children[0];
    } else {
      return children[1];
    }
  } else {
    return !!condition ? <>{children}</> : null;
  }
};

IfElse.displayName = "IfElse Components"
