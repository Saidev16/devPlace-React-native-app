import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React from "react";

const Header = (): React.ReactElement => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.imageContainer}>
        <Text>fw</Text>
      </View>
    </View>
  );
};

const TabOneScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftHeader}></View>
      <View></View>
      <Text>hello world (index)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  headerContainer: {},

  leftHeader: {},

  imageContainer: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
  },
});

export default TabOneScreen;
