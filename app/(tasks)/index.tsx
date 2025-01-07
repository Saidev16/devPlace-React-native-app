import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "../components";
import { useEffect, useState } from "react";
import { TaskCard } from "../components/Cards";
import useFetchTasks from "@/hooks/useFetchTasks";
import { View } from "@/components/Themed";
import { Alert, Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native";
import Buttons from "../components/Buttons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useCreateTask } from "@/hooks/useCreateTask";
import { Task } from "@/types/types";

export default function create() {
  const navigation = useNavigation();

  const { customTasks, isLoading, error } = useFetchTasks();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const { saveData, loading } = useCreateTask(true);
  const { date } = useLocalSearchParams();
  console.log("selectedDate ", date);
  const handleCreateTask = async () => {
    console.log("create task 1");
    if (!selectedTask) return;

    //Exclude the id from selectedTask
    const { id, ...rest } = selectedTask;

    // Adding the missing fields for a Task
    const formattedTask = {
      ...rest,
      date: new Date(date.toString()),
      isDone: false,
      starting_date: new Date(date.toString()),
      created_at: new Date(),
    };
    const error = await saveData(formattedTask);
    console.log("log error", error);
    if (error) {
      Alert.alert(error);
      return;
    }

    router.navigate("/(tabs)");
  };

  useEffect(() => {
    navigation.setOptions({ title: "New task", headerShadowVisible: false });
  }, [navigation]);

  if (isLoading) return <Text>Loading</Text>;

  if (error) {
    Alert.alert(error);
  }

  console.log("selectedTask", selectedTask);

  if (loading) return <Text>Loading ...</Text>;
  return (
    <View style={styles.container}>
      {/* <Picker data={data} onEmojiSelect={console.log} /> */}

      <ScrollView style={styles.cardsContainer}>
        {customTasks.map((t) => {
          return (
            <TaskCard
              item={t}
              handleTaskClick={() =>
                setSelectedTask((prevState) => {
                  if (prevState?.id == t.id) return null;
                  return t;
                })
              }
              hideCheckBox={true}
              selected={selectedTask?.id == t.id}
            />
          );
        })}
      </ScrollView>
      <View style={{ width: "100%", gap: 10 }}>
        <Buttons.Secondary
          onPress={() => router.replace("(tasks)/CreateTask")}
          label="Create custom task"
          width={"auto"}
        />

        <Buttons.Primary
          disabled={!!!selectedTask}
          onPress={() => {
            handleCreateTask();
          }}
          label="Continue"
          width={"100%"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    padding: 30,
    flex: 1,
    alignItems: "center",
  },
  cardsContainer: {
    flex: 1,
  },
});
