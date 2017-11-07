import React, { Component } from "react";
import Task from "./Task";

class TasksList extends Component {
  render() {
    const props = this.props;
    if (!props.tasks) return null;

    return props.tasks.map((task, i) => {
      return (
        <Task
          key={i}
          index={i}
          content={props.tasks[i]}
          trashClickHandler={props.trashClickHandler.bind(this, i)}
          taskEditHandler={props.taskEditHandler}
        />
      );
    });
  }
}

export default TasksList;
