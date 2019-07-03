import React, { Component } from "react";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

class PlaceInput extends Component {
  state = { placeName: "" };

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    });
  };
  render() {
    return (
      <DefaultInput
        placeholder="Place Name"
        value={this.state.placeName}
        onChangeText={this.placeNameChangeHandler}
      />
    );
  }
}

export default PlaceInput;
