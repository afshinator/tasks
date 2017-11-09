import React, { Component } from "react";
import Task from "./Task";

class TasksList extends Component {
  render() {
    const { tasks, trashClickHandler, taskEditHandler } = this.props;
    if (!tasks) return null;

    return tasks.map((task, i) => {
      return (
        <Task
          key={i}
          index={i}
          content={tasks[i]}
          trashClickHandler={trashClickHandler.bind(this, i)}
          taskEditHandler={taskEditHandler}
        />
      );
    });
  }
}

export default TasksList;
