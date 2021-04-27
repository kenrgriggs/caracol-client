//  This page copied directly from https://material-ui.com/components/tables/

import * as React from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export interface ProjectProps {}

export interface ProjectState {
  projects: any;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 67,
  },
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 150,
    editable: true,
  },
  {
    field: "planned",
    headerName: "Planned",
    type: "boolean",
    width: 150,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    type: "string",
    width: 150,
    editable: true,
  },
  {
    field: "est_startdate",
    headerName: "Estimated Start Date",
    type: "date",
    width: 200,
    editable: true,
  },
  {
    field: "startdate",
    headerName: "Start Date",
    type: "date",
    width: 150,
    editable: true,
  },
  {
    field: "est_enddate",
    headerName: "Estimated Finish Date",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "enddate",
    headerName: "Finish Date",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "notes",
    headerName: "Notes",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "hours",
    headerName: "Hours Spent",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "created_by",
    headerName: "Created By",
    type: "string",
    width: 150,
  },
];

class Project extends React.Component<ProjectProps, ProjectState> {
  constructor(props: ProjectProps) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  getProjects = () => {
    fetch(`http://localhost:3000/project/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((projects) => {
        this.setState({ projects: projects });
        // console.log(this.state.projects);
      })
      .catch((error) => console.error("Error:", error));
  };

  async componentDidMount() {
    this.getProjects();
  }

  DataTable = (rows: Array<Object>) => {
    return (
      <div style={{ height: 850, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={14}
          checkboxSelection
        />
      </div>
    );
  };

  render() {
    return <div>{this.DataTable(this.state.projects)}</div>;
  }
}

export default Project;
