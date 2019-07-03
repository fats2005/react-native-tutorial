import React, { Component } from "react";
import { View, Button, Image, StyleSheet } from "react-native";

import imagePlaceholder from "../../assets/beautiful-place.jpg";

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.previewImage} source={imagePlaceholder} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert("Pick Image")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "80%"
  },
  button: {
    margin: 8
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "100%",
    height: 150
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default PickImage;
