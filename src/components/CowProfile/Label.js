import React from "react";
import PropTypes from "prop-types";

//MUI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Label(props) {
  const { style, text, classNameStyle } = props;

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="center"
      className={style}
      id={classNameStyle}
    >
      <Grid item>
        <Typography
          variant="subtitle2"
          align="left"
          style={{ marginRight: 5 }}
        >
          {text.title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle2"
          align="left"
        >
          {text.value}
        </Typography>
      </Grid>
    </Grid>
  );
}

Label.propTypes = {
  text: PropTypes.object.isRequired,
  style: PropTypes.string.isRequired,
  classNameStyle: PropTypes.string.isRequired
};

export default Label;
