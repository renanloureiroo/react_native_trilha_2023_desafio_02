import { FC } from "react";
import { Avatar } from "../Avatar";
import { Box } from "../Box";
import { Icon } from "../Icon";
import * as Styled from "./styles";
import { Text } from "../Text";

interface HeaderProps {
  variant?: "default" | "home";
  title?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  const { variant = "default", title } = props;
  if (variant === "home") {
    return (
      <Styled.Root variant={variant}>
        <Icon name="logo" width={82} height={37} />
        <Avatar url="https://www.github.com/renanloureiroo.png" />
      </Styled.Root>
    );
  }

  return (
    <Styled.Root variant={variant}>
      <Box position="absolute" left={0} zIndex={1}>
        <Icon
          name="arrow-left"
          color="neutral-100"
          size={24}
          onPressAction={() => console.log("Back")}
        />
      </Box>
      <Text text={title} color="neutral-100" size="lg" weight="bold" />
    </Styled.Root>
  );
};
