import axios from "axios";
import data from "../../data";
import * as actionTypes from "./actionTypes";

export const initialize = () => (dispatch) => {
  return axios
    .get("https://www.aesop.com/au/api/v1/nav/shop")
    .then((response) => {
      dispatch(saveProducts(response));
    })
    .catch((err) => {
      // Load from offline JSON
      dispatch(useProductsFromOffline(data));
    });
};

export const saveProducts = (response) => {
  return {
    type: actionTypes.INITIALIZE,
    productList: response,
    isDataOnline: true,
  };
};

export const useProductsFromOffline = (response) => {
  return {
    type: actionTypes.INITIALIZE_OFFLINE,
    productList: response,
    isDataOffline: true,
  };
};

export const storeOpen = () => {
  return {
    type: actionTypes.STORE_OPEN,
  };
};

export const storeClose = () => {
  return {
    type: actionTypes.STORE_CLOSE,
  };
};

export const itemVariantsClose = () => {
  return {
    type: actionTypes.ITEM_VARIANTS_CLOSE,
  };
};

export const itemVariantsCloseMain = () => {
  return {
    type: actionTypes.ITEM_VARIANTS_CLOSE_MAIN,
  };
};

export const itemsClose = () => ({
  type: actionTypes.ITEMS_CLOSE,
});

export const groupsClose = () => ({
  type: actionTypes.GROUPS_CLOSE,
});

export const categoriesClose = () => ({
  type: actionTypes.CATEGORIES_CLOSE,
});

export const itemVariantsOpen = (response) => {
  return {
    type: actionTypes.ITEM_VARIANTS_OPEN,
    activeItem: response,
  };
};

export const groupsOpen = (response) => {
  return {
    type: actionTypes.GROUPS_OPEN,
    itemCategoryIndex: response.itemCategoryIndex,
    activeCategoryName: response.activeCategoryName,
  };
};

export const itemsOpen = (response) => ({
  type: actionTypes.ITEMS_OPEN,
  itemGroupIndex: response.itemGroupIndex,
  activeGroupName: response.activeGroupName,
});

export const errorOccured = (errorMessage) => ({
  type: actionTypes.ERROR_OCCURED,
  val: errorMessage,
});
