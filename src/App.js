import React from "react";
import { connect } from "react-redux";

//Made components
import Portal from "./containers/Portal";
import DeleteCow from "./components/DeleteCow";
import EditCow from "./components/Forms/EditCow";
import AddCow from "./components/Forms/AddCow";

// actions
import { fetchCows } from "./actions/dataActions";

// responsive
// switch to promises instead of recursion
// add today steps ph & steps
// handle error message
// ph endpoints
// cow selector loading when error

class App extends React.Component {

  componentDidMount() {
    this.props.fetchCows();
  }

  render() {
    const { mode } = this.props;

    const containers = [<Portal key="portal"/>]
    switch (mode) {
      case "delete":
        containers.push(<DeleteCow key="deleteModal"/>)
        break;
      case "add":
        containers.push(< AddCow key="addForm"/>)
        break;
      case "edit":
        containers.push(< EditCow key="editForm"/>)
        break;
      default:
    }

    return (<>{containers}</>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    mode: state.data.mode,
  };
};

const mapActionsToProps = {
  fetchCows: fetchCows
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
