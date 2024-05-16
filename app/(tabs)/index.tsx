import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/app/components/Buttons/Button";

const Header = (): React.ReactElement => {
  return <Text>fw</Text>;
};

const HomeScreen = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <View></View>
      <Text>hello world (index)</Text>
      <Button
        onPress={() => setCount((prevCount) => prevCount + 1)}
        width={200}
        height={35}
        justifyContent="center"
        align="center"
        color={"red"}
      >
        <Text>add </Text>
      </Button>

      {count > 0 && <Text>{count}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
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
});

export default HomeScreen;
