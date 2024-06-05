import { Alert, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "@/components/Themed";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

import Buttons from "@/app/components/Buttons";
import Text from "@components/Text";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native";

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
  onPress: (id: number) => void;
}) => {
  const day = new Date(date).toLocaleString("en-us", { weekday: "long" });

  return (
    <TouchableOpacity
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

  const onDayChange = (id: number) => {
    setSelectedDay(id.toString());
    //TODO : fetch data for the selected day and update the tasks board with the new data
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
            onPress={onDayChange}
            {...day}
          />
        ))}
      </ScrollView>

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
});

export default HomeScreen;
