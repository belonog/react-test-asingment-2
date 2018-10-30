import './TaskList.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateIfNeeded, fetchTasks, sortTasks } from 'actions/tasks';
import Pagination from '../../components/Pagination';

function mapStateToProps({tasksState: {items: tasks, pagination, isFetching, sort}}) {
    return {
        tasks,
        pagination,
        isFetching,
        sort,
    };
}

class TaskList extends Component {
    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(updateIfNeeded());
    }

    loadPage = (page) => {
        const { dispatch } = this.props;

        dispatch(fetchTasks(page));
    }

    viewTask = (id) => {
        const {history} = this.props;
        history.push('/task/view/' + id);
    }

    sortTasks = (id) => {
        const { dispatch } = this.props;

        dispatch(sortTasks(id));
    }

    render() {
        const { tasks, pagination, isFetching, history } = this.props;

        return (
            <div className="task-list">
                {tasks
                    ? <>
                        <h1>Task list</h1>
                        <ul className="task-list__list">
                            <li className="task-list__title">
                                <div className="task-list__status">
                                    <a href="#" onClick={() => this.sortTasks('state')}>St</a>
                                </div>
                                <div className="task-list__name">
                                    <a href="#" onClick={() => this.sortTasks('username')}>User name</a>
                                </div>
                                <div className="task-list__email"><a href="#" onClick={() => this.sortTasks('email')}>Email</a></div>
                                <div className="task-list__text">Text</div>
                                <div className="task-list__id"><a href="#" onClick={() => this.sortTasks('id')}>ID</a></div>
                            </li>
                            {tasks.map((itm, idx) => <li key={itm.id} className="task-list__item" onClick={() => this.viewTask(itm.id)}>
                                <div className="task-list__status">
                                    <input type="checkbox" checked={itm.status} disabled/>
                                </div>
                                <div className="task-list__name">
                                    {itm.username}
                                </div>
                                <div className="task-list__email">{itm.email}</div>
                                <div className="task-list__text">{itm.text}</div>
                                <div className="task-list__id">{itm.id}</div>
                            </li>)}
                        </ul>
                        <Pagination pagination={pagination} loadPage={this.loadPage} />
                    </>
                    : <div>{!isFetching ? 'Task list is empty' : ''}</div>
                }
                {isFetching && <div>Loading...</div>}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(TaskList);
