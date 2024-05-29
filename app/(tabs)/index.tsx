import { Alert, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

import Buttons from "@/app/components/Buttons";
import Text from "@components/Text";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = ({
  handleAddPress,
}: {
  handleAddPress: () => void;
}): React.ReactElement => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text size={26} fontWeight="500">
          Hello, Said
        </Text>
        <Text size={15} fontWeight="300">
          May this day be good for you!
        </Text>
      </View>

      <View style={styles.header}>
        <Buttons.Primary width={42} height={42} onPress={handleAddPress}>
          <AntDesign name="plus" size={20} color={Colors.light.background} />
        </Buttons.Primary>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const [count, setCount] = useState(0);

  const handleAddPress = () => {
    Alert.alert("add pressed");
  };

  return (
    <View style={styles.container}>
      <Header handleAddPress={handleAddPress} />

      {/* <Buttons.Primary>
        <Text style={{ color: Colors.light.white, fontWeight: "500" }}>
          Hello button
        </Text>
      </Buttons.Primary>

      <Buttons.Secondary>
        <Text style={{ color: Colors.light.purple, fontWeight: "500" }}>
          Hello button
        </Text>
      </Buttons.Secondary>

      <View></View>
      <Text>hello world (index) </Text> */}

      {count > 0 && <Text>{count}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 70,
    gap: 50,
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
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

  header: {
    justifyContent: "center",
    backgroundColor: Colors.light.background,

    padding: 20,
    gap: 7,
  },
  headerContainer: {
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
  },
});

export default HomeScreen;
