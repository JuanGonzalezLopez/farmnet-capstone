import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MUI components
import ButtonMUI from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

// actions
import { openMode } from "../../actions/dataActions";

function Edit(props) {
  const { style, loading, openMode } = props;
  return (
    <ButtonMUI
      disabled={loading}
      onClick={() => {openMode('edit')}}
      className={style}
      aria-label={`Edit Cow Button`}
      size="small"
      style={{ background: "#1565c0" }}
    >
      <EditIcon style={{ fontSize: 18, marginRight: 6, marginTop: -1 }} />
      Edit
    </ButtonMUI>
  );
}

Edit.propTypes = {
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
)(Edit);
