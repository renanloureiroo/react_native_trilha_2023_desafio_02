import { useEffect, useCallback } from "react";

import * as Styled from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Text } from "../../components/Text";
import { Box } from "../../components/Box";
import { Banner } from "../../components/Banner";
import { HistoryDay } from "../../components/HistoryDay";
import { FlatList, View } from "react-native";
import { useSafeArea } from "../../shared/hooks/useSafeArea";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { AppStackParamList } from "../../navigator/AppStack";
import { storage } from "../../shared/services/storage";

const data: Styled.ItemProps[] = [
  {
    date: "12.08.22",
    history: [
      {
        hour: "12:00",
        title: "X-tudo",
        isPositive: false,
      },
      {
        hour: "15:00",
        title: "Iorgute",
        isPositive: true,
      },
      {
        hour: "16:00",
        title: "X-tudo",
        isPositive: false,
      },
      {
        hour: "20:00",
        title: "Iorgute",
        isPositive: true,
      },
    ],
  },
  {
    date: "13.08.22",
    history: [
      {
        hour: "12:00",
        title: "X-tudo",
        isPositive: false,
      },
      {
        hour: "15:00",
        title: "Iorgute",
        isPositive: true,
      },

      {
        hour: "16:00",
        title: "X-tudo",
        isPositive: false,
      },
      {
        hour: "20:00",
        title: "Iorgute",
        isPositive: true,
      },
    ],
  },
];

export const HomeScreen = () => {
  const { bottom } = useSafeArea();

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Home">>();

  const handleNavigateForNewRegister = useCallback(() => {
    navigate("ResgisterStack", { screen: "Register" });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const value = await storage.get("@diet:registers");
      console.log(value);
    };

    fetch();
  }, []);
  return (
    <Screen paddingHorizontal={24} justifyContent="flex-start">
      <Box marginTop={16} marginBottom={24}>
        <Header variant="home" />
      </Box>
      <Box marginBottom={32}>
        <Banner isPositive percentage={90.86} />
      </Box>
      <Box marginBottom={32} gap={4}>
        <Text text="Refeições" size="x-md" weight="bold" color="neutral-100" />
        <Button
          text="Nova refeição"
          icon="plus"
          fullWidth
          onPress={handleNavigateForNewRegister}
        />
      </Box>

      <Styled.List
        data={data}
        contentContainerStyle={{
          paddingBottom: bottom,
        }}
        renderItem={({ item }) => (
          <HistoryDay date={item.date} history={item.history} />
        )}
        ItemSeparatorComponent={() => <Box height={24} />}
        keyExtractor={(item) => item.date.replace(".", "")}
      />
    </Screen>
  );
};
