import { router, useLocalSearchParams } from "expo-router";
import { Text } from "../components";
import Input from "../components/Inputs";
import { View } from "@/components/Themed";
import { Alert, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { useLayoutEffect, useState } from "react";
import Buttons from "../components/Buttons";
import { Task } from "@/types/types";
import { useCreateTask } from "@/hooks/useCreateTask";
import EmojiPicker from "rn-emoji-keyboard";
import Checkbox from "expo-checkbox";

const CreateTask = (): React.ReactElement => {
  const { icon, title } = useLocalSearchParams();
  const [taskColor, setTaskColor] = useState<string>("#fa1f1f");
  const [task, setTask] = useState<Task | undefined>();
  const [newIcon, setNewIcon] = useState("");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [saveAsCustomTask, setSaveAsCustomTask] = useState<boolean>(false);

  const { saveData, loading, saveCustomTask } = useCreateTask(true);

  const { date } = useLocalSearchParams();

  const onSelectColor = ({ hex }: { hex: string }) => {
    // do something with the selected color.
    setTaskColor(hex);
  };

  const validateFields = (fields: Task): string => {
    let error = "";
    console.log(fields);
    Object.keys(fields).forEach((key, index) => {
      const toValidate = key == "name" || key == "icon" || key == "color";
      console.log("to validate ,", toValidate);
      if (toValidate && fields[key] == "") {
        error = `the field ${key} cannot be empty `;
      }
    });

    return error;
  };
  const saveTaskHandler = async () => {
    const newTask = {
      date: new Date(date.toString()),
      name: task?.name == "" ? title : task?.name ?? "",
      isDone: false,
      starting_date: new Date(date.toString()),
      icon: icon ?? newIcon,
      color: taskColor,
    };

    const custom_task = {
      name: task?.name == "" ? title : task?.name ?? "",
      icon: icon ?? newIcon,
      color: taskColor,
    };

    const errMsg = validateFields(newTask);
    if (errMsg) {
      Alert.alert(errMsg);
      return;
    }
    // return;

    const error = await saveData(newTask);
    if (saveAsCustomTask) {
      await saveCustomTask(custom_task);
    }
    if (error) {
      Alert.alert(error);
      return;
    }

    Alert.alert("Task created successefully");
    router.push({ pathname: "/(tabs)", params: { date: date } });
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

  useLayoutEffect(() => {
    setTask((prevState) => {
      return { ...prevState, name: title };
    });
  }, [title]);
  {
    loading && <Text>Loading...</Text>;
  }
  return (
    <View style={styles.Container}>
      <View style={styles.formContainer}>
        <Text>What do you want to do ?</Text>
        <Input
          value={task?.name}
          placeholder="Name of habit"
          onChangeText={(value) => onFormChange("name", value)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 5,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Buttons.iconBtn
          width={"50%"}
          label="Color "
          onPress={() => setIsColorPickerOpen((prevstate) => !prevstate)}
        >
          <View
            style={{
              borderRadius: 50,
              width: 20,
              height: 20,
              backgroundColor: taskColor ?? "#fa1f1f",
            }}
          ></View>
        </Buttons.iconBtn>
        <Buttons.iconBtn
          width={"50%"}
          label="Icon"
          onPress={() => setIsPickerOpen(true)}
        >
          <Text style={{ fontSize: 20 }}>{newIcon != "" ? newIcon : icon}</Text>
        </Buttons.iconBtn>
      </View>

      <View>
        {isColorPickerOpen && (
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
        )}

        <EmojiPicker
          onEmojiSelected={(val) => setNewIcon(val.emoji)}
          open={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
        />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginTop: 10,
            marginBottom: 20,
          }}
          onPress={() => setSaveAsCustomTask((prevstate) => !prevstate)}
        >
          <Checkbox value={saveAsCustomTask} style={styles.checkbox} />
          <Text style={{ fontSize: 14 }}>
            Do you want to save this task as a custom task ?
          </Text>
        </TouchableOpacity>

        <Buttons.Primary label="Continue " onPress={handleSaveTask} />
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
  checkbox: {
    borderRadius: 100,
    padding: 8,
    fontSize: 10,
    width: 3,
    height: 3,
  },
});
export default CreateTask;
