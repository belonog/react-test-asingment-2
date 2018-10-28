import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TaskItem.css';

function mapStateToProps({tasksState}, {task, match:{params: {id}}}) {
    return {
        task: task || tasksState.items && tasksState.items[id]
    };
}

class TaskItem extends Component {
    componentWillMount() {
        if (!this.props.task) {
            this.props.history.replace('/');
        }
    }

    render() {
        const {task, history} = this.props;

        if (!task) {
            return null;
        }

        return (
            <div className="task-item">
                <h1>Task</h1>
                <div className="task-item__content">
                    <p><span className="task-item__title">id:</span> {task.id}</p>
                    <p><span className="task-item__title">username:</span> {task.username}</p>
                    <p><span className="task-item__title">email:</span> {task.email}</p>
                    <p><span className="task-item__title">text:</span> {task.text}</p>
                    <p><span className="task-item__title">image</span></p>
                    <img src={task.image_path} alt=""/>
                </div>
                <nav><a href="#" onClick={() =>history.goBack()}>Back</a></nav>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(TaskItem);