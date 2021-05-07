// THIS LANDING PAGE JUST PULLS IN THE NAVBAR AND PROJECT TABLE. NOT MUCH INTERESTING HAPPENS HERE, ALL THE HEAVY LIFTING FOR CRUD OPERATIONS IS DONE IN THE PROJECT TABLE.

import React, { Component } from "react";
import ProjectTable from "./Project/ProjectTable";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
// import ChangeEvent from "react"

export interface LandingPageState {
  searchText: string;
}

export interface LandingPageProps {
  isAdmin: boolean;
};

class LandingPage extends Component<LandingPageProps, LandingPageState> {
  constructor(props: LandingPageProps) {
    super(props);
    this.state = {
      searchText: ""
    };
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(value: string) {
      console.log(value)
      this.setState({searchText: value})
  }

  render() {
    return (
      <div>
         {this.props.isAdmin ? (
           <NavbarAdmin  />
           ) : (
             <Navbar handleSearch={this.handleSearch}/>
             )}
        <ProjectTable searchText={this.state.searchText} key={this.state.searchText}/>
      </div>
    );
  }
}

export default LandingPage;
