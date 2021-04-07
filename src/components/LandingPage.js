import React, { Component } from 'react';
import AssetTable from './Asset/AssetTable'
import ProjectTable from './Project/ProjectTable'
import UserTable from './User/UserTable'
import Navbar from './Navbar'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
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