import React, { Component } from "react";

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";
import { deletePlace } from "../../store/actions";

class PlaceDetail extends Component {
  state = {
    viewMode: Dimensions.get("window").width < 500 ? "portrait" : "landscape"
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.width < 500 ? "portrait" : "landscape"
    });
  };

  placeDeleteHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };
  render() {
    const { viewMode } = this.state;

    const location = {
      ...this.props.selectedPlace.location,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    };

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          <TouchableOpacity onPress={this.placeDeleteHandler}>
            <View style={styles.deleteButton}>
              <Icon
                size={30}
                name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                color="red"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={
            viewMode === "portrait"
              ? styles.ptInfoContainer
              : styles.lsInfoContainer
          }
        >
          <View>
            <Image
              source={this.props.selectedPlace.image}
              style={
                viewMode === "portrait"
                  ? styles.ptPlaceImage
                  : styles.lsPlaceImage
              }
            />
          </View>
          <View>
            <MapView
              style={viewMode === "portrait" ? styles.ptMap : styles.lsMap}
              initialRegion={location}
            >
              <MapView.Marker coordinate={location} />
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { margin: 22 },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between"
  },

  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  ptInfoContainer: {
    flexDirection: "column"
  },
  lsInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ptPlaceImage: {
    width: "100%",
    height: 200,
    marginBottom: 10
  },
  lsPlaceImage: {
    width: "45%",
    height: 200,
    marginBottom: 10
  },
  ptMap: {
    width: "100%",
    height: 250
  },
  lsMap: {
    width: "45%",
    height: 200
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
