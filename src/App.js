import React, { Component } from "react";

import * as constants from "./constants";
import * as api from "./api";
import Alert from "./Alert";
import Header from "./Header";
import MainContent from "./MainContent";


const inlineStyles = {
  fontFamily: constants.APP_FONT,
  // background: constants.APP_BKGD_COLOR,      // doesnt work since app only extends vertically if filled with tasks, solution in componentDidMount()
};


class App extends Component {
  state = {
    tasks: null,            // Holds loaded and/or modified tasks list, an array

    isLoading: false,       // True while loading persisted tasks
    hasLoadedTasks: false,  // True after successfully loading pesisted tasks
    errorLoadingTasks: false, // True if an error occurred loading tasks
    isSaving: false,        // True while saving list of tasks
    hasSavedTasks: false,   // True after successfully saving tasks
    errorSavingTasks: false,// True if an error occured saving tasks

    dismissAlertToggle: true,     // flip its value to send a message to alert box to hide itself until one of the above booleans changes
    tasksDirty: false       // True when task list doesnt match persisted tasks
  };

  componentDidMount() {
    // Setting the color of the body tag here like this because its the simplest,
    // most effective way to get the color to cover the backgroud of the app
    document.body.style.background = constants.APP_BKGD_COLOR;

    api.fetchData(constants.URL, this);
  }

  // Add a new task to the task lint-staged
  addClickHandler = () => {
    /* For testing:
    const r = Math.random(), r2 = ~~(r*1000)+'', t = `${r2}`, t2 = (r>0.4) ? ' afasfa' : ' ', t3 = t + t2;
    const newArray = [t3].concat( this.state.tasks );
    */
    const newArray = [''].concat( this.state.tasks );  // Create new array with empty first element

    this.setState({ tasks: newArray, tasksDirty: true });
  }


  // Save the list of tasks by making api call
  saveClickHandler = () => {
    this.setState({
      tasksDirty: false,      // So the Save button is disabled
    }, () => {
      api.setTasks( constants.URL, this.state.tasks, this );
    });
  }

  // Delete the task that was clicked on
  trashClickHandler = (i) => {
    const newTasklist = this.state.tasks.slice(); // copy array
    newTasklist.splice(i, 1); // remove item at index i
    this.setState({ tasks: newTasklist, tasksDirty: true });
  }

  // Edit the task clicked on
  taskEditHandler = (i, newVal) => {
    if ( this.state.tasks[i] !== newVal ) {
      const newArray = [].concat( this.state.tasks );
      newArray[i] = newVal;
      this.setState({ tasks: newArray, tasksDirty: true });
    }
  }

  render() {
    return (
      <div style={ inlineStyles }>
        <Header />
        <MainContent
          tasks={this.state.tasks}
          tasksDirty={this.state.tasksDirty}
          addClickHandler={this.addClickHandler}
          saveClickHandler={this.saveClickHandler}
          trashClickHandler={this.trashClickHandler}
          taskEditHandler={this.taskEditHandler}
        />
        <Alert {...this.state} />
      </div>
    );
  }
}


export default App;
