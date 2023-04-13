import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { setViewFormat } from '../../actions/outputSettingsActions'

// MUI components
import Grid from '@material-ui/core/Grid';

// made components
import Button from '../Button'

import { VIEW_FORMATS } from '../../constants'

function ViewOptions(props){

        const { viewFormat, setViewFormat, loading, style } = props;
        return (
          <Grid container alignItems="center" direction="row" justify="space-evenly" spacing={0} className={style}>
            {VIEW_FORMATS.map(option => (
                <Grid item key={`${option}Button`}>
                    <Button
                      disabled={loading}
                      color="secondary"
                      text={option}
                      handler={()=>{setViewFormat(option)}}
                      active={viewFormat === option}
                    />
                </Grid>
              )
            )}
          </Grid>
        );
}

ViewOptions.propTypes = {
  viewFormat: PropTypes.string.isRequired,
  setViewFormat: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return ({
        loading: state.data.selectedLoading,
        viewFormat: state.outputSetting.viewFormat
    })
};

const mapActionsToProps = {
    setViewFormat: setViewFormat,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewOptions);
