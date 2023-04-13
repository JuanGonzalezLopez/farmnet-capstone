import React from "react";
import PropTypes from "prop-types";

//mui components
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//other utils
import { LineChart } from "react-easy-chart";
import ContainerDimensions from "react-container-dimensions";

//utils
import {
  getTempUnitString
} from "../../utils";

const styles = theme => ({
  analyticsGrid: {
    width: "100%",
    height: "75%"
  }
});

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDataY: "",
      currentDataX: "Hover Over Data Points To See Its Value"
    };
  }

  mouseOverHandler = (d, e) => {
    const { tempUnit } = this.props;
    this.setState({
      currentDataY: d.y + getTempUnitString(tempUnit),
      currentDataX: d.x + ":"
    });
  };

  mouseOutHandler = () => {
    this.setState({
      currentDataY: "",
      currentDataX: "Hover Over Data Points To See Value"
    });
  };

  render() {
    const { classes, output } = this.props;
    const { currentDataX, currentDataY } = this.state;

    const max = Math.max.apply(
      Math,
      output.map(function(o) {
        return o.y;
      })
    );

    return (
      <Grid
        className={classes.analyticsGrid}
        container
        alignItems="center"
        direction="row"
        justify="center"
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h6">
            {currentDataX + " " + currentDataY}
          </Typography>
        </Grid>
        <Grid item xs={1} style={{ transform: "rotate(-90deg)" }}>
          <Typography variant="h6">
            Temperature
          </Typography>
        </Grid>
        <ContainerDimensions>
          {({ width, height }) => (
            <LineChart
              yDomainRange={[0, max + max * 0.05]}
              xType={"text"}
              lineColors={["#254127"]}
              dataPoints
              axes
              data={[output]}
              width={width * 0.88}
              height={height * 0.85}
              mouseOverHandler={this.mouseOverHandler}
              mouseOutHandler={this.mouseOutHandler}
              mouseMoveHandler={this.mouseMoveHandler}
              style={{ backgroundColor: "white", borderRadius: 8, }}
            />
          )}
        </ContainerDimensions>
      </Grid>
    );
  }
}

LineGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  tempUnit: PropTypes.string.isRequired,
  output: PropTypes.array.isRequired
};

export default withStyles(styles)(LineGraph);
