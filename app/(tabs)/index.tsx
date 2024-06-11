import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "@/components/Themed";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

import Buttons from "@/app/components/Buttons";
import Text from "@components/Text";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { CheckBox } from "react-native-elements";

const DATA = [
  {
    title: "First Item",
    startingTime: "02/01/2024 7:37:08 AM",
    selected: true,
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
  },
  {
    title: "Second Item",
    startingTime: "12/11/2024 10:37:08 AM",
    selected: true,
    uri: "data:image/png;base64,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",
  },
];

const days = [
  {
    id: 1,
    date: "29-05-2022",
  },
  {
    id: 2,
    date: "30-05-2022",
  },
  {
    id: 3,
    date: "01-06-2022",
  },
  {
    id: 4,
    date: "02-06-2022",
  },
  {
    id: 5,
    date: "03-06-2022",
  },
  {
    id: 6,
    date: "04-06-2022",
  },
  {
    id: 7,
    date: "05-06-2022",
  },
];

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

const Day = ({
  date,
  active,
  onPress,
}: {
  date: string;
  active: boolean;
  onPress: () => void;
}) => {
  const day = new Date(date).toLocaleString("en-us", { weekday: "long" });

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.dayBox,
        {
          backgroundColor: active
            ? Colors.light.lightPurple
            : Colors.light.lightGrey,
          borderWidth: active ? 1.5 : 0,
        },
      ]}
    >
      <Text size={14} fontWeight="500">
        {day.substring(0, 3)}
      </Text>
      <Text size={15} fontWeight="500">
        {date.slice(0, 2)}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [count, setCount] = useState(0);
  const [selectedDay, setSelectedDay] = useState("1");

  const handleAddPress = () => {
    Alert.alert("add pressed");
  };

  const onDayChange = (id: string) => {
    console.log("selected day", id);
    setSelectedDay(id);

    //TODO : fetch data for the selected day and update the tasks board with the new data
  };

  const renderTask = ({ item }: { item: { title: string; uri: string } }) => {
    return (
      <View style={styles.taskCard}>
        <Image
          width={35}
          height={35}
          source={{
            uri: item.uri,
          }}
        />

        <View style={styles.taskCardMiddle}>
          <Text>{item.title}</Text>
          <Text>{item.title}</Text>
        </View>

        <CheckBox></CheckBox>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header handleAddPress={handleAddPress} />

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
      >
        {days.map((day) => (
          <Day
            key={day.id}
            active={day.id.toString() == selectedDay}
            onPress={() => onDayChange(day.id.toString())}
            {...day}
          />
        ))}
      </ScrollView>

      <View
        style={{
          padding: 20,
          flex: 1,
          width: Dimensions.get("screen").width,
          backgroundColor: Colors.light.background,
        }}
      >
        <FlashList
          data={DATA}
          renderItem={renderTask}
          estimatedItemSize={200}
        />
      </View>
      {count > 0 && <Text>{count}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 70,
    flex: 1,
    alignItems: "center",
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
  dayBox: {
    height: 60,
    width: 60,
    gap: 5,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    borderColor: Colors.light.purple,
  },
  day: {},

  daysContainer: {
    height: 200,
    maxHeight: 60,
    gap: 20,
    width: Dimensions.get("window").width,
    maxWidth: Dimensions.get("window").width,

    paddingHorizontal: 20,
    marginTop: 10,
  },
  taskCard: {
    height: 70,
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: Colors.light.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 5,
    backgroundColor: Colors.light.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskCardMiddle: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
