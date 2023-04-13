import React from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import { connect } from "react-redux";

//MUI components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

// made components
import Form from "./Form";

// actions
import { setCow, closeMode } from "../../actions/dataActions";

class AddCow extends React.Component {

    submit = (data) => {
      this.props.setCow(data);
    };

    render() {
        const { closeMode } = this.props;

        return (
          <Dialog open onClose={closeMode} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a Cow</DialogTitle>

            <Form
              submit={this.submit}
              closeMode={closeMode}
              dialogText="Fill in the necessary information to add a cow to the database."
            />

          </Dialog>
        );
    }
}

AddCow.propTypes = {
  closeMode: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {
  closeMode,
  setCow
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withWidth()(AddCow));
