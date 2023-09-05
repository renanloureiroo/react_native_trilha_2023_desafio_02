import { useState } from "react";

import * as Styled from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Text } from "../../components/Text";
import { Box } from "../../components/Box";
import { Banner } from "../../components/Banner";
import { HistoryDay } from "../../components/HistoryDay";

export const HomeScreen = () => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <Screen paddingHorizontal={24}>
      <Header />
      <Banner isPositive percentage={90.86} />
      <Text text="Refeições" size="x-md" weight="bold" color="neutral-100" />
      <Button text="Nova refeição" icon="plus" fullWidth />

      <HistoryDay />
    </Screen>
  );
};
