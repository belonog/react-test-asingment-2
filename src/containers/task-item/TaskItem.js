import './TaskItem.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import md5 from 'md5';

import tasksApi from 'api/tasks';
import { fetchTasks } from 'actions/tasks';


function mapStateToProps({tasksState: {items}, loggedCustomerState: {customer}}) {
    return {
        tasks: items,
        customer,
    };
}

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            error: null,
        };
        this.form = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { match: { params: { mode, id } }, tasks} = nextProps;
        const {mode: prevMode} = prevState;

        if (mode === prevMode) {
            return prevState;
        }

        const task = /view|edit/.test(mode) && +id && tasks && tasks.find(itm => itm.id === +id) || {username: '', email: '', text: '', image: ''};

        return {
            task: {
                ...task,
                image: ''
            },
            mode,
            preview: false,
        };
    }


    updateState = (e) => {
        const input = e.target;
        let value;
        if (input.type == 'checkbox') {
            value = input.checked;
        } else if (input.type == 'file') {
            value = { files: input.files, value: input.value };
        } else {
            value = input.value;
        }


        this.setState(prevState => ({
            task: {
                ...prevState.task,
                [input.name]: value
            }
        }));
    }

    update = async () => {
        const formData = new FormData();
        const token = 'beejee';
        let {text, status, id} = this.state.task;
        status = status ? 10 : 0;
        const data = { token, text, status};
        const dataList = Object.entries(data)
            .sort((a, b)=> a[0] > b[0]);
        dataList.forEach(itm => formData.append(itm[0], itm[1]));

        const signature = dataList
            .map(itm => encodeURIComponent(itm[0]) + '=' + encodeURIComponent(itm[1]))
            .join('&');

        formData.append('signature', md5(signature))

        const result = await tasksApi.update(formData, id);
        this.handleResponse(result);
    }

    create = async (form) => {
        const result = await tasksApi.create(form);
        this.handleResponse(result);
    }

    handleResponse = (response) => {
        if (response.status == 'ok') {
            this.props.dispatch(fetchTasks());
            this.props.history.push('/');
        } else {
            this.setState({
                error: Object.entries(response.message).map(itm => `${itm[0]} - ${itm[1]}`)
            });
        }

    }

    submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {mode} = this.state;
        if (mode == 'create') {
            this.create(formData);
        } else {
            this.update(formData);
        }
    }

    previewToggle = () => {
        const {preview} = this.state;

        if (preview) {
            this.form = this.formData;
        } else {
            this.formData = this.form;
        }

        this.setState(prevState => ({ preview: !prevState.preview }));
    }

    render() {

        const { history, customer } = this.props;
        const { task, mode, preview, error} = this.state;

        if (mode == 'edit' && (!customer || customer.role != 'admin')) {
            return <div className="alert alert-danger" role="alert">
                Permission denied!
                Please login as admin.
            </div>;
        }

        return (
            <div className="task-item">
                <h1>Task</h1>
                {/create|edit/.test(mode) && (
                    <div className="task-item__content">
                        <form className={preview ? ' d-none' : ''} name="task" onSubmit={this.submit}>
                            {mode == 'create' && <div className="form-group">
                                <label htmlFor="task-username">User name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="task-username"
                                    name="username"
                                    placeholder="User name"
                                    value={task.username}
                                    onChange={this.updateState}/>
                            </div>}
                            {mode == 'create' && <div className="form-group">
                                <label htmlFor="task-username">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="task-email"
                                    name="email"
                                    placeholder="Email"
                                    value={task.email}
                                    onChange={this.updateState}/>
                            </div>}
                            <div className="form-group">
                                <label htmlFor="task-text">Text</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="task-text"
                                    name="text"
                                    placeholder="Text"
                                    value={task.text}
                                    onChange={this.updateState}/>
                            </div>
                            {mode == 'create' && <div className="form-group">
                                <label htmlFor="task-image">Image</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="task-image"
                                    name="image"
                                    accept=".jpg, .jpeg, .png"
                                    files={task.image && task.image.files}
                                    value={task.image && task.image.value}
                                    onChange={this.updateState}/>
                            </div>}
                            {mode == 'edit' && <div className="form-group">
                                <label htmlFor="task-status">Status</label>
                                <input
                                    type="checkbox"
                                    className="form-control-file"
                                    id="task-status"
                                    name="status"
                                    checked={task.status}
                                    onChange={this.updateState} />
                            </div>}
                            <div className="form-group">
                                 <button
                                    className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {(mode == 'view' || preview) && <div className="task-item__content">
                        <p><span className="task-item__title">id:</span> {task.id}</p>
                        {mode != 'create' && <p><span className="task-item__title">status: </span>
                        <input type="checkbox" disabled checked={task.status}/></p>}
                        <p><span className="task-item__title">username:</span> {task.username}</p>
                        <p><span className="task-item__title">email:</span> {task.email}</p>
                        <p><span className="task-item__title">text:</span> {task.text}</p>
                        <p><span className="task-item__title">image</span></p>
                    <img className="task-item__img" src={task.image_path || task.image && URL.createObjectURL(task.image.files[0])} alt=""/>
                    </div>
                }
                {error && <div className="alert alert-danger" role="alert">
                    <ul>
                        {error.map(itm => <li key={itm}>{itm}</li>)}
                    </ul>
                </div>}
                <p>
                </p>
                <nav>
                    <a className="btn btn-light" href="#" onClick={() => {history.goBack()}}>Back</a>
                    {mode == 'view' && customer && customer.role === 'admin' && <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => history.push('/task/edit/' + task.id)}>
                            Edit
                        </button>
                    } {/edit|create/.test(mode) && <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => this.setState(prevState => ({preview: !prevState.preview}))}>
                        {preview ? 'Back to edit' : 'Preview'}
                    </button>}
                </nav>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(TaskItem);