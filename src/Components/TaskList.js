import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1, //all: -1, active: 1, deactive: 0
    }
  }
  onChange = (event) => {
    const target = event.target;
    const name =  target.name;
    const value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    })
  }
  render() {
    var { tasks } = this.props;
    var { filterName, filterStatus } = this.state;

    var elmTasks = tasks.map((task, index) => {
      return <TaskItem
        task={task}
        name={task.name}
        status={task.status}
        index={index}
        key={task.id}
        onUpdateStatus={this.props.onUpdateStatus}
        onDeleteItem={this.props.onDeleteItem}
        onEditItem={this.props.onEditItem}
      />
    })

    return (
      <div className="row mt-10">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input type="text"
                    className="form-control"
                    id="exampleInputAmount"
                    name="filterName"
                    value={filterName}
                    onChange={this.onChange}
                  />
                </td>
                <td>
                  <select
                    type="text"
                    className="form-control"
                    name = "filterStatus"
                    value={filterStatus}
                    onChange = {this.onChange}
                  >
                    <option value={-1}>Tất cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích hoạt</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {elmTasks}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default TaskList;