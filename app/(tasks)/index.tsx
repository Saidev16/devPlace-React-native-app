import { Link, router, useNavigation } from "expo-router";
import { Text } from "../components";
import { useEffect } from "react";
import { TaskCard } from "../components/Cards";
import useFetchTasks from "@/hooks/useFetchTasks";
import { View } from "@/components/Themed";
import { Alert, Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native";
import Buttons from "../components/Buttons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function create() {
  const navigation = useNavigation();

  const { customTasks, isLoading, error } = useFetchTasks();

  useEffect(() => {
    navigation.setOptions({ title: "New task", headerShadowVisible: false });
  }, [navigation]);

  if (isLoading) return <Text>Loading</Text>;

  if (error) {
    Alert.alert(error);
  }
  return (
    <View style={styles.container}>
      {/* <Picker data={data} onEmojiSelect={console.log} /> */}

      <ScrollView style={styles.cardsContainer}>
        {customTasks.map((t) => {
          return (
            <TaskCard
              item={t}
              handleTaskClick={() => console.log("clicked")}
              hideCheckBox={true}
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

        <Link
          href={{
            pathname: "(tasks)/CreateTask",
            params: { icon: "icon1", title: "title 1" },
          }}
        >
          <Buttons.Primary
            onPress={() => {
              router.push({
                pathname: "(tasks)/CreateTask",
                params: { icon: "icon1", title: "title 1" },
              });
            }}
            label="Continue"
            width={"100%"}
          />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    // backgroundColor: "green",
    padding: 30,
    flex: 1,
    alignItems: "center",
  },
  cardsContainer: {
    flex: 1,
  },
});
