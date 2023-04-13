import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import compose from "recompose/compose";

//MUI components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

//constanst
import { CYCLES, BREEDS } from "../../constants";

const styles = theme => ({
  menu: {
    width: 200
  },
  labelField: {
    width: "47%",
    marginLeft: "1.5%",
    backgroundColor: theme.palette.grey["100"]
  }
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || "",
      id: props.id || "",
      age: props.age || "",
      cycle: props.cycle || "",
      breed: props.breed || "",
      labels: props.labels || ["","","",""]
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeLabel = index => event => {
    const text = event.target.value;
    this.setState(prevState => {
      let currentLabels = [...prevState.labels];

      currentLabels[index] = text;

      return { labels: currentLabels };
    });
  };

  render() {
    const { classes, dialogText, closeMode, submit } = this.props;
    const { name, id, age, breed, cycle, labels } = this.state;
    return (
      <>
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Cow Name"
          type="text"
          value={name}
          onChange={this.handleChange("name")}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="id"
          name="id"
          label="ID number"
          type="text"
          value={id}
          onChange={this.handleChange("id")}
          fullWidth
        />
        <TextField
          id="age"
          name="age"
          label="How old is the cow?"
          type="number"
          fullWidth
          min="0"
          error={age < 0}
          value={age}
          onChange={this.handleChange("age")}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <TextField
          id="breed"
          required
          name="breed"
          select
          fullWidth
          label="What breed is it?"
          value={breed}
          onChange={this.handleChange("breed")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
        >
          {BREEDS.map(breed => (
            <MenuItem value={breed.id} key={breed.id}>{breed.text}</MenuItem>
          ))}
        </TextField>
        <TextField
          id="cycle"
          required
          name="cycle"
          select
          fullWidth
          label="In what cycle is this cow?"
          value={cycle}
          onChange={this.handleChange("cycle")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
        >
          {CYCLES.map(cycle => (
            <MenuItem value={cycle.id} key={cycle.id}>{cycle.text}</MenuItem>
          ))}
        </TextField>

        {labels.map((label, index) => (
          <TextField
            margin="dense"
            key={`Label: #${index + 1}`}
            classes={{root: classes.labelField}}
            id={label}
            name={label}
            label={`Label: #${index + 1}`}
            type="text"
            value={label}
            onChange={this.handleChangeLabel(index)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeMode} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>{submit({...this.state})}} color="primary">
          {this.props.name ? "Update" : "Add"}
        </Button>
      </DialogActions>
      </>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  closeMode: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  dialogText: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth()
)(Form);
