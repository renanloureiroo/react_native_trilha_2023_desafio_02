import { Box } from "../Box";
import { Text } from "../Text";
import { HistoryItem } from "./HistoryItem";

interface HistoryDayProps {
  date: string;
}
export const HistoryDay = () => {
  return (
    <Box>
      <Text text="12.08.22" color="neutral-100" weight="bold" size="lg" />

      <HistoryItem hour="20:00" isPositive title="Whey protein com leite" />
      <HistoryItem hour="16:00" isPositive={false} title="X-tudo" />
    </Box>
  );
};
