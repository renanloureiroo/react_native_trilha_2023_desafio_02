import { useEffect, useCallback, useState } from "react";

import * as Styled from "./styles";
import {
  Header,
  Button,
  HistoryDay,
  Banner,
  Screen,
  Box,
  Text,
} from "../../components";

import { useSafeArea } from "../../shared/hooks/useSafeArea";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { AppStackParamList } from "../../navigator/AppStack";
import { storage } from "../../shared/services/storage";
import { useRegistersContext } from "../../shared/hooks/useRegistersContext";
import { IGetRegisterDTO, Statistics } from "../../context/RegistersContext";

type Register = {
  date: string;
  name: string;
  description: string;
  hour: string;
  isPositive: boolean;
};

export const HomeScreen = () => {
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [statistics, setStatistics] = useState<Statistics>({
    negative: 0,
    positive: 0,
    percentageOfPositiveRegister: 0,
    percentageOfNegativeRegister: 0,
    total: 0,
  } as Statistics);
  const { bottom } = useSafeArea();

  const { registers, refreshRegisters, getStatistics } = useRegistersContext();

  const { push } =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Home">>();

  const handleNavigateForNewRegister = useCallback(() => {
    push("ResgisterStack", { screen: "Register" });
  }, []);

  const handleNavigateForRegisterShowScreen = useCallback(
    (data: IGetRegisterDTO) => {
      push("ResgisterStack", { screen: "RegisterShow", params: data });
    },
    []
  );

  const handleNavigateForStatisticsScreen = useCallback(() => {
    push("Statistics");
  }, []);

  const data = Object.keys(registers).map((date) => ({
    date,
    history: registers?.[date] ?? [],
  }));

  useFocusEffect(
    useCallback(() => {
      const statistics = getStatistics();
      setStatistics(statistics);
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
        {statistics.total > 0 && (
          <Banner
            isPositive={statistics.percentageOfPositiveRegister > 50}
            percentage={parseFloat(
              String(statistics.percentageOfPositiveRegister)
            )}
            onPressAction={handleNavigateForStatisticsScreen}
          />
        )}
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
          <HistoryDay
            date={item.date}
            history={item.history}
            onPress={handleNavigateForRegisterShowScreen}
          />
        )}
        ItemSeparatorComponent={() => <Box height={24} />}
        keyExtractor={(item) => item.date.replace(".", "")}
      />
    </Screen>
  );
};
