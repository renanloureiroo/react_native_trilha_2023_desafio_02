import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterScreen } from "../screens/Register";
import { useTheme } from "styled-components/native";
import { RegisterSuccessScreen } from "../screens/RegisterSucess";
import { RegisterShowScreen } from "../screens/RegisterShow";

export type RegisterStackParamList = {
  Register?: {
    index: number;
    date: string;
    hour: string;
    name: string;
    description: string;
    isPositive: boolean;
  };
  RegisterSuccess: {
    isDiet: boolean;
  };
  RegisterShow: {
    date: string;
    hour: string;
    name: string;
  };
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
      <Screen name="RegisterShow" component={RegisterShowScreen} />
    </Navigator>
  );
};
