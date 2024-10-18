import { useLocalSearchParams } from "expo-router";
import { Text } from "../components";

const CreateTask = (): React.ReactElement => {
  const { icon, title } = useLocalSearchParams();

  console.log("icon", icon);
  console.log("title", title);
  return <Text>Create Task</Text>;
};

export default CreateTask;
