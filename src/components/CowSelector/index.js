import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

//MUI components
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

// made components
import Button from "./CowSelectorButton";

// utils
import { getSortByKey, compareCows } from "../../utils";

const styles = theme => ({
  cowSelectorCont: {
    height: `60%`,
    width: `98%`,
    overflowY: "auto",
    padding: "5px 7.5px",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.primary.dark}`
  }
});

function CowSelector(props) {
  const {
    classes,
    cows,
    cowSelected,
    cowBreed,
    loading,
    filterText,
    cowCycle,
    sortByValue
  } = props;
  const sortKey = getSortByKey(sortByValue);
  let cowList;

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

  cowList = filteredCows.map((cow, index) => (
    <Button
      cow={cow}
      key={cow.id}
      active={cowSelected && cow.id === cowSelected.id}
    />
  ));

  return (
    <Grid
      container
      direction="column"
      justify={loading ? "center" : "flex-start"}
      alignItems="center"
      className={classes.cowSelectorCont}
    >
      {!loading ? (
        <>
          <Typography
            variant="caption"
            align="left"
            style={{ textDecoration: "underline" }}
          >
            Cows:
          </Typography>
          {cowList}
        </>
      ) : (
        <CircularProgress size={100} thickness={1} />
      )}
    </Grid>
  );
}

CowSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  cows: PropTypes.array.isRequired,
  cowSelected: PropTypes.object,
  cowBreed: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  cowCycle: PropTypes.string.isRequired,
  sortByValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    filterText: state.filters.text,
    cowCycle: state.filters.cycle,
    cowBreed: state.filters.breed,
    cows: state.data.cows,
    cowSelected: state.data.selected,
    loading: state.loading,
    sortByValue: state.filters.sort
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CowSelector));
