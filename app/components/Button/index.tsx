import { PressableProps } from "react-native";
import * as Styled from "./styles";
import { FC } from "react";
import { Icon, Icons } from "../Icon";
import { Text } from "../Text";
import { Box } from "../Box";

interface ButtonProps extends PressableProps {
  text: string;
  icon?: Icons;
  variant?: "fill" | "outline";
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const { text, icon, variant = "fill", fullWidth = false } = props;
  return (
    <Styled.Root fullWidth={fullWidth}>
      {({ pressed }) => (
        <Styled.Container
          pressed={pressed}
          variant={variant}
          fullWidth={fullWidth}
        >
          {!!icon && (
            <Icon
              name={icon}
              size={18}
              color={variant === "fill" ? "neutral-900" : "neutral-100"}
            />
          )}

          <Styled.Label text={text} size="md" variant={variant} weight="bold" />
        </Styled.Container>
      )}
    </Styled.Root>
  );
};
