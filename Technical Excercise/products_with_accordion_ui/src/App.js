import React from "react";
import Layout from "./containers/Layout";
import ErrorBoundary from "./utilities/ErrorBoundary/ErrorBoundary";

import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    </div>
  );
}

export default App;
