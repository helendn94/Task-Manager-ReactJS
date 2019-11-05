import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id);
    }
    onEditItem = () => {
        this.props.onEditItem(this.props.task.id);
    }
    render() {
        var task = this.props;
        var checkStatus = task.status ? "Kích hoạt" : "Ẩn";
        var checkColorStatus = task.status ? "label label-success" : "label label-danger";
        return (
            <tr>
                <td>{task.index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={checkColorStatus} onClick={this.onUpdateStatus}>{checkStatus}</span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onEditItem}>Sửa</button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick = {this.onDeleteItem}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;