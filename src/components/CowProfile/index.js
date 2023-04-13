import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

//MUI components
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

//made components
import Label from "./Label";

//utils
import {
  getTempUnitString,
  convertToCelcius,
  convertToFarenheit,
  isCelcius
} from "../../utils";

const styles = theme => ({
  messageCont: {
    height: "15%",
    width: "98%",
    marginTop: '20px'
  },
  characteristics: {
    boxShadow: theme.shadows[3],
    width: "100%",
    maxHeight: "100%",
    borderRadius: 8,
    padding: "5px 0",
    color: 'black',
    margin: '5px 0px',
    [theme.breakpoints.only('xs')]: {
      fontSize: '10px'
    },
    "&#cowData": {
      backgroundColor: 'white'
    },
    "&#cowLabels": {
      backgroundColor: theme.palette.grey[500]
    },
    "&#cowInfo": {
      backgroundColor: theme.palette.secondary.light
    },
  }
});

function CowProfile(props) {
  const { classes, cow, data, tempUnit } = props;
  const { labels = [] } = cow;

  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  let duration = "-";
  let durationText = "Day(s)"
  let currentTemp = "-";
  let lastEntry = "-";

  if (data && data.length > 0) {
    let last = moment(data[0].timestamp);
    let first = moment(data[data.length - 1].timestamp);

    duration = Math.round(moment.duration(first.diff(last)).asDays());
    if(duration === 0){
      duration = Math.round(moment.duration(first.diff(last)).asDays() * 24) + 1;
      durationText = "Hour(s)"
    }
    lastEntry = first.fromNow();

    if (isCelcius(tempUnit)) {
      currentTemp = convertToCelcius(data[0].temperature);
    } else {
      currentTemp = convertToFarenheit(data[0].temperature);
    }
    currentTemp = Math.round(currentTemp);
    currentTemp += getTempUnitString(tempUnit);
  }

  const cowTimeData = [
    {
      title: "Last Update:",
      value: lastEntry
    },
    {
      title: `${durationText} Recorded:`,
      value: duration
    }
  ]

  const cowData = [
    {
      title: "Steps Today:",
      value: "22"
    },
    {
      title: "Current Temp:",
      value: currentTemp
    },
    {
      title: "Current PH:",
      value: "10"
    },
  ];

  const cowDataLarge = [
    ...cowData,
    ...cowTimeData
  ]

  const cowLabels = [];
  for (let i = 0; i < 4 && match; i += 1) {
    let text = "-";
    if (labels[i]) {
      text = labels[i];
    }
    cowLabels.push({ title: text });
  }

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="space-evenly"
      id="cowProfile"
      className={classes.messageCont}
    >
      {!match && cowDataLarge.map((text, index) => (
        <Grid
          key={`labelGrid-${index}`}
          container
          alignItems="center"
          direction="row"
          justify="space-evenly"
          style={{ maxWidth: "18%", height: "30%" }}
        >
          <Label
            classNameStyle={"cowData"}
            text={text}
            style={classes.characteristics}
          />
        </Grid>
      ))}
      {match && cowTimeData.map((text, index) => (
        <Grid
          key={`labelGrid-${index}`}
          container
          alignItems="center"
          direction="row"
          justify="space-evenly"
          style={{ maxWidth: "45%", height: "30%" }}
        >
          <Label
            classNameStyle={"cowData"}
            text={text}
            style={classes.characteristics}
          />
        </Grid>
      ))}
      {match && cowData.map((text, index) => (
        <Grid
          key={`labelGrid-${index}`}
          container
          alignItems="center"
          direction="row"
          justify="space-evenly"
          style={{ maxWidth: "30%", height: "30%" }}
        >
          <Label
            classNameStyle={"cowInfo"}
            text={text}
            style={classes.characteristics}
          />
        </Grid>
      ))}
      {match && cowLabels.map((text, index) => (
        <Grid
          key={`labelGrid-${index}`}
          container
          alignItems="center"
          direction="row"
          justify="space-evenly"
          style={{ maxWidth: "21%", height: "30%" }}
        >
          <Label
            classNameStyle={"cowLabels"}
            text={text}
            style={classes.characteristics}
          />
        </Grid>
      ))}
    </Grid>
  );
}

CowProfile.propTypes = {
  cow: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  tempUnit: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    cow: state.data.selected,
    data: state.data.selectedData,
    tempUnit: state.outputSetting.tempUnit
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CowProfile));
