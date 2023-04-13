import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MUI components
import ButtonMUI from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

// actions
import { openMode } from "../../actions/dataActions";

function Delete(props) {
  const { style, loading, openMode } = props;
  return (
    <ButtonMUI
      disabled={loading}
      onClick={() => {openMode('delete')}}
      className={style}
      aria-label={`Delete Cow Button`}
      size="small"
      style={{background: '#c62828'}}
    >
      <DeleteIcon style={{ fontSize: 18, marginRight: 6, marginTop: -1 }} />
      Delete
    </ButtonMUI>
  );
}

Delete.propTypes = {
  style: PropTypes.string.isRequired,
  openMode: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return { loading: state.data.selectedLoading };
};

const mapActionsToProps = {
  openMode
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Delete);
