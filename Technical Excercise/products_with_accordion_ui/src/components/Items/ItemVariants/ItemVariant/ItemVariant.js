import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

import { API } from "../../../../utilities/api";

import classes from "./ItemVariant.module.css";

const ItemVariant = (props) => {
  const [loadedImage, setLoadedImage] = useState(false);

  let imageResolvedUrl = () => {
    if (props.itemVariant.thumbnail !== null) {
      return props.itemVariant.thumbnail;
    } else if (props.itemVariant.imageUrl !== null) {
      return props.itemVariant.imageUrl;
    } else if (props.itemVariant.imageAlt !== null) {
      return props.itemVariant.imageAlt;
    } else {
      return "Image";
    }
  };

  return (
    <React.Fragment>
      <ListItem button>
        <Grid container data-testid="itemVariant">
          <Grid item xs={9}>
            {/* Size & Price */}
            <ListItemText
              primary={`${
                props.itemVariant.name !== null
                  ? `${props.itemVariant.name} /`
                  : ""
              } ${props.itemVariant.price}`}
            />

            {/* Availability */}
            <div
              className={classes.description}
              style={{
                color: props.itemVariant.inStock ? "green" : "red",
              }}
            >
              {props.itemVariant.inStock ? "Available" : "Out of Stock"}
            </div>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.imgDiv}>
            <img
              src={`${API}${imageResolvedUrl()}`}
              onLoad={() => setLoadedImage(true)}
              alt={
                props.itemVariant.imageAlt !== null
                  ? props.itemVariant.imageAlt
                  : "Image Not Available"
              }
            />
            {!loadedImage ? <CircularProgress /> : null}
          </div>
        </Grid>
      </ListItem>
    </React.Fragment>
  );
};

export default ItemVariant;
