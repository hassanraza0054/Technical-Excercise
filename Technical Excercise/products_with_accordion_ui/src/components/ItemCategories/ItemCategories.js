import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import ItemCategory from "./ItemCategory/ItemCategory";

import classes from "./ItemCategories.module.css";

const ItemCategories = (props) => {
  return (
    <Grid
      item
      xs={props.breakpoint ? 4 : 12}
      className={classes.categories}
      style={{
        position: props.breakpoint ? "" : "relative",
        zIndex: props.breakpoint ? 0 : props.zIndex,
      }}
    >
      <List>
        {(props.arrayOfItemCategories || []).map((category, index) => {
          return (
            <ItemCategory
              key={index}
              showItemGroups={(categoryName) => {
                props.showItemGroups(categoryName);
              }}
              category={category}
              activeCategoryName={props.activeCategoryName}
            />
          );
        })}
      </List>
    </Grid>
  );
};

export default ItemCategories;
