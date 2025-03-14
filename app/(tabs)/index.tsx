import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "@/components/Themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";

import Buttons from "@/app/components/Buttons";
import Text from "@components/Text";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CheckBox from "expo-checkbox";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Task } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { TaskCard } from "../components/Cards";
import { languageContext } from "@/contexts/LanguageContext";

const DATA = [
  {
    id: 1,
    title: "First Item",
    startingTime: "02/01/2024 7:37:08 AM",
    isDone: false,
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
    color: "blue",
    icon: "run",
  },
  {
    id: 2,
    title: "Second Item",
    startingTime: "12/11/2024 10:37:08 AM",
    isDone: false,
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
    color: "green",
    icon: "youga",
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
  const dateNumber = new Date(date).getDate();

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
        {dateNumber}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const { date } = useLocalSearchParams();

  const initialDate = date ? new Date(date.toString()) : new Date();

  const [count, setCount] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Date>(initialDate);
  const [selected, setSelectedTask] = useState<number>(0);
  const [data, setData] = useState(DATA);
  const [session, setSession] = useState<Session | null>(null);
  const [days, setDays] = useState<Date[] | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  const { language } = useContext(languageContext);

  const fetchDaysAndScroll = () => {
    const daysButtons: Date[] = [];
    let step = 1;
    for (let i = -5; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      daysButtons.push(date);
      step++;
    }

    console.log(daysButtons);
    setDays(daysButtons);

    setTimeout(() => {
      if (
        scrollViewRef.current &&
        daysButtons?.length &&
        daysButtons?.length > 0
      ) {
        const middleIndex = daysButtons.findIndex((day) => {
          return new Date(day).toDateString() == selectedDay.toDateString();
        });

        scrollViewRef.current.scrollTo({
          x: middleIndex * 60,
          animated: false,
        });
      }
    }, 0);
  };

  const onDayChange = (date: Date) => {
    console.log("selected day", date);
    setSelectedDay(date);

    fetchTasks(date);

    //TODO : fetch data for the selected day and update the tasks board with the new data
  };
  useEffect(() => {
    if (date) {
      const newDate = new Date(date.toString());
      setSelectedDay(newDate);

      fetchTasks(newDate);
    }
  }, [date]);

  const fetchTasks = async (date: Date) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("date", date.toISOString().split("T")[0]);

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data);
  };

  const updateTask = async (id: number, isDone: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ isDone: !isDone })
      .eq("id", id);
    if (error) {
      Alert.alert(error.message);
      return;
    }

    console.log("update with success");
  };

  const handleTaskClick = (id: number) => {
    if (!tasks) return;

    setSelectedTask(id);

    let task = tasks.find((t) => {
      if (t.id == id) return t;
    });
    setTasks(() =>
      tasks.map((t) => {
        if (id == t.id) {
          task = t;
          return { ...t, isDone: !t.isDone };
        }
        return t;
      })
    );

    if (!task) return;
    updateTask(id, task.isDone);
  };

  const renderTask = ({ item }: { item: Task }) => {
    return (
      <View>
        <TaskCard
          item={item}
          handleTaskClick={handleTaskClick}
          hideCheckBox={false}
        />
      </View>
    );
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    fetchDaysAndScroll();
    onDayChange(selectedDay);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        handleAddPress={() =>
          router.push({
            pathname: "/(tasks)",
            params: {
              date: selectedDay.toString(),
            },
          })
        }
      />

      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
      >
        {days &&
          days.map((day: Date, index: number) => {
            return (
              <Day
                key={index}
                date={day.toISOString()}
                active={
                  day.toISOString().split("T")[0] ==
                  selectedDay.toISOString().split("T")[0]
                }
                onPress={() => onDayChange(day)}
                {...day}
              />
            );
          })}
      </ScrollView>

      <View
        style={{
          padding: 20,
          flex: 1,
          width: Dimensions.get("screen").width,
          backgroundColor: Colors.light.background,
          gap: 10,
        }}
      >
        <Text fontSize={22} fontWeight={500}>
          Today
        </Text>

        {tasks && tasks.length > 0 ? (
          <FlashList
            data={tasks}
            renderItem={renderTask}
            estimatedItemSize={200}
          />
        ) : (
          <Text>No Tasks for today</Text>
        )}
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
    gap: 5,
  },
  taskImgContainer: {
    backgroundColor: "red",
    borderRadius: 4,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    borderRadius: 100,
    padding: 10,
    fontSize: 10,
    width: 10,
    height: 10,
  },
});

export default HomeScreen;
