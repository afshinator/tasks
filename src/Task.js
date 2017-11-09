import React, { Component } from "react";
import * as constants from "./constants";

// A Task,
//  has an editable text area, and a trash icon to delete itself from list of tasks

const taskCardStyles = {
  background: "#fff",
  borderWidth: "1px",
  width: "100%",
  height: "200px",                      // Height of task card
  boxShadow: "0px 3px 3px #ddd",
  textTransform: "uppercase",
  color: constants.TASK_TEXT_COLOR
};

const taskEditAreaStyles = {
  fontFamily: constants.APP_FONT,
  resize: 'none',           // No unsightly handle to the textarea which even persisted when not in focus!
  height: '90%',            // Might need to tweak height & width here if taskCardStyles height above changes
  width: '95%',
};

const trashInlineStyles = {
  cursor: "pointer"
};

class Task extends Component {
  constructor() {
    super();
    this.state = {
      editText: ""          // will hold the task content, a string
    };
  }

  componentDidMount() {
    this.setState({ editText: this.props.content });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.state.editText) this.setState({ editText: nextProps.content });
  }


  handleChange = (e) => {
    const newVal = e.target.value;
    this.setState({ editText: newVal }, () => {
      this.props.taskEditHandler(this.props.index, newVal );
    });
  }


  render() {
    const props = this.props;

    return (
      <article className="b--solid b--black-10 br2 ph3 mv3" style={ taskCardStyles }>
        <span
          className="fr fa fa-trash link dim mv3"
          style={{ trashInlineStyles }}
          onClick={ props.trashClickHandler }
        />
        <textarea
          className="fl mv3 b--none br2"
          placeholder={ constants.INPUT_PLACEHOLDER }
          style={ taskEditAreaStyles }
          value={ this.state.editText }
          onChange={ this.handleChange }
          aria-describedby="task"
        />
      </article>
    );
  }
}

export default Task;
