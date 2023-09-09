import { FC, ReactElement, useRef } from "react";
import { Modal } from "react-native";
import { Box } from "../Box";
import { Button, ButtonProps } from "../Button";
import { Text } from "../Text";

interface DialogProps {
  open: boolean;
  text: string;
  buttons?: ButtonProps[];
}

export const Dialog: FC<DialogProps> = (props) => {
  const { open, text, buttons } = props;
  return (
    <Modal visible={open} statusBarTranslucent animationType="fade" transparent>
      <Box
        flex={1}
        padding={24}
        bg="overlay"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          bg="neutral-900"
          padding={24}
          borderRadius={8}
          gap={24}
          paddingTop={32}
        >
          <Text text={text} size="lg" weight="bold" align="center" />

          <Box flexDirection="row" alignItems="center" gap={8}>
            {buttons?.map((button, index) => (
              <Box key={index} flex={1}>
                <Button {...button} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
