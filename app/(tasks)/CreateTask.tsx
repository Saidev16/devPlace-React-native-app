import { router, useLocalSearchParams } from "expo-router";
import { Text } from "../components";
import Input from "../components/Inputs";
import { View } from "@/components/Themed";
import { Alert, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { useState } from "react";
import Buttons from "../components/Buttons";
import { Task } from "@/types/types";
import { useCreateTask } from "@/hooks/useCreateTask";

const CreateTask = (): React.ReactElement => {
  const { icon, title } = useLocalSearchParams();
  const [taskColor, setTaskColor] = useState<string>("");
  const [task, setTask] = useState<Task | undefined>();
  const [newIcon, setNewIcon] = useState("");

  const { saveData, loading } = useCreateTask(true);

  console.log("icon", icon);
  console.log("title", title);

  const onSelectColor = ({ hex }: { hex: string }) => {
    // do something with the selected color.
    setTaskColor(hex);
  };

  const saveTaskHandler = async () => {
    const newTask = {
      date: new Date(),
      name: title ?? task?.name,
      isDone: false,
      starting_date: new Date(),
      icon: icon ?? newIcon,
      color: taskColor,
    };

    // return;

    const error = await saveData(newTask);
    if (error) {
      Alert.alert(error);
      return;
    }

    Alert.alert("Task created successefully");
    router.replace("/(tabs)");
  };

  const handleSaveTask = async () => {
    await saveTaskHandler();
  };

  const onFormChange = (key: string, value: string | number) => {
    setTask((prevTask) => {
      console.log("final task value ", { ...prevTask, [key]: value });
      return { ...prevTask, [key]: value };
    });
  };

  {
    loading && <Text>Loading...</Text>;
  }
  return (
    <View style={styles.Container}>
      <View style={styles.formContainer}>
        <Text>What do you want to do ?</Text>
        <Input
          placeholder="Name of habit"
          onChangeText={(value) => onFormChange("name", value)}
        />
      </View>

      <View>
        <View style={styles.colorPickerContainer}>
          <ColorPicker
            thumbShape="circle"
            style={{ width: "70%" }}
            value="red"
            onComplete={onSelectColor}
          >
            <Panel1 style={{ marginBottom: 7 }} />
            <HueSlider />
          </ColorPicker>
        </View>

        <Buttons.Primary label="Create task " onPress={handleSaveTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.light.white,
    flex: 1,
    padding: 20,
  },
  colorPickerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  formContainer: {},
});
export default CreateTask;
