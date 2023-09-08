import { FC } from "react";
import { Box } from "../Box";
import { Text } from "../Text";
import { HistoryItem } from "./HistoryItem";

export interface HistoryDayProps {
  date: string;
  history?: {
    hour: string;
    name: string;
    isPositive: boolean;
  }[];
}
export const HistoryDay: FC<HistoryDayProps> = (props) => {
  const { date, history = [] } = props;
  return (
    <Box>
      <Text text={date} color="neutral-100" weight="bold" size="lg" />

      <Box gap={8} flexDirection="column-reverse" marginTop={8}>
        {history.map((item, index) => (
          <HistoryItem key={index} data={item} />
        ))}
      </Box>
    </Box>
  );
};
