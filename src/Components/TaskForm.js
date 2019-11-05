import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: false,
            id: ''
        }
    }
    UNSAFE_componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        }else if(!nextProps.task){  //nextProps && nextProps.task === null
            this.setState({
                name: '',
                status: false,
                id: ''
            })
        }
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    handleAddForm = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false,
        })
    }
    render() {
        var { id } = this.state;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">{id === '' ? "Thêm Công việc" : "Update Công việc"}
                        <span className="fright cs-point" onClick={this.onCloseForm}>X</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="text-left">Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={this.handleAddForm}
                                value={this.state.name}
                            />
                            <label className="text-left">Trạng Thái :</label>
                            <select
                                name="status"
                                id="input"
                                className="form-control"
                                onChange={this.handleAddForm}
                                value={this.state.status}
                            >
                                <option value={true}>Kích hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">
                            Submit
                </button>
                        &nbsp;
                <button type="button" className="btn btn-warning" onClick={this.onClear}>
                            Hủy
                </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;