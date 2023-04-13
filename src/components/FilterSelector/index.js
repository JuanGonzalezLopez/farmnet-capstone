import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

//MUI components
import TextField from '@material-ui/core/TextField';

//actions
import { setFilter } from '../../actions/filtersActions'

const styles = theme => ({
  search:{
    marginBottom: 10,
    [theme.breakpoints.only('xs')]: {
      width: '80%',
      marginLeft: '10%'
    },
  }
});

function CowSelector(props){

    const { classes, filter, loading } = props;

    return (
      <TextField
        id="cow-filter"
        disabled={loading}
        onChange={(event)=>{props.setFilter(event.target.value)}}
        label="Filter by name"
        type="text"
        variant="outlined"
        className={classes.search}
        value={filter}
      />
    );
}

CowSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return ({
      filter: state.filters.text,
      loading: state.loading || state.data.selectedLoading,
  })
};

const mapActionsToProps = {
  setFilter
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CowSelector));
