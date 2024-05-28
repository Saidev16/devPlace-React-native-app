import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

import Buttons from "@/app/components/Buttons";
import Text from "@components/Text";

const Header = (): React.ReactElement => {
  return <Text size={10}>fw</Text>;
};

const HomeScreen = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Header />

      <Buttons.Primary>
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
      <Text>hello world (index) </Text>

      {count > 0 && <Text>{count}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 100,
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
});

export default HomeScreen;
