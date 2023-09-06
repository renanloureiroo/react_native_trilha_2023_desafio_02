import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterScreen } from "../screens/Register";
import { useTheme } from "styled-components/native";
import { RegisterSuccessScreen } from "../screens/RegisterSucess";

export type RegisterStackParamList = {
  Register: undefined;
  RegisterSuccess: undefined;
};

const { Navigator, Screen } =
  createNativeStackNavigator<RegisterStackParamList>();

export const RegisterStack = () => {
  const { colors } = useTheme();

  return (
    <Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors["neutral-900"],
        },
      }}
    >
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="RegisterSuccess" component={RegisterSuccessScreen} />
    </Navigator>
  );
};
