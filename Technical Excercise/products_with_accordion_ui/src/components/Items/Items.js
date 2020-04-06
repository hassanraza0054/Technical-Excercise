import React from "react";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import Item from "./Item/item";
import ItemVariants from "./ItemVariants/ItemVariants";

import classes from "./Items.module.css";

const Items = (props) => {
  return (
    <Grid
      item
      xs={props.breakpoint ? 4 : 12}
      className={classes.items}
      style={{
        position: props.breakpoint ? "" : "absolute",
        width: props.breakpoint ? "" : "100%",
        zIndex: props.breakpoint ? 0 : props.zIndex,
      }}
    >
      <List>
        {props.arrayOfItems.map((item, index) => {
          return (
            <Item
              key={index}
              showItemVariants={(item) => props.showItemVariantsOverlay(item)}
              item={item}
              activeItem={props.activeItem}
            />
          );
        })}
      </List>
      <ItemVariants
        showVariants={props.itemVariantsOverlay}
        closeOverlay={props.closeItemVariantsOverlay}
        arrayOfItemVariants={props.activeItem.variants}
        itemName={props.activeItem.name}
        breakpoint={props.breakpoint}
      />
    </Grid>
  );
};

export default Items;
