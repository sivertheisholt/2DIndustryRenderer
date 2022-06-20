import React, { Component } from "react";
import MainApp from "./components/MainApp";

export default class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <div>
        <MainApp />
      </div>
    );
  }
}
