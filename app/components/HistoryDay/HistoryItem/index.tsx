import { FC } from "react";
import { Box } from "../../Box";

import * as Styled from "./styles";
import { Text } from "../../Text";

interface HistoryItemProps {
  hour: string;
  title: string;
  isPositive?: boolean;
}

export const HistoryItem: FC<HistoryItemProps> = (props) => {
  const { hour, title, isPositive = false } = props;
  return (
    <Styled.Root>
      <Text text={hour} />
      <Styled.Divider />

      <Styled.Title text={title} color="neutral-200" size="x-md" />

      <Styled.CategoryIndicator isPositive={isPositive} />
    </Styled.Root>
  );
};
