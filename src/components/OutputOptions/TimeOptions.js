import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { setTimeFormat } from '../../actions/outputSettingsActions'

// MUI components
import Grid from '@material-ui/core/Grid';

// made components
import Button from '../Button'

import { TIME_FORMATS } from '../../constants'

function TimeOptions(props){

        const { timeFormat, setTimeFormat, loading, style } = props;
        return (
          <Grid container alignItems="center" direction="row" justify="space-evenly" spacing={0} className={style}>
            {TIME_FORMATS.map(option => (
                <Grid item key={`${option}Button`}>
                    <Button
                      disabled={loading}
                      color="secondary"
                      text={option}
                      handler={()=>{setTimeFormat(option)}}
                      active={timeFormat === option}
                    />
                </Grid>
              )
            )}
          </Grid>
        );
}

TimeOptions.propTypes = {
  timeFormat: PropTypes.string.isRequired,
  setTimeFormat: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return ({
        loading: state.data.selectedLoading,
        timeFormat: state.outputSetting.timeFormat
    })
};

const mapActionsToProps = {
    setTimeFormat: setTimeFormat,
};

export default connect(mapStateToProps, mapActionsToProps)(TimeOptions);
