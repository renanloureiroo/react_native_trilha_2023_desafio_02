import { PressableProps } from "react-native";
import * as Styled from "./styles";
import { FC } from "react";
import { Icon, Icons } from "../Icon";

export interface ButtonProps extends PressableProps {
  text: string;
  icon?: Icons;
  variant?: "fill" | "outline";
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const { text, icon, variant = "fill", fullWidth = false, ...rest } = props;
  return (
    <Styled.Root
      fullWidth={fullWidth}
      android_ripple={{
        color: variant === "fill" ? "rbga(255,255,255,0.5)" : "rbga(0,0,0,0.2)",
        foreground: true,
      }}
      {...rest}
    >
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
