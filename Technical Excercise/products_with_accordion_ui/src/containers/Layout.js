import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import ItemCategories from "../components/ItemCategories/ItemCategories";
import ItemGroups from "../components/ItemGroups/ItemGroups";
import Items from "../components/Items/Items";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import PropTypes from "prop-types";

import * as actionCreators from "../store/actions/layout";

import {
  CATEGORIES,
  GROUPS,
  ITEMS,
  ITEM_VARIANTS,
} from "../utilities/windowVars";

import classes from "./Layout.module.css";

const Layout = (props) => {
  useEffect(() => {
    props.onInitialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Responsive design implementer
  const matches = useMediaQuery("(min-width:600px)");

  // Close ItemVariant, Items, Groups Or Category Window [3,4,5,6]
  const windowBack = () => {
    switch (props.currentWindow) {
      case ITEM_VARIANTS:
        props.onItemVariantsClose();
        return;
      case ITEMS:
        props.onItemsClose();
        return;
      case GROUPS:
        props.onGroupsClose();
        return;
      case CATEGORIES:
        props.onCategoriesClose();
        return;
      default:
        return;
    }
  };
  // Tier 2
  const groupListGenerator = (categoryName) => {
    var targetCategoryIndex;
    for (var i = 0; i < props.data.categories.length; i++) {
      var itemCategoryObj = props.data.categories[i];
      if (Object.values(itemCategoryObj).includes(categoryName)) {
        targetCategoryIndex = i;
        break;
      }
    }
    const response = {
      itemCategoryIndex: targetCategoryIndex,
      activeCategoryName: categoryName,
    };
    props.onGroupsOpen(response);
  };

  // Tier 3
  const itemListGenerator = (groupName) => {
    var targetGroupIndex;
    for (
      var i = 0;
      i < props.data.categories[props.itemCategoryIndex].items.length;
      i++
    ) {
      var itemGroupObj =
        props.data.categories[props.itemCategoryIndex].items[i];
      if (Object.values(itemGroupObj).includes(groupName)) {
        targetGroupIndex = i;
        break;
      }
    }
    const response = {
      itemGroupIndex: targetGroupIndex,
      activeGroupName: groupName,
    };
    props.onItemsOpen(response);
  };

  return (
    <React.Fragment>
      {/* Store Toggling & Back Navigation View Button */}
      <div>
        <Grid container>
          <Grid item xs={12} style={{ background: "#ADA996" }}>
            <Button
              data-testid="storeBtn"
              onClick={
                props.isShopOpen ? props.onStoreClose : props.onStoreOpen
              }
              style={{
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              {props.isShopOpen ? "Close" : "Open"} Store
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: "white",
            }}
          >
            <Button
              data-testid="viewBtn"
              onClick={windowBack}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              {props.currentWindow} View
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.root} data-testid="itemContainer">
          {/* Tier 1  */}
          {/* Item Categories Component  */}
          {props.isShopOpen ? (
            <ItemCategories
              breakpoint={matches}
              arrayOfItemCategories={props.data.categories}
              showItemGroups={(categoryName) =>
                groupListGenerator(categoryName)
              }
              activeCategoryName={props.activeCategoryName}
              zIndex={props.activeCategoryName === "" ? 1 : -1} // Responsive Design
            />
          ) : (
            <Grid item style={{ height: "inherit" }}></Grid>
          )}

          {/* Tier 2  */}
          {/* Item Groups Component  */}
          {props.itemCategoryIndex === undefined ? null : (
            <ItemGroups
              breakpoint={matches}
              arrayOfItemGroups={
                props.data.categories[props.itemCategoryIndex].items
              }
              showItems={(groupName) => itemListGenerator(groupName)}
              activeGroupName={props.activeGroupName}
              zIndex={props.activeGroupName === "" ? 1 : -1} // Responsive Design
            />
          )}
          {/* Tier 3  */}
          {/* Items Component  */}
          {props.itemGroupIndex === undefined ? null : (
            <Items
              breakpoint={matches}
              arrayOfItems={
                props.data.categories[props.itemCategoryIndex].items[
                  props.itemGroupIndex
                ].items
              }
              panelID={3}
              activeItem={props.activeItem}
              showItemVariantsOverlay={(item) => props.onItemVariantsOpen(item)}
              closeItemVariantsOverlay={props.onItemVariantsCloseMain}
              itemVariantsOverlay={props.itemVariantsOverlay}
              zIndex={props.activeItem.name === undefined ? 1 : 0} // Responsive Design
            />
          )}
        </Grid>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  /** Filter Dropdown Label */
  data: PropTypes.object,

  /** Boolean for Category Display */
  isShopOpen: PropTypes.bool,

  /** Name of Current Window */
  currentWindow: PropTypes.string,

  /** Selected Item Category */
  activeCategoryName: PropTypes.string,

  /** Selected Item Group */
  activeGroupName: PropTypes.string,

  /** Selected Item */
  activeItem: PropTypes.object,

  /** Boolean for Item Variants Display */
  itemVariantsOverlay: PropTypes.bool,

  /** Selected Item Category Index */
  itemCategoryIndex: PropTypes.number,

  /** Selected Group Category Index */
  itemGroupIndex: PropTypes.number,
};

const mapStateToProps = (state) => ({
  data: state.productList,
  isShopOpen: state.isShopOpen,
  currentWindow: state.currentWindow,
  activeCategoryName: state.activeCategoryName,
  activeGroupName: state.activeGroupName,
  activeItem: state.activeItem,
  itemVariantsOverlay: state.itemVariantsOverlay,
  itemCategoryIndex: state.itemCategoryIndex,
  itemGroupIndex: state.itemGroupIndex,
});

const mapDispatchToProps = (dispatch) => ({
  /**
   * Dispatches calls to initiate action creators
   */
  onInitialize: () => dispatch(actionCreators.initialize()),
  onStoreOpen: () => dispatch(actionCreators.storeOpen()),
  onStoreClose: () => dispatch(actionCreators.storeClose()),
  onItemVariantsClose: () => dispatch(actionCreators.itemVariantsClose()),
  onItemVariantsCloseMain: () =>
    dispatch(actionCreators.itemVariantsCloseMain()),
  onItemsClose: () => dispatch(actionCreators.itemsClose()),
  onGroupsClose: () => dispatch(actionCreators.groupsClose()),
  onCategoriesClose: () => dispatch(actionCreators.categoriesClose()),
  onItemVariantsOpen: (response) =>
    dispatch(actionCreators.itemVariantsOpen(response)),
  onGroupsOpen: (response) => dispatch(actionCreators.groupsOpen(response)),
  onItemsOpen: (response) => dispatch(actionCreators.itemsOpen(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
