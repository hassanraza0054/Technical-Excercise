import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import ItemGroup from "./ItemGroup/ItemGroup";

import classes from "./ItemGroups.module.css";

const ItemGroups = (props) => {
  return (
    <Grid
      item
      xs={props.breakpoint ? 4 : 12}
      className={classes.groups}
      style={{
        position: props.breakpoint ? "" : "absolute",
        width: props.breakpoint ? "" : "100%",
        zIndex: props.breakpoint ? 0 : props.zIndex,
      }}
    >
      <List>
        {props.arrayOfItemGroups.map((group, index) => {
          return (
            <ItemGroup
              key={index}
              showItems={(groupName) => {
                props.showItems(groupName);
              }}
              group={group}
              activeGroupName={props.activeGroupName}
            />
          );
        })}
      </List>
    </Grid>
  );
};

export default ItemGroups;
