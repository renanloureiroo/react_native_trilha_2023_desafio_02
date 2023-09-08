import { useCallback } from "react";
import { Screen } from "../../components/Screen";
import { Text } from "../../components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/Button";
import { AppStackParamList } from "../../navigator/AppStack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as Styled from "./styles";
import { Box } from "../../components/Box";
import { RegisterStackParamList } from "../../navigator/RegisterStack";

const IlustrationYes = require("../../../assets/images/ilustration-yes.png");
const IlustrationNo = require("../../../assets/images/ilustration-no.png");

export const RegisterSuccessScreen = () => {
  const {
    params: { isDiet },
  } = useRoute<RouteProp<RegisterStackParamList, "RegisterSuccess">>();
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
      paddingHorizontal={24}
    >
      <Box gap={8} alignItems="center">
        <Text
          text={isDiet ? "Continue assim!" : "Que pena!"}
          color={isDiet ? "primary-300" : "secondary-300"}
          size="x-lg"
          weight="bold"
        />

        {isDiet ? (
          <Text color="neutral-100" align="center" size="x-md">
            Você continua{" "}
            <Text
              color="neutral-100"
              size="x-md"
              text="dentro da dieta."
              weight="bold"
            />{" "}
            Muito bem!
          </Text>
        ) : (
          <Text color="neutral-100" align="center" size="x-md">
            Você
            <Text
              color="neutral-100"
              size="x-md"
              text=" saiu da dieta"
              weight="bold"
            />{" "}
            dessa vez, mas continue se esforçando e não desista!
          </Text>
        )}
      </Box>

      <Styled.Illustration
        source={isDiet ? IlustrationYes : IlustrationNo}
        resizeMode="contain"
      />

      <Button text="Ir para a página inicial" onPress={handleNavigateToHome} />
    </Screen>
  );
};
