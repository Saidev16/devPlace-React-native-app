import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";
import Colors from "@/constants/Colors";
import { color } from "react-native-elements/dist/helpers";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectedPeriodType } from "@/types/types";
import { useFetchAnalytics } from "@/hooks/useFetchAnalytics";

export const ChartStatus = ({
  pourcentage,
}: {
  pourcentage: number;
}): React.ReactElement => {
  return (
    <View style={{ position: "absolute", top: 22, left: 15, zIndex: 99 }}>
      <Text style={{ fontSize: 15 }}>Total Activities</Text>
      <Text style={{ fontSize: 26, fontWeight: 600 }}>{pourcentage}%</Text>
    </View>
  );
};

const ProgressScreen = (): React.ReactElement => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<selectedPeriodType>("weekly");

  // const [chartData, setChartData] = useState();

  const {
    data: chartData,
    loading,
    errorMsg,
  } = useFetchAnalytics(selectedPeriod);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.light.white,
        flex: 1,
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.light.lightGrey,
          // marginHorizontal: 30,
          // right: 80,
          paddingTop: 90,
          paddingLeft: 10,
          borderRadius: 10,
          paddingBottom: 20,
        }}
      >
        <ChartStatus pourcentage={20} />
        <BarChart
          maxValue={chartData.maxValue}
          adjustToWidth={true}
          // width={Dimensions.get("screen").width * 0.8}
          parentWidth={Dimensions.get("screen").width * 0.8}
          height={Dimensions.get("screen").height * 0.27}
          xAxisLength={0.1}
          yAxisThickness={0.1}
          showXAxisIndices={false}
          data={chartData.data}
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
          animationDuration={200}
          noOfSections={5}
          xAxisLabelTexts={chartData.data.map((data) => data.label)}
          xAxisColor={"red"}
          xAxisLabelTextStyle={{ color: Colors.light.gray }}
          yAxisIndicesColor={"red"}
          yAxisTextStyle={{ color: Colors.light.gray }}
        />
      </View>
    </View>
  );
};

export default ProgressScreen;
