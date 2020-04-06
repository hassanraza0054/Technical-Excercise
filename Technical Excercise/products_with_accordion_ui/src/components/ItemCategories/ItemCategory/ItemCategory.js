import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import classes from "./ItemCategory.module.css";

const ItemCategory = (props) => {
  return (
    <ListItem
      className={
        props.activeCategoryName === props.category.name
          ? classes.categorySelected
          : classes.category
      }
      button
      onClick={() => props.showItemGroups(props.category.name)}
    >
      <ListItemText className={classes.underline}>
        {props.category.name}
        {props.activeCategoryName === props.category.name ? (
          <span className={classes.number}>{props.category.items.length}</span>
        ) : (
          <span></span>
        )}
      </ListItemText>
    </ListItem>
  );
};

export default ItemCategory;
