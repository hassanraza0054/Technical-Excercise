import React from "react";
import ListItem from "@material-ui/core/ListItem";

import classes from "./ClosePanelButton.module.css";

const ClosePanelButton = (props) => {
  return (
    <ListItem button onClick={props.closed} className={classes.closeBtn}>
      X
    </ListItem>
  );
};

export default ClosePanelButton;
