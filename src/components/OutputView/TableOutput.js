import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//Made components
import Table from "./Table.js";

const styles = theme => ({
  analyticsGrid: {
    width: "100%",
    height: "75%"
  }
});

function TableOutput(props) {
  const { classes, output, timeFormat, tempUnit } = props;

  let timeString;
  let midPoint;
  let data = [];
  switch (timeFormat) {
    case "Week":
      timeString = "Day";
      midPoint = Math.floor(output.length / 2);
      data.push(output.slice(0, midPoint));
      data.push(output.slice(midPoint, output.length));
      break;
    case "Month":
      timeString = "Day";
      midPoint = Math.floor(output.length / 4);
      data.push(output.slice(0, midPoint));
      data.push(output.slice(midPoint, midPoint*2));
      data.push(output.slice(midPoint*2, midPoint*3));
      data.push(output.slice(midPoint*3, output.length));
      break;
    case "Year":
      timeString = "Month";
      midPoint = Math.floor(output.length / 2);
      data.push(output.slice(0, midPoint));
      data.push(output.slice(midPoint, output.length));
      break;
    default:
      timeString = "Hour";
      if(output.length > 12){
        midPoint = Math.floor(output.length / 4);
        data.push(output.slice(0, midPoint));
        data.push(output.slice(midPoint, midPoint*2));
        data.push(output.slice(midPoint*2, midPoint*3));
        data.push(output.slice(midPoint*3, output.length));
      }else if(output.length > 6){
        midPoint = Math.floor(output.length / 2);
        data.push(output.slice(0, midPoint));
        data.push(output.slice(midPoint, output.length));
      }else{
        data.push(output);
      }
  }


  const table = data.map((coordinate, index)=>(
    <div
      style={{
        width: "98%",
        overflowX: "scroll",
        marginTop: '5px'
      }}
      key={`table#${index}`}
    >
      <Table data={coordinate} front={index % 2 === 0} timeString={timeString} tempUnit={tempUnit}/>
    </div>
  ));

  return (
    <Grid
      className={classes.analyticsGrid}
      container
      alignItems="center"
      direction="column"
      justify="space-evenly"
    >
      {table}
    </Grid>
  );
}

TableOutput.propTypes = {
  classes: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired,
  tempUnit: PropTypes.string.isRequired,
  output: PropTypes.array.isRequired,
};

export default withStyles(styles)(TableOutput);
