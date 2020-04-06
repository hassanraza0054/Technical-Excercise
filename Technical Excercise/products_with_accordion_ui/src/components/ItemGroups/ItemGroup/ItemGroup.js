import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import classes from "./ItemGroup.module.css";

const ItemGroup = (props) => {
  return (
    <ListItem
      className={
        props.activeGroupName === props.group.name
          ? classes.groupSelected
          : classes.group
      }
      button
      onClick={() => props.showItems(props.group.name)}
    >
      <ListItemText className={classes.underline}>
        {props.group.name}
        {props.activeGroupName === props.group.name ? (
          <span className={classes.number}>{props.group.items.length}</span>
        ) : (
          <span></span>
        )}
      </ListItemText>
    </ListItem>
  );
};

export default ItemGroup;
