import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ItemVariant from "./ItemVariant/ItemVariant";
import ClosePanelButton from "../../../utilities/ClosePanelButton/ClosePanelButton";

import classes from "./ItemVariants.module.css";

const ItemVariants = (props) => {
  const closed = () => {
    props.closeOverlay(true);
  };

  return (
    <div
      className={
        props.showVariants
          ? classes.variantsListShown
          : classes.variantsListHidden
      }
      style={{
        position: props.breakpoint ? "absolute" : "fixed",
      }}
    >
      {props.arrayOfItemVariants !== undefined ? (
        <List>
          <ListItem>
            <ListItemText>{props.itemName}</ListItemText>
            <ClosePanelButton closed={closed} symbol={"X"} />
          </ListItem>
          {props.arrayOfItemVariants === null ? (
            <ListItem>
              <ListItemText>Not Available</ListItemText>
            </ListItem>
          ) : (
            props.arrayOfItemVariants.map((itemVariant, index) => {
              return <ItemVariant key={index} itemVariant={itemVariant} />;
            })
          )}
        </List>
      ) : null}
    </div>
  );
};

export default ItemVariants;
