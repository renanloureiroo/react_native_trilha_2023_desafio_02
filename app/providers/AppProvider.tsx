import { FC, ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../shared/theme";
import { RegistersProvider } from "../context/RegistersContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProviderProps> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <RegistersProvider>{children}</RegistersProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
