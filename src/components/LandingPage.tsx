// THIS LANDING PAGE JUST PULLS IN THE NAVBAR AND PROJECT TABLE. NOT MUCH INTERESTING HAPPENS HERE, ALL THE HEAVY LIFTING FOR CRUD OPERATIONS IS DONE IN THE PROJECT TABLE.

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
