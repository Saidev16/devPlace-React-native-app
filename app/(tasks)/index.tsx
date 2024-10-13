import { useNavigation } from "expo-router";
import { Text } from "../components";
import { useEffect } from "react";
import { TaskCard } from "../components/Cards";
import useFetchTasks from "@/hooks/useFetchTasks";
import { View } from "@/components/Themed";
import { Alert, Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native";

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.light.white,
    backgroundColor: "green",
    padding: 30,
    flex: 1,
    alignItems: "center",
  },
  cardsContainer: {
    flex: 1,
  },
});
