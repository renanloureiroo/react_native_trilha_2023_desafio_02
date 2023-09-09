import { Box } from "../Box";
import { Icon } from "../Icon";
import { Text } from "../Text";

import * as Styled from "./styles";

interface BannerProps {
  isPositive?: boolean;
  percentage: number;
  onPressAction?: () => void;
}

export const Banner = (props: BannerProps) => {
  const { isPositive = false, percentage, onPressAction } = props;
  return (
    <Styled.Root isPositive={isPositive}>
      <Styled.IconWrapper>
        <Icon
          name="arrow-up-right"
          color={isPositive ? "primary-300" : "secondary-300"}
          androidRippleColor={isPositive ? "primary-300" : "secondary-300"}
          onPressAction={onPressAction}
        />
      </Styled.IconWrapper>

      <Styled.Content>
        <Text color="neutral-100" size="2x-large" weight="bold">
          {percentage.toString().replace(".", ",")}%
        </Text>
        <Text
          text="das refeições dentro da dieta"
          size="md"
          color="neutral-200"
        />
      </Styled.Content>
    </Styled.Root>
  );
};
