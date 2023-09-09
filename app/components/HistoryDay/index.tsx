import { FC } from "react";
import { Box } from "../Box";
import { Text } from "../Text";
import { HistoryItem } from "./HistoryItem";
import { IGetRegisterDTO } from "../../context/RegistersContext";

export interface HistoryDayProps {
  date: string;
  history?: {
    hour: string;
    name: string;
    isPositive: boolean;
  }[];
  onPress: (data: IGetRegisterDTO) => void;
}
export const HistoryDay: FC<HistoryDayProps> = (props) => {
  const { date, history = [], onPress } = props;

  return (
    <Box>
      <Text text={date} color="neutral-100" weight="bold" size="lg" />

      <Box gap={8} flexDirection="column-reverse" marginTop={8}>
        {history &&
          history.map((item, index) => (
            <HistoryItem
              key={index}
              data={item}
              onPress={() =>
                onPress({
                  date: date,
                  hour: item.hour,
                  name: item.name,
                })
              }
            />
          ))}
      </Box>
    </Box>
  );
};
