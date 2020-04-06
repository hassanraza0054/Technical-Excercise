import { fromJS } from "immutable";
import {
  HOME,
  CATEGORIES,
  GROUPS,
  ITEMS,
  ITEM_VARIANTS,
} from "../../utilities/windowVars";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isDataOnline: false,
  isDataOffline: false,
  productList: {},
  isShopOpen: false,
  currentWindow: HOME,
  activeCategoryName: "",
  activeGroupName: "",
  activeItem: {},
  itemVariantsOverlay: false,
  itemCategoryIndex: undefined,
  itemGroupIndex: undefined,
  hasError: false,
  errorMessage: "",
};

export const updateObject = (oldObject, updatedValues) => ({
  ...oldObject,
  ...updatedValues,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE:
      return updateObject(state, {
        productList: fromJS(action.productList).toJS(),
        isDataOnline: true,
      });
    case actionTypes.INITIALIZE_OFFLINE:
      return updateObject(state, {
        productList: fromJS(action.productList).toJS(),
        isDataOffline: true,
      });
    case actionTypes.STORE_OPEN:
      return updateObject(state, {
        isShopOpen: true,
        currentWindow: CATEGORIES,
      });
    case actionTypes.STORE_CLOSE:
      return updateObject(state, {
        isShopOpen: false,
        currentWindow: HOME,
        activeCategoryName: "",
        activeGroupName: "",
        activeItem: {},
        itemVariantsOverlay: false,
        itemCategoryIndex: undefined,
        itemGroupIndex: undefined,
      });
    case actionTypes.ITEM_VARIANTS_CLOSE:
      return updateObject(state, {
        activeItem: {},
        itemVariantsOverlay: false,
        currentWindow: ITEMS,
      });
    case actionTypes.ITEM_VARIANTS_CLOSE_MAIN:
      return updateObject(state, {
        activeItem: {},
        itemVariantsOverlay: false,
        currentWindow: ITEMS,
      });
    case actionTypes.ITEMS_CLOSE:
      return updateObject(state, {
        activeGroupName: "",
        itemGroupIndex: undefined,
        currentWindow: GROUPS,
      });
    case actionTypes.GROUPS_CLOSE:
      return updateObject(state, {
        activeCategoryName: "",
        itemCategoryIndex: undefined,
        currentWindow: CATEGORIES,
      });
    case actionTypes.CATEGORIES_CLOSE:
      return updateObject(state, {
        isShopOpen: false,
        currentWindow: HOME,
      });
    case actionTypes.ITEM_VARIANTS_OPEN:
      return updateObject(state, {
        activeItem: fromJS(action.activeItem).toJS(),
        itemVariantsOverlay: true,
        currentWindow: ITEM_VARIANTS,
      });
    case actionTypes.GROUPS_OPEN:
      return updateObject(state, {
        itemCategoryIndex: action.itemCategoryIndex,
        activeCategoryName: action.activeCategoryName,
        activeGroupName: "",
        itemGroupIndex: undefined,
        currentWindow: GROUPS,
      });
    case actionTypes.ITEMS_OPEN:
      return updateObject(state, {
        itemGroupIndex: action.itemGroupIndex,
        activeGroupName: action.activeGroupName,
        currentWindow: ITEMS,
      });
    case actionTypes.ERROR_OCCURED:
      return updateObject(state, { hasError: true, errorMessage: action.val });

    default:
      return state;
  }
};

export default reducer;
