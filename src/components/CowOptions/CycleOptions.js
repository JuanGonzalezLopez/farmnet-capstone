import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//import actions
import { setCycle } from "../../actions/filtersActions";

//MUI components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { CYCLES } from "../../constants";

function CycleOptions(props) {
  const { style, cowCycle, setCycle, cowList, loading } = props;
  return (
    <FormControl className={style}>
      <InputLabel htmlFor="age-native-simple">Cycle:</InputLabel>
      <Select
        native
        disabled={cowList.length === 0 || loading}
        onChange={event => {
          setCycle(event.target.value);
        }}
        value={cowCycle}
        inputProps={{
          name: "cycle",
          id: "cycle",
          "aria-label": "cycle"
        }}
      >
        <option value="All">All</option>
        {CYCLES.map(option => (
          <option value={option.id} key={`${option.text}Button`}>
            {option.text}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

CycleOptions.propTypes = {
  style: PropTypes.string.isRequired,
  cowCycle: PropTypes.string.isRequired,
  setCycle: PropTypes.func.isRequired,
  cowList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    cowList: state.data.cows,
    cowCycle: state.filters.cycle,
    loading: state.loading || state.data.selectedLoading,
  };
};

const mapActionsToProps = {
  setCycle: setCycle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CycleOptions);
