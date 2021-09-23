import React, { Component } from "react";
import Input from "./common/Input";
import Select from "./common/Select";
import Button from "./common/Button";

class CustomerForm extends Component {
  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.onSubmit}>
          <Input />
          <Select />
          <Input />
          <Select />

          <Button label="Send" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default CustomerForm;
