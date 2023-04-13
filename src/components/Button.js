import React from 'react';
import PropTypes from 'prop-types';

//MUI components
import ButtonMUI from '@material-ui/core/Button';

function Button(props){

    const { handler, text, disabled, active } = props;


    return (
        <ButtonMUI
          onClick={handler}
          disabled={disabled}
          aria-label={`${text} Button`}
          color="primary"
          variant={(active ? 'contained' : "text")}
        >
          {text}
        </ButtonMUI>
    );
}

Button.defaultProps = {
    handler: ()=>{},
};

Button.propTypes = {
  handler: PropTypes.func,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Button;
