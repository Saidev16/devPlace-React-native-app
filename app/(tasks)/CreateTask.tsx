import { useLocalSearchParams } from "expo-router";
import { Text } from "../components";
import Input from "../components/Inputs";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";

const CreateTask = (): React.ReactElement => {
  const { icon, title } = useLocalSearchParams();

  console.log("icon", icon);
  console.log("title", title);

  const onSelectColor = ({ hex }: { hex: string }) => {
    // do something with the selected color.
    console.log(hex);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.formContainer}>
        <Text>What do you want to do ?</Text>
        <Input placeholder="Name of habit" />
      </View>

      <View>
        <ColorPicker
          style={{ width: "70%" }}
          value="red"
          onComplete={onSelectColor}
        >
          <Panel1 />
          <HueSlider />
        </ColorPicker>
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
  formContainer: {},
});
export default CreateTask;
