import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//MUI components
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

// actions
import { openMode } from "../actions/dataActions";
import { setTempUnit } from "../actions/outputSettingsActions";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  root: {
    width: 32,
    height: 18,
    padding: "2px 0px",
    margin: "0px 3px",
    display: "flex"
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main
      }
    }
  },
  thumb: {
    width: "12px !important",
    height: "12px !important",
    marginTop: 2,
    boxShadow: "none"
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 8,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {},
  icon: {
    height: 35,
    width: 35,
    marginTop: "-3px",
    padding: 0,
    marginLeft: "15px",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white
    }
  }
});

function NavBar(props) {
  const { classes, loading, openMode, tempUnit, setTempUnit } = props;
  return (
    <AppBar
      id="navigationBar"
      position="static"
      color="primary"
      style={{ height: "55px", width: "100%" }}
    >
      <Toolbar>
        <Typography variant="h4" color="inherit" className={classes.grow}>
          FarmNet
        </Typography>
        <Typography component="div">
          <Grid component="label" container alignItems="center">
            <Grid item>Celcius</Grid>
            <Grid item>
              <Switch
                classes={{
                  root: classes.root,
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked
                }}
                checked={tempUnit === "Farenheit"}
                onChange={e => {
                  if (tempUnit === "Celcius") {
                    setTempUnit("Farenheit");
                  } else {
                    setTempUnit("Celcius");
                  }
                }}
                name="temperatureUnitToggle"
              />
            </Grid>
            <Grid item>Farenheit</Grid>
          </Grid>
        </Typography>
        <IconButton
          disabled={loading}
          onClick={() => {
            openMode("add");
          }}
          color="inherit"
          className={classes.icon}
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  openMode: PropTypes.func.isRequired,
  tempUnit: PropTypes.string.isRequired,
  setTempUnit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading || state.data.selectedLoading,
    tempUnit: state.outputSetting.tempUnit
  };
};

const mapActionsToProps = {
  openMode,
  setTempUnit
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NavBar));
