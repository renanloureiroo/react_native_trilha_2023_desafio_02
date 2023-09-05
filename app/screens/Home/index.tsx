import { useState } from "react";

import * as Styled from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Text } from "../../components/Text";
import { Box } from "../../components/Box";
import { Banner } from "../../components/Banner";
import { HistoryDay } from "../../components/HistoryDay";
import { FlatList, View } from "react-native";

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
  const [selected, setSelected] = useState<boolean>(false);
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
        <Button text="Nova refeição" icon="plus" fullWidth />
      </Box>

      <Styled.List
        data={data}
        renderItem={({ item }) => (
          <HistoryDay date={item.date} history={item.history} />
        )}
        ItemSeparatorComponent={() => <Box height={24} />}
        keyExtractor={(item) => item.date.replace(".", "")}
      />
    </Screen>
  );
};
