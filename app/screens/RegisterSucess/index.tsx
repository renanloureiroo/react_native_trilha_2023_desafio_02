import { useCallback } from "react";
import { Screen } from "../../components/Screen";
import { Text } from "../../components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/Button";
import { AppStackParamList } from "../../navigator/AppStack";
import { useNavigation } from "@react-navigation/native";

export const RegisterSuccessScreen = () => {
  const { replace } =
    useNavigation<
      NativeStackNavigationProp<AppStackParamList, "ResgisterStack">
    >();

  const handleNavigateToHome = useCallback(() => {
    replace("Home");
  }, []);
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

      <Button text="Ir para a página inicial" onPress={handleNavigateToHome} />
    </Screen>
  );
};
