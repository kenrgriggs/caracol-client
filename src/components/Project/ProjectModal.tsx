// Copied from https://material-ui.com/components/modal/, first example - 'Simple Modal'. 

import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Modal,
  IconButton,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

// STYLING FOR MODAL - CENTERS MODAL ON PAGE
function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  };
}

// SOMEHOW ALSO DEFINES THE MODAL STYLE - SHADOW, PADDING, WIDTH, ETC.
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 250,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function ProjectModal(props: any) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = React.useState({});

// ########## FUNCTIONS FOR OPEN AND CLOSE MODAL ############
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProject(prevState => Object.assign({}, prevState, {[event.target.name]: event.target.value}));
  };

  const body = (
    <Paper style={modalStyle} className={classes.paper}>

        {/* 'CREATE PROJECT' FORM  */}
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4">New Project</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Name" name="name" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Category" name="category" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Planned" name="planned" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Estimated Start Date" name="est_startdate" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Start Date" name="startdate" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Estimated Finish Date" name="est_enddate" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Finish Date" name="enddate" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="text" placeholder="Description" name="description" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" onClick={(e) => {props.submitOnClick(e, project); handleClose()}}>Submit</Button>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    // REACT.FRAGMENT IS IMPORTANT FOR SOME REASON
    <React.Fragment>
      <IconButton edge="end" style={{ color: "#2196f3" }} onClick={handleOpen}>
        <NoteAddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </React.Fragment>
  );
}
