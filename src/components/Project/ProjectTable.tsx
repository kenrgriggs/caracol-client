//  This page copied directly from https://material-ui.com/components/tables/

import * as React from "react";
import { DataGrid, GridColDef, GridEditCellPropsParams } from "@material-ui/data-grid";

export interface ProjectProps {

}

export interface ProjectState {
  projects: any;
  name: string;
  category: string;
  planned: boolean;
  est_startdate: string;
  startdate: string;
  est_enddate: string;
  enddate: string;
  description: string;
  notes: string;
  hours: number;
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
      name: "",
      category: "",
      planned: true,
      est_startdate: "",
      startdate: "",
      est_enddate: "",
      enddate: "",
      description: "",
      notes: "",
      hours: 0,
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
      })
      .catch((error) => console.error("Error:", error));
  };

  ProjectUpdate = (changedValue: GridEditCellPropsParams) => {
    fetch(`http://localhost:3000/project/${changedValue.id}`, {
      method: "PUT",
      body: JSON.stringify({
        "field": changedValue.field,
        "value": changedValue.props.value
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
    .then((response) => response.json())
    .then((updatedProject) => {
      this.setState(prevState => ({
        projects: prevState.projects.map(
          (currentProject: { id: number; }) => currentProject.id === updatedProject.id ? updatedProject : currentProject
        )
      }))
    })
    .catch((error) => console.error("Error:", error));
  };

  async componentDidMount() {
    this.getProjects();
  }

  DataTable = (rows: Array<Object>) => {
    return (
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={14}
          checkboxSelection
          autoHeight={true}
          // autoPageSize={true}
          onEditCellChangeCommitted={this.ProjectUpdate}
          onRowSelected={(GridRowSelectedParams) => {
          }}
        />
      </div>
    );
  };

  render() {
    return <div>{this.DataTable(this.state.projects)}</div>;
  }
}

export default Project;
