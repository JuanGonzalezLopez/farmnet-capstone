import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { setBreed } from "../../actions/filtersActions";

// MUI components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { BREEDS } from "../../constants";

function BreedOptions(props) {
  const { cowBreed, setBreed, cowList, style, loading } = props;

  return (
    <FormControl className={style}>
      <InputLabel htmlFor="age-native-simple">Breed:</InputLabel>
      <Select
        native
        disabled={cowList.length === 0 || loading}
        onChange={event => {
          setBreed(event.target.value);
        }}
        value={cowBreed}
        inputProps={{
          name: "breed",
          id: "breed",
          "aria-label": "breed"
        }}
      >
        <option value="All">All</option>
        {BREEDS.map(option => (
          <option value={option.id} key={`${option.text}Button`}>
            {option.text}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

BreedOptions.propTypes = {
  cowBreed: PropTypes.string.isRequired,
  setBreed: PropTypes.func.isRequired,
  cowList: PropTypes.array.isRequired,
  style: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    cowList: state.data.cows,
    cowBreed: state.filters.breed,
    loading: state.loading || state.data.selectedLoading,
  };
};

const mapActionsToProps = {
  setBreed: setBreed
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(BreedOptions);
