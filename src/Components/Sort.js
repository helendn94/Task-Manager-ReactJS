import React, { Component } from "react";

class Sort extends Component {
  onClick = (softBy, softValue) => {
    this.props.onSoft(softBy, softValue);
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sắp xếp
          </button>

          <ul className="dropdown-menu">
            <li onClick={() => this.onClick('name', 1)}>
              <a
                role="button"
                className = {(this.props.softBy === "name" && this.props.softValue === 1) ? "soft_selected" : ''}
              >
                <span>Tên A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onClick('name', -1)}>
              <a 
                role="button"
                className = {(this.props.softBy === "name" && this.props.softValue === -1) ? "soft_selected" : ''}
              >
                <span>Tên Z-A</span>
              </a>
            </li>
            <hr />
            <li onClick={() => this.onClick('status', 1)}>
              <a 
                role="button"
                className = {(this.props.softBy === "status" && this.props.softValue === 1) ? "soft_selected" : ''}
              >
                <span>Trạng thái kích hoạt</span>
              </a>
            </li>
            <li onClick={() => this.onClick('status', -1)}>
              <a 
                role="button" 
                className = {(this.props.softBy === "status" && this.props.softValue === -1) ? "soft_selected" : ''}
              >
                <span>Trạng thái ẩn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
