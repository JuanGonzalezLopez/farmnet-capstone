import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import compose from "recompose/compose";
import { connect } from "react-redux";

//MUI components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// actions
import { closeMode, deleteCow } from "../actions/dataActions";

const styles = theme => ({
  menu: {
    width: 200
  },
  confirmButton: {
    backgroundColor: theme.palette.error.dark,
    '&:hover':{
      backgroundColor: theme.palette.error.light,
    }
  }
});

class DeleteCow extends React.Component {
  confirmDelete = () => {
    this.props.deleteCow({
      id: this.props.cow.id
    })
  };

  render() {
    const { classes, closeMode, cow } = this.props;
    return (
      <Dialog open onClose={closeMode} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Are you sure you want to delete {cow.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By confirming you agree to delete this cow and ackloweged that any
            information regarding it can not be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeMode} color="default">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={this.confirmDelete}
            color="primary"
            classes={{ containedPrimary: classes.confirmButton }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteCow.propTypes = {
  cow: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  closeMode: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    cow: state.data.selected
  };
};

const mapActionsToProps = {
  closeMode,
  deleteCow
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(
  compose(
    withStyles(styles),
    withWidth()
  )(DeleteCow)
);
