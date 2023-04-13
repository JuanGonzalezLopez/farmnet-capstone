import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// made components
import ViewOptions from './ViewOptions'
import TimeOptions from './TimeOptions'

const styles = (theme) => ({
    viewOptionsCont: {
      background: '#F8F8F8',
      borderRadius: 5,
      boxShadow: theme.shadows[3],
      height: '100%',
      width: `30%`,
      [theme.breakpoints.only('xs')]: {
        width: '45%',
        marginTop: '10px'
      },
    },
    optionsCont: {
      background: '#F8F8F8',
      borderRadius: 5,
      boxShadow: theme.shadows[3],
      height: '100%',
      width: `45%`,
      [theme.breakpoints.only('xs')]: {
        width: '90%'
      },
    }
});

function OutputOptions(props){
      const { classes } = props;
      return (
          <>
            <TimeOptions style={classes.optionsCont} />
            <ViewOptions style={classes.viewOptionsCont} />
          </>
      );
}

OutputOptions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutputOptions);
