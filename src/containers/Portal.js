import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//MUI components
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";

//Made components
import Nav from "./NavBar";
import UserInput from "./UserInputContainer";
import OutputUI from "./OutputUI";

const styles = function(theme) {
  return {
    portalCont: {
      width: "100%"
    },
    portalInfo: {
      maxWidth: "1140px",
      width: "100%",
      marginTop: "20px",
      border: `1px solid ${theme.palette.primary.dark}`,
      marginBottom: "30px"
    }
  };
};

function Portal(props) {
  const { classes, loading, error } = props;

  return (
    <Grid
      container
      justify="flex-start"
      direction="column"
      alignItems="center"
      className={classes.portalCont}
    >
      <Nav />
      {error ? (
        <Typography variant="h3" color="error" style={{marginTop: '50px'}}>
          <Error style={{ fontSize: 38, marginRight: 5 }} />
          {error.message}
        </Typography>
      ) : !loading ? (
        <div className={classes.portalInfo}>
          <UserInput />
          <OutputUI />
        </div>
      ) : (
        <CircularProgress
          size={250}
          thickness={1}
          color="primary"
          style={{ marginTop: "20px" }}
        />
      )}
    </Grid>
  );
}
Portal.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    error: state.data.error
  };
};

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Portal));
