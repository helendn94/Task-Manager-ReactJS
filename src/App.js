import React from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm";
import Control from "./Components/Control";
import TaskList from "./Components/TaskList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      softBy: 'name',
      softValue: 1
    }
    //this.onGenerateData = this.onGenerateData.bind(this);
    this.addForm = this.addForm.bind(this);
  }
  UNSAFE_componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
  }
  addForm() {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      })
    }
  }
  onToggeForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }
  isShowFormUpdate = () => {
    this.setState({
      isDisplayForm: true
    })
  }
  onSubmit = (data) => {
    console.log(data);
    var { tasks } = this.state; // tasks: this.state.tasks
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      //Editing
      const index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var newTasks = tasks.map(task => {
      if (task.id === id) {
        task.status = !task.status;
      }
      return task
    })
    this.setState({ tasks: newTasks })
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  onDeleteItem = (id) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.id !== id);
    console.log(newTasks);
    this.setState({
      tasks: newTasks,
    })
    this.onToggeForm();
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  onEditItem = (id) => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    const taskEditing = tasks[index];
    console.log("taskediting", taskEditing);
    this.setState({
      taskEditing: taskEditing
    })
    this.isShowFormUpdate();
  }
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result
  }
  onFilter = (filterName, filterStatus) => {
    console.log(filterName + " - " + +filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: +filterStatus
      }
    })
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  onSoft = (softBy, softValue) => {
    this.setState({
      softBy: softBy,
      softValue: softValue
    })
    console.log(this.state.softValue, this.state.softBy);
  }


  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, softBy, softValue } = this.state;
    //check filter status
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }
    if(softBy === "name"){
      tasks.sort((a, b) => {
        if(a.name > b.name) return softValue;
        else if(a.name < b.name) return -softValue;
        else return 0
      })
    }else{
      tasks.sort((a, b) => {
        if(a.status > b.status) return -softValue;
        else if(a.status < b.status) return softValue;
        else return 0
      })
    }

    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }
    var elmTaskForm = isDisplayForm
      ? <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onToggeForm}
        onChangeForm={this.onChangeForm}
        task={taskEditing}
      />
      : '';
    var checkColForm = isDisplayForm
      ? "col-xs-8 col-sm-8 col-md-8 col-lg-8 text-left"
      : "col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left"
    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <hr />
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {elmTaskForm}
            </div>

            <div className={checkColForm}>
              <button type="button" className="btn btn-lg btn-success" onClick={this.addForm}>
                + Thêm công việc
              </button>
              <Control
                onSearch={this.onSearch}
                softBy = {softBy}
                softValue = {softValue}
                onSoft = {this.onSoft}
              />
              <TaskList tasks={tasks}
                onUpdateStatus={this.onUpdateStatus}
                onDeleteItem={this.onDeleteItem}
                onEditItem={this.onEditItem}
                onFilter={this.onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
