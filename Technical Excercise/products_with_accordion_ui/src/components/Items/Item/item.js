import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

import { API } from "../../../utilities/api";

import classes from "./item.module.css";

const Item = (props) => {
  const [loadedImage, setLoadedImage] = useState(false);

  let imageResolvedUrl = () => {
    if (props.item.thumbnail !== null) {
      return props.item.thumbnail;
    } else if (props.item.imageUrl !== null) {
      return props.item.imageUrl;
    } else if (props.item.imageAlt !== null) {
      return props.item.imageAlt;
    } else {
      return "Image";
    }
  };

  return (
    <React.Fragment>
      <ListItem
        button
        className={
          props.activeItem.name === props.item.name
            ? classes.cardSelected
            : classes.card
        }
        onClick={() => props.showItemVariants(props.item)}
      >
        <Grid container>
          <Grid item xs={9}>
            <ListItemText
              primary={props.item.name}
              className={classes.underline}
            />
            <div className={classes.description}>
              {props.item.shortDescription}
            </div>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.imgDiv}>
            <img
              src={`${API}${imageResolvedUrl()}`}
              onLoad={() => setLoadedImage(true)}
              alt={props.item.imageAlt}
            />
            {!loadedImage ? <CircularProgress /> : null}
          </div>
        </Grid>
      </ListItem>
    </React.Fragment>
  );
};

export default Item;
