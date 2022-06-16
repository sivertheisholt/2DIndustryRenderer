import { useApp } from "@inlet/react-pixi";
import React, { Component } from "react";
import EntityTable from "./components/EntityTable";
import OverviewMap from "./components/OverviewMap";

export default class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <div>
        <OverviewMap />
        <EntityTable />
      </div>
    );
  }
}
