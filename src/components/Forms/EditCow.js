import React from "react";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";
import { connect } from "react-redux";

//MUI components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

// made components
import Form from "./Form";

// actions
import { editCow, closeMode } from "../../actions/dataActions";

class EditCow extends React.Component {
  submit = (data) => {
    this.props.editCow(data);
  };

  render() {
    const { closeMode, cow } = this.props;
    return (
      <Dialog open onClose={closeMode} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit {cow.name}</DialogTitle>

        <Form
          name={cow.name}
          id={cow.id}
          age={cow.age}
          cycle={cow.cycle}
          breed={cow.breed}
          labels={cow.labels}
          submit={this.submit}
          closeMode={closeMode}
          dialogText="Edit the cow information to update the database."
        />
      </Dialog>
    );
  }
}

EditCow.propTypes = {
  cow: PropTypes.object.isRequired,
  closeMode: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    cow: state.data.selected
  };
};

const mapActionsToProps = {
  closeMode,
  editCow
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(
  withWidth()(EditCow)
);
