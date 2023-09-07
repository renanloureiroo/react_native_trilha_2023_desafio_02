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
import { formatter } from "../../shared/utils/formatter";

type FormatTo = "date" | "time";

interface InputProps extends TextInputProps {
  label?: string;
  multilineHeight?: number;
  formatTo?: FormatTo;
}

const formatters: Record<FormatTo, (value: string) => string> = {
  date: formatter.toDate,
  time: formatter.toTime,
};

export const Input = forwardRef((props: InputProps, ref: Ref<TextInput>) => {
  const {
    autoFocus,
    label,
    multiline = false,
    multilineHeight = 120,
    formatTo,
    value,
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
          value={formatTo ? formatters[formatTo](value ?? "") : value}
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
