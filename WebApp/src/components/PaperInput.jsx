import { Paper } from "@material-ui/core";
import React from "react";

function PaperInput({ child }) {
  const [elevation, setElevation] = React.useState(2);
  return (
    <Paper
      style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
      elevation={elevation}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(2)}
    >
      {child}
    </Paper>
  );
}

export default PaperInput;
