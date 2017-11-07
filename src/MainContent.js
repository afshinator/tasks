import React from "react";
import TopControls from "./TopControls";
import TasksList from "./TasksList";

// Main content of the app which sits right below the <Header> and extends down the page.
//    - contains the <TopControls> which are the Add-Task and Save buttons,
//      and the tasks list

const MainContent = ( props ) => (
  <main style={{ marginTop: "70px" }}>
    <div className="mw6 mw8-ns center pa3 ph5-ns">
      <TopControls { ...props }/>
      <TasksList tasks={ props.tasks } trashClickHandler={ props.trashClickHandler } taskEditHandler={props.taskEditHandler}/>
    </div>
  </main>
);

export default MainContent;
