import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

//MUI components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// actions
import { selectCow } from '../../actions/dataActions'

const styles = theme => ({
    button: {
        width: "95%",
        borderRadius: 5
    },
    lightText: {
        color: "#eee"
    },
    normalText: {
        color: theme.palette.primary.main
    },
});


function CowSelectorButton(props){

  const { classes, cow, active, selectCow, loading } = props;
  return (
    <Button disabled={loading} color="primary" variant={!active ? "text" : "contained"} onClick={()=>{selectCow(cow)}} key={cow.id} className={classes.button}>
      <Typography variant="body2" className={!active ? classes.normalText : classes.lightText}>{cow.name}</Typography>
    </Button>
  );
}

CowSelectorButton.defaultProps = {
  active: false
};

CowSelectorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  cow: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  active: PropTypes.bool,
  selectCow: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return ({
      loading: state.data.selectedLoading,
    })
};

const mapActionsToProps = {
    selectCow: selectCow,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CowSelectorButton));
