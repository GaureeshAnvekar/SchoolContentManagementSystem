import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = props => {
  if (props.alerts !== null && props.alerts.length == 1) {
    return (
      <div
        key={props.alerts[0].id}
        className={`alert alert-${props.alerts[0].alertType}`}
      >
        {props.alerts[0].msg}
      </div>
    );
  }
  return null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, null)(Alert);
