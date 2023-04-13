import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// made components
import SortOptions from './SortOptions'
import CycleOptions from './CycleOptions'
import BreedOptions from './BreedOptions'

const styles = theme => ({
  CowOptionsCont:{
      width: `45%`,
      [theme.breakpoints.only('xs')]: {
        width: '90%',
        marginLeft: '5%'
      },
  },
  formControl: {
    margin: 0,
    marginRight: `3%`,
    width: '30%',
  }
});

function CowOptions(props){

    const { classes } = props;
    return (
      <div className={classes.CowOptionsCont}>
        <BreedOptions style={classes.formControl} />
        <CycleOptions style={classes.formControl} />
        <SortOptions style={classes.formControl} />
      </div>
    );
}

CowOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CowOptions);
