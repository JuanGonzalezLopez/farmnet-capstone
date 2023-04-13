import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//import actions
import { setSort } from "../../actions/filtersActions";

//MUI components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { SORT_BY } from "../../constants";

function SortOptions(props) {
  const { style, cowSort, setSort, cowList, loading } = props;
  return (
    <FormControl className={style}>
      <InputLabel htmlFor="age-native-simple">Sort By:</InputLabel>
      <Select
        native
        disabled={cowList.length === 0 || loading}
        onChange={event => {
          setSort(event.target.value);
        }}
        value={cowSort}
        inputProps={{
          name: "sort-by",
          id: "sort-by",
          "aria-label": "sort-by"
        }}
      >
        {SORT_BY.map(option => (
          <option value={option} key={`${option}Button`}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

SortOptions.propTypes = {
  style: PropTypes.string.isRequired,
  cowSort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  cowList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    cowList: state.data.cows,
    cowSort: state.filters.sort,
    loading: state.loading || state.data.selectedLoading,
  };
};

const mapActionsToProps = {
  setSort: setSort
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SortOptions);
