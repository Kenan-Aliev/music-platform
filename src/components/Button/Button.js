import React from "react";
import Button from "@mui/material/Button";

function MyButton(props) {
  return <Button {...props}>{props.children}</Button>;
}

export default MyButton;
