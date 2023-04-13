import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

// actions
import { getSelectedData } from "../actions/dataActions";

//MUI components
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

//Made components
import LineGraph from "../components/OutputView/LineGraph.js";
import TableOutput from "../components/OutputView/TableOutput.js";
import OutputOptions from "../components/OutputOptions";
import CowProfile from "../components/CowProfile";
import ConfigureButtons from "../components/ConfigureButtons";

//utils
import {
  getStartEnd,
  getFormattedTime,
  convertToCelcius,
  convertToFarenheit,
  isCelcius
} from "../utils";

const styles = theme => ({
  cont: {
    width: `100%`,
    background: theme.palette.primary.light,
    padding: "8px 0px",
    borderTop: `1px solid ${theme.palette.primary.dark}`,
    borderBottom: `1px solid ${theme.palette.primary.dark}`
  },
});

class OutputData extends React.Component {
  componentDidMount() {
    const { cowSelected } = this.props;
    this.props.getSelectedData(cowSelected.id);
  }

  componentDidUpdate(prevProps) {
    this.handleChange(prevProps);
  }

  handleChange = prevProps => {
    const { cowSelected } = this.props;
    if (this.props.cowSelected !== prevProps.cowSelected) {
      this.props.getSelectedData(cowSelected.id);
    }
  };

  calculateOutput = () => {
    const { timeFormat, data, tempUnit } = this.props;

    if (data && data.length > 0) {
      const { data: outputData, end } = getStartEnd(
        data[data.length - 1].timestamp,
        timeFormat
      );

      console.log(end);
      console.log(outputData);

      for (var i = 0; i < data.length && data[data.length - 1 - i].timestamp > end; i++) {
        const currentText = getFormattedTime(data[data.length - 1 - i].timestamp, timeFormat);
        const period = outputData.find(period => period.text === currentText);

        console.log(period);

        if (period) {
          period.numberOfTempTimestamps++;
          let currentTemp = data[data.length - 1 - i].temperature;
          if (isCelcius(tempUnit)) {
            currentTemp = convertToCelcius(currentTemp);
          } else {
            currentTemp = convertToFarenheit(currentTemp);
          }

          period.totalTemp += currentTemp;
        }
      }

      console.log(...outputData);

      outputData.forEach(period => {
        period.y =
          Math.round(period.totalTemp / period.numberOfTempTimestamps) || 0;
        period.x = period.text;

        delete period.text;
        delete period.totalTemp;
        delete period.numberOfTempTimestamps;
      });

      return outputData.reverse();
    }

    return null;
  };

  render() {
    const {
      timeFormat,
      viewFormat,
      loading,
      data: rawData,
      tempUnit,
      classes
    } = this.props;

    let data;
    let output = null;

    switch (true) {
      case rawData && rawData.length === 0:
        output = (
          <Typography
            variant="h2"
            style={{ "-webkit-text-stroke": "1px green" }}
          >
            No data to output.
          </Typography>
        );
        break;

      case viewFormat === "Graph":
        data = this.calculateOutput();
        output = <LineGraph output={data} tempUnit={tempUnit} />;
        break;

      case viewFormat === "Table":
        data = this.calculateOutput();
        output = <TableOutput output={data} timeFormat={timeFormat} tempUnit={tempUnit} />;
        break;

      default:
    }

    return (
      <div className={classes.cont}>
        <Grid container alignItems="center" direction="row" justify="space-evenly" spacing={0} style={{marginBottom: '20px'}}>
          <OutputOptions />
          <ConfigureButtons />
        </Grid>
        {loading ? (
          <CircularProgress size={100} thickness={5} color="primary" />
        ) : (
          <>
            {output}
            <CowProfile />
          </>
        )}
      </div>
    );
  }
}

OutputData.propTypes = {
  cowSelected: PropTypes.object,
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired,
  tempUnit: PropTypes.string.isRequired,
  viewFormat: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    cowSelected: state.data.selected,
    timeFormat: state.outputSetting.timeFormat,
    viewFormat: state.outputSetting.viewFormat,
    tempUnit: state.outputSetting.tempUnit,
    loading: state.data.selectedLoading,
    data: state.data.selectedData
  };
};

const mapActionsToProps = {
  getSelectedData: getSelectedData
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(OutputData));
