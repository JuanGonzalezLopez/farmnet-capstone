import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

//MUI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Collapse from '@material-ui/core/Collapse';

//Made components
import OutputData from "./OutputData";

// actions
import { selectCow } from "../actions/dataActions";

import { getSortByKey, compareCows } from "../utils";

const styles = theme => {

  const row = {
    width: "98%",
    textAlign: "center",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
  }

  return {
    OutputUICont: {
      width: `99.9%`,
      background: theme.palette.secondary.light,
      padding: "8px 0px",
      borderTop: `3px solid ${theme.palette.primary.dark}`
    },
    paper: {
      width: `100%`,
      height: `100%`
    },
    progress: {
      margin: 16
    },
    headerRow: {
      width: "98%",
      textAlign: "center",
      paddingBottom: "5px",
      borderBottom: `1px solid ${theme.palette.primary.dark}`
    },
    headerText: {
      color: theme.palette.primary.main,
      fontWeight: "700"
    },
    cowRow: {
      ...row,
      paddingTop: "10px",
      paddingBottom: "10px",
      "&:hover": {
        background: theme.palette.primary.dark,
        color: "white"
      }
    },
    cowRowSelected: {
      ...row,
      paddingTop: "10px",
      color: "white",
      background: theme.palette.primary.main
    }
  }
};

function OutputUI(props) {
  const {
    classes,
    cowSelected,
    cows,
    cowBreed,
    filterText,
    cowCycle,
    sortByValue
  } = props;

  const match = useMediaQuery(theme => theme.breakpoints.down("xs"));



  const sortKey = getSortByKey(sortByValue);

  let filteredCows = cows
    .sort((a, b) => compareCows(a, b, sortKey))
    .filter(cow => {
      return (
        (cowSelected && cow.id === cowSelected.id) ||
        ((cowBreed === "All" || cow.breed === cowBreed) &&
          (cowCycle === "All" || cow.cycle === parseInt(cowCycle)) &&
          (filterText === "" ||
            cow.name.toLowerCase().indexOf(filterText) !== -1))
      );
    });

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="space-evenly"
      className={classes.OutputUICont}
    >
      <Grid
        container
        alignItems="center"
        direction="row"
        justify="space-evenly"
        className={classes.headerRow}
      >
        <Grid item xs={2}>
          <Typography variant="subtitle1" color="inherit" className={classes.headerText}>
            Name
          </Typography>
        </Grid>
        <Grid item xs={3} sm={2} md={1}>
          <Typography variant="subtitle1" color="inherit" className={classes.headerText}>
            ID
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1" color="inherit" className={classes.headerText}>
            Age
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" color="inherit" className={classes.headerText}>
            Breed
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1" color="inherit" className={classes.headerText}>
            Cycle
          </Typography>
        </Grid>
        {!match && (
          <Grid item xs={2}>
            <Typography variant="subtitle1" color="inherit" className={classes.headerText}>
              Labels
            </Typography>
          </Grid>
        )}
      </Grid>
      {filteredCows.map(cow => (
        <div
          className={
            cowSelected && cowSelected.id === cow.id
              ? classes.cowRowSelected
              : classes.cowRow
          }
          key={cow.id}
        >
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-evenly"
            onClick={() => {
              if(cowSelected && cowSelected.id === cow.id){
                props.selectCow(null);
              } else {
                props.selectCow(cow);
              }
            }}
          >
            <Grid item xs={2}>
              <Typography variant="subtitle2" color="inherit">
                {cow.name}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <Typography variant="subtitle2" color="inherit">
                {cow.id}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="subtitle2" color="inherit">
                {cow.age}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" color="inherit">
                {cow.breed}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="subtitle2" color="inherit">
                {cow.cycle}
              </Typography>
            </Grid>
            {!match && (
              <Grid item xs={2}>
                <Typography variant="subtitle2" color="inherit">
                  {cow.labels.every(label => label === "")
                    ? "-"
                    : cow.labels.join(", ")}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Collapse in={cowSelected && cowSelected.id === cow.id}>
            {cowSelected && cowSelected.id === cow.id && (
              <div style={{marginTop: '10px'}}>
                <OutputData />
              </div>
            )}
          </Collapse>
        </div>
      ))}
    </Grid>
  );
}

OutputUI.propTypes = {
  classes: PropTypes.object.isRequired,
  cowSelected: PropTypes.object,
  error: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    cowSelected: state.data.selected,
    cows: state.data.cows,
    filterText: state.filters.text,
    cowCycle: state.filters.cycle,
    cowBreed: state.filters.breed,
    sortByValue: state.filters.sort
  };
};

const mapActionsToProps = {
  selectCow: selectCow
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(OutputUI));
