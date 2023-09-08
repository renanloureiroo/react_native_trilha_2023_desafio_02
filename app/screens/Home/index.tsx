import { useEffect, useCallback, useState } from "react";

import * as Styled from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Text } from "../../components/Text";
import { Box } from "../../components/Box";
import { Banner } from "../../components/Banner";
import { HistoryDay } from "../../components/HistoryDay";

import { useSafeArea } from "../../shared/hooks/useSafeArea";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { AppStackParamList } from "../../navigator/AppStack";
import { storage } from "../../shared/services/storage";
import { useRegistersContext } from "../../shared/hooks/useRegistersContext";

type Register = {
  date: string;
  name: string;
  description: string;
  hour: string;
  isPositive: boolean;
};

export const HomeScreen = () => {
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const { bottom } = useSafeArea();

  const { registers, refreshRegisters } = useRegistersContext();

  const { push } =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Home">>();

  const handleNavigateForNewRegister = useCallback(() => {
    push("ResgisterStack", { screen: "Register" });
  }, []);

  const data = Object.keys(registers).map((date) => ({
    date,
    history: registers[date],
  }));

  useFocusEffect(
    useCallback(() => {
      if (firstRender) {
        setFirstRender(false);
        return;
      }
      refreshRegisters();
    }, [firstRender])
  );

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
