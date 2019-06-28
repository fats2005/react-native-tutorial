import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const placeList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={({ item }) => {
        return (
          <ListItem
            placeName={item.value + " " + item.key}
            onItemPressed={() => props.onItemDeleted(item.key)}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
