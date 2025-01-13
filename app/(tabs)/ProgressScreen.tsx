import { View, Text } from "react-native";
import React from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";
import Colors from "@/constants/Colors";

const ProgressScreen = () => {
  const data = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
  ];

  return (
    <View style={{ backgroundColor: Colors.light.white, flex: 1 }}>
      <Text>articles</Text>
      <BarChart
        xAxisLength={0.1}
        yAxisThickness={0.1}
        showXAxisIndices={false}
        data={data}
        rulesType={"solid"}
        rulesColor={Colors.light.lightGrey}
        backgroundColor={Colors.light.lightGrey}
        barBorderColor={Colors.light.lightGrey}
        // barBorderWidth={100}
        capRadius={20}
        barBorderTopLeftRadius={20}
        barBorderTopRightRadius={20}
        barBorderBottomLeftRadius={20}
        barBorderBottomRightRadius={20}
        frontColor={Colors.light.purple}
        isAnimated={true}
        animationDuration={800}
      />
    </View>
  );
};

export default ProgressScreen;
