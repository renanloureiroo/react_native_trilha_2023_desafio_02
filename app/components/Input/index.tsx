import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TextInput, TextInputProps } from "react-native";
import * as Styled from "./styles";
import { useTheme } from "styled-components/native";

interface InputProps extends TextInputProps {
  label?: string;
  multilineHeight?: number;
}

export const Input = forwardRef((props: InputProps, ref: Ref<TextInput>) => {
  const {
    autoFocus,
    label,
    multiline = false,
    multilineHeight = 120,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const { colors } = useTheme();

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoFocus) {
      timeout = setTimeout(() => {
        handleFocus();
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [autoFocus]);

  useImperativeHandle(ref, () => inputRef.current!, [ref]);

  return (
    <Styled.Root onPress={handleFocus}>
      <Styled.Label text={label} weight="bold" size="md" color="neutral-200" />
      <Styled.Container
        isFocused={isFocused}
        multiline={multiline}
        multilineHeight={multilineHeight}
      >
        <Styled.InputField
          ref={inputRef}
          {...rest}
          selectionColor={colors["neutral-100"]}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          multiline={multiline}
        />
      </Styled.Container>
    </Styled.Root>
  );
});
