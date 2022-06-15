import { useApp } from "@inlet/react-pixi";
import React, { Component } from "react";
import { Route } from "react-router";
import Map from "./components/Map";

export default class App extends Component {
  static displayName = App.name;
  render() {
    return <Map></Map>;
  }
}
