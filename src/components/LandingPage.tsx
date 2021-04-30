import React, { Component } from "react";
import ProjectTable from "./Project/ProjectTable";
import Navbar from "./Navbar";

class LandingPage extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <ProjectTable />
      </div>
    );
  }
}

export default LandingPage;
