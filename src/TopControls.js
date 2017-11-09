import React, { Component } from "react";
import * as constants from "./constants";

// TopControls - The main controls  at the top of the page.
//    - Holds the 'Add Task' and 'Save' buttons, as well as the title 'Tasks'.
//    - The Save button will be enabled & disabled based on whether tasks have been added/modified


const BTN_STANDARD_CLASSES = "f6 br2 ph3 pv2 mb2 dib white"; // tachyon css classes for our buttons
const ADD_BTN_CLASSES = BTN_STANDARD_CLASSES + " link dim"; // tachyon classes for mouse-over and transition...

const btnInlineStyles = {
  userSelect: "none", // dont let user select button text when trying to click, its annoying
  cursor: "pointer"
};

class TopControls extends Component {
  state = { disable: false };

  saveClickHandler = (e) => {
    if (!this.props.tasksDirty) return; // Save button is disabled when no new/modified tasksDirty
    // else
    this.props.saveClickHandler();
  }

  addClickHandler = (e) => {
    if ( this.state.disable ) return;
    // else

    // Set it up so that there is a little delay between ability to
    // click the Add-Task button to prevent accidental clicks.
    this.setState({ disable: true });
    setTimeout( ()=> {
      this.setState({ disable: false });
    }, 400 );

    this.props.addClickHandler();
  }

  render() {
    const {
       tasksDirty,
     } = this.props;

    // Change style of save button based on props telling us its enabled or disabled
    const saveBtnClasses = tasksDirty ? BTN_STANDARD_CLASSES + " link dim" : BTN_STANDARD_CLASSES;
    const addBtnInline = { ...btnInlineStyles, background: constants.ADD_TASK_BTN_COLOR, marginRight: "10px" };
    const saveBtnColor = tasksDirty ? { background: constants.GREEN } : { background: constants.GREEN_DIS };
    const saveBtnInline = { ...btnInlineStyles, ...saveBtnColor };

    return (
      <section className="cf" >
        <div className="fl w-50">
          <h1 className="mt0 ml0">Tasks</h1>
        </div>
        <div className="fl w-50">
          <div className="fr">
            <a className={ADD_BTN_CLASSES} style={addBtnInline} onClick={this.addClickHandler}>
              Add Task
            </a>
            <a className={saveBtnClasses} style={saveBtnInline} onClick={this.saveClickHandler}>
              Save
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default TopControls;
