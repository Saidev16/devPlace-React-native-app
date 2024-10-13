import { View } from "@/components/Themed";
import { Image } from "react-native-elements";
import Text from "../Text";
import { Task } from "@/types/types";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import Checkbox from "expo-checkbox";

const TaskCard = ({
  item,
  handleTaskClick,
  hideCheckBox,
}: {
  item: Task;
  handleTaskClick: (id: number) => void;
  hideCheckBox: boolean;
}): React.ReactElement => {
  return (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => handleTaskClick(item.id)}
    >
      <View style={[styles.taskImgContainer, { backgroundColor: item.color }]}>
        <Image
          width={25}
          height={25}
          source={{
            uri: item.icon,
          }}
        />
      </View>

      <View style={styles.taskCardMiddle}>
        <Text fontWeight={400} fontSize={15}>
          {item.name}
        </Text>

        {item.starting_date && (
          <Text color={Colors.light.gray} fontWeight={400} fontSize={15}>
            {item.starting_date.toString()}
          </Text>
        )}
      </View>

      {!hideCheckBox && (
        <View style={{ backgroundColor: "transparent" }}>
          <Checkbox
            style={styles.checkbox}
            disabled={false}
            value={item.isDone}
            onValueChange={() => {
              handleTaskClick(item.id);
            }}
            color={true ? Colors.light.purple : undefined}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

  checkbox: {
    borderRadius: 100,
    padding: 10,
    fontSize: 10,
    width: 10,
    height: 10,
  },

  taskImgContainer: {
    backgroundColor: "red",
    borderRadius: 4,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskCard;
