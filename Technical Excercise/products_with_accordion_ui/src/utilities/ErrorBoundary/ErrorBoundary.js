import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/layout";

/**
 * ErrorBoundary Component, used for graceful error management
 */
class ErrorBoundary extends Component {
  componentDidCatch = (errorMessage, info) => {
    this.props.onError(errorMessage);
  };

  render() {
    if (this.props.err) {
      return <h1 style={{ color: "black" }}>{"Page could not load..."}</h1>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  /** Boolean for Error Status */
  err: PropTypes.bool,
  /** Error Message on Render */
  errMsg: PropTypes.any,
};

const mapStateToProps = (state) => ({
  err: state.hasError,
  errMsg: state.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  /**
   * Dispatches calls to initiate error action creators
   */
  onError: (errorMessage) =>
    dispatch(actionCreators.errorOccured(errorMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
