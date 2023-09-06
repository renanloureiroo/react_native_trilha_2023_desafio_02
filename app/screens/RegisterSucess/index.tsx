import { useNavigation } from "@react-navigation/native";
import { Screen } from "../../components/Screen";
import { Text } from "../../components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RegisterStackParamList } from "../../navigator/RegisterStack";

export const RegisterSuccessScreen = () => {
  return (
    <Screen
      safeAreaEdges={["top", "bottom"]}
      alignItems="center"
      justifyContent="center"
    >
      <Text text="Continue assim!" color="primary-300" />
      <Text color="neutral-100" align="center">
        Você continua{" "}
        <Text color="neutral-100" text="dentro da dieta." weight="bold" /> Muito
        bem!
      </Text>
    </Screen>
  );
};
