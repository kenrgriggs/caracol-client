// This page initially copied directly from https://material-ui.com/components/tables/

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridEditCellPropsParams,
  GridRowId,
} from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import ProjectModal from "./ProjectModal";

// NO PROPS ARE PASSED
export interface ProjectProps {

}

// CREATE INTERFACE FOR STATE ATTRIBUTES
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
  selectedItems: Array<GridRowId>;
  token: any;
}

// DEFINE COLUMN HEADERS
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

// PROJECT CLASS COMPONENT IS WHERE ALL THE CRUD HEAVY LIFTING IS DONE
class Project extends React.Component<ProjectProps, ProjectState> {
  
  constructor(props: ProjectProps) {
    super(props);

    //SETTING THE STATE
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
      selectedItems: [],
      token: localStorage.getItem("token")

    };
  }

  // CREATE PROJECTS
  CreateProjects = (e: any, newRecord: any) => {
    console.log(newRecord);
    fetch(`http://localhost:3000/project/`, {
      method: "POST",
      body: JSON.stringify({
        project: {
          name: newRecord.name,
          category: newRecord.category,
          planned: newRecord.planned,
          est_startdate: newRecord.est_startdate,
          startdate: newRecord.startdate,
          est_enddate: newRecord.est_enddate,
          enddate: newRecord.enddate,
          description: newRecord.description,
          notes: newRecord.notes,
          hours: newRecord.hours,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.state.token
      }),
    })
      .then((response) => response.json())
      .then((createdProject) => {
        console.log(createdProject)
        this.setState((prevState) => { 
          
          prevState.projects.push(createdProject)
          return {projects: prevState.projects}
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  // READ PROJECTS
  ReadProjects = () => {
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

  // UPDATE PROJECTS
  UpdateProjects = (changedValue: GridEditCellPropsParams) => {
    fetch(`http://localhost:3000/project/${changedValue.id}`, {
      method: "PUT",
      body: JSON.stringify({
        field: changedValue.field,
        value: changedValue.props.value,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((updatedProject) => {
        this.setState((prevState) => ({
          projects: prevState.projects.map((currentProject: { id: number }) =>
            currentProject.id === updatedProject.id
              ? updatedProject
              : currentProject
          ),
        }));
      })
      .catch((error) => console.error("Error:", error));
  };

  // DELETE PROJECTS
  DeleteProjects = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event);
    this.state.selectedItems.forEach((item) => {
      fetch(`http://localhost:3000/project/${item}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((_) => {
          this.setState((prevState) => ({
            projects: prevState.projects.filter(
              (currentProject: { id: number }) => currentProject.id !== item
            ),
          }));
        })
        .catch((error) => console.error("Error:", error));
    });
    this.forceUpdate();
  };

  // CALLS 'ReadProjects' FUNCTION AND FORCES EACH PROJECT TO APPEAR
  async componentDidMount() {
    this.ReadProjects();
  }

  // OBJECT TO CONTAIN ALL THE SHIT I WANNA RENDER
  DataTable = (rows: Array<Object>) => {
    return (
      <div style={{ width: "100%" }}>
        {/* TOOLBAR ABOVE PROJECT TABLE  */}
        <Paper>
          {/* CREATE NEW PROJECT */}
          <ProjectModal submitOnClick={this.CreateProjects} />

          {/* COPY PROJECT  */}
          <IconButton edge="end" style={{ color: "#2196f3" }}>
            <FileCopyIcon />
          </IconButton>

          {/* DELETE PROJECT  */}
          <IconButton
            edge="end"
            style={{ color: "#2196f3" }}
            onClick={this.DeleteProjects}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>

        {/* DATAGRID DEFINES HOW PROJECT DATA WILL BE DISPLAYED  */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={12}
          checkboxSelection
          autoHeight={true}
          onEditCellChangeCommitted={this.UpdateProjects}
          onSelectionModelChange={(GridSelectionModelChangeParams) => {
            console.log(GridSelectionModelChangeParams);
            this.setState({
              selectedItems: GridSelectionModelChangeParams.selectionModel,
            });
          }}
        />
      </div>
    );
  };

  // DISPLAYS 'DateTable' OBJECT
  render() {
    return <div>{this.DataTable(this.state.projects)}</div>;
  }
}

export default Project;
