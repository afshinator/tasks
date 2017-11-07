import React, { Component } from "react";
import * as constants from "./constants";

// The alert is the popup indicator that shows the latest status
//  - the alert will go away if user clicks on it
//  - the alert will indicate whether we're in the middle of getting or setting the tasks
//  - the alert will let user know if getting/setting the tasks was success or error encountered.
//  - If hidden, alert box will show itself as it gets a new status event

// Here is the main status for where on the screen the alert shows up and how big it is.
const MAIN_STYLES = {
  position: "fixed",
  bottom: "40px",
  right: "20px",
  minWidth: "50%"
};

const DEFAULT = "black";

class Alert extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.getColor = this.getColor.bind(this);
    this.getMsg = this.getMsg.bind(this);
    this.dismiss = this.dismiss.bind(this);

    this.state = { show: true };
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;

    // If this value changes, hide the alert box until next alert event
    if ( nextProps.dismissAlertToggle !== props.dismissAlertToggle ) {
      this.dismiss();
    }
    else if (
      nextProps.errorLoadingTasks !== props.errorLoadingTasks
      || nextProps.isLoading !== props.isLoading
      || nextProps.hasLoadedTasks !== props.hasLoadedTasks
      || nextProps.errorSavingTasks !== props.errorSavingTasks
      || nextProps.isSaving !== props.isSaving
      || nextProps.hasSavedTasks !== props.hasSavedTasks
    ) {
        // When one of the boolean flags changes, show alert
        this.setState({ show: true });
      }
  }

  // Handle user click on the alert --> hide.
  handleClick(e) { this.dismiss(); }

  dismiss() { this.setState({ show: false }) }

  getColor() {
    const props = this.props;
    if ( props.errorLoadingTasks || props.errorSavingTasks ) {
      return { color: constants.ERROR_RED, background: constants.RED_BKGD };
    } else if (props.isLoading || props.isSaving ) {
      return { color: constants.WARN, background: constants.ORANGE_BKGD  };
    } else if (props.hasLoadedTasks || props.hasSavedTasks ) {
      return { color: constants.GREEN, background: constants.GREEN_BKGD };
    } else return { color: DEFAULT };
  }

  getMsg() {
    const props = this.props;

    if ( props.errorLoadingTasks ) {
      return constants.MSG_ERROR_LOADING_TASKS;
    } else if ( props.errorSavingTasks ) {
      return constants.MSG_ERROR_SAVING_TASKS;
    } else if ( props.isLoading ) {
      return constants.MSG_LOADING_TASKS;
    } else if ( props.isSaving ) {
      return constants.MSG_SAVING_TASKS;
    }
    else if ( props.hasLoadedTasks ) {
      return constants.MSG_HAS_LOADED_TASKS;
    } else if ( props.hasSavedTasks ) {
      return constants.MSG_HAS_SAVED_TASKS;
    }
    else return "";
  }

  render() {
    if ( ! this.state.show ) return null;

    const color = this.getColor();
    const msg = this.getMsg();

    return (
      <aside className="ba b--solid br2 ph3 pv2 link dim"
        style={{ ...MAIN_STYLES, ...color }}
        onClick={this.handleClick}
      >
        {msg}
        <span className="fa fa-close fr"/>
      </aside>
    );
  }
}

export default Alert;
