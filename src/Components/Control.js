import React, { Component } from "react";
import Sort from "./Sort";
import Search from "./Search";

class Control extends Component {
  render() {
    return (
      <div className="row mt-10">
          <Search onSearch ={this.props.onSearch}  />
          <Sort 
            onSoft = {this.props.onSoft}
            softBy = {this.props.softBy}
            softValue = {this.props.softValue}
          />
      </div>
    );
  }
}

export default Control;
