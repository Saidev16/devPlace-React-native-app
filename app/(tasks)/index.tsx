import { useNavigation } from "expo-router";
import { Text } from "../components";
import { useEffect } from "react";

export default function create() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "New habit" });
  }, [navigation]);

  return <Text>tasks </Text>;
}
