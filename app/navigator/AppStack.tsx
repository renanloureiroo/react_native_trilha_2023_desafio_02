import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";
import { useTheme } from "styled-components/native";

export type AppStackParamList = {
  Home: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors["neutral-900"],
        },
      }}
    >
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  );
};
