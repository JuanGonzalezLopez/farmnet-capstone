import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//MUI components
import Grid from '@material-ui/core/Grid';

//Made components
import CowOptions from '../components/CowOptions';
import FilterSelector from '../components/FilterSelector';

const styles = theme => {

  return {

  UserInputContainerCont:{
      width: `100%`,
      padding: 5,
      paddingTop: 10,
      background: '#F8F8F8',
      borderRight: `1px solid ${theme.palette.primary.main}`
  }
}};

function UserInputContainer(props){
  const { classes } = props;
  return (
      <Grid container alignItems="center" direction="row" justify="space-between" className={classes.UserInputContainerCont}>
        <FilterSelector/>
        <CowOptions />
      </Grid>
  );
}

UserInputContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInputContainer);
