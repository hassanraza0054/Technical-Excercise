import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import layoutReducer from "./store/reducers/layout";

/** Root Reducer */
const rootReducer = layoutReducer;

/** Redux Implementation */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
