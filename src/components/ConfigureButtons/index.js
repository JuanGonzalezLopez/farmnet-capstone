import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// made components
import Delete from './Delete'
import Edit from './Edit'

const styles = function(theme) {return{
    buttons: {
      background: '#F8F8F8',
      color: 'white',
      borderRadius: 5,
      boxShadow: theme.shadows[3],
      height: '100%',
      maxWidth: `48%`,
    }
}};

function OutputOptions(props){
      const { classes } = props;
      return (
          <>
              <Edit style={classes.buttons} />
              <Delete style={classes.buttons} />
          </>
      );
}

OutputOptions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutputOptions);
