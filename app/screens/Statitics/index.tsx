import { useNavigation } from "@react-navigation/native";
import { Box, Icon, Screen, Text } from "../../components";
import { useRegistersContext } from "../../shared/hooks/useRegistersContext";
import { useSafeArea } from "../../shared/hooks/useSafeArea";
import * as Styled from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../navigator/AppStack";

export const StatisticsScreen = () => {
  const { top } = useSafeArea();
  const { getStatistics } = useRegistersContext();
  const { goBack } =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Statistics">>();
  const { negative, percentageOfPositiveRegister, positive, total } =
    getStatistics();

  const handleGoBack = () => {
    goBack();
  };
  return (
    <Screen safeAreaEdges={["bottom"]} bg="neutral-900">
      <Box
        flexDirection="row"
        height={200}
        paddingTop={top + 16}
        paddingHorizontal={24}
        bg={percentageOfPositiveRegister > 50 ? "primary-200" : "secondary-200"}
        position="relative"
      >
        <Box position="absolute" top={top + 16} left={24} zIndex={1}>
          <Icon
            name="arrow-left"
            size={24}
            color={
              percentageOfPositiveRegister > 50
                ? "primary-300"
                : "secondary-300"
            }
            onPressAction={handleGoBack}
          />
        </Box>

        <Box flex={1} alignItems="center" justifyContent="center">
          <Text
            weight="bold"
            size="2x-large"
            text={parseFloat(String(percentageOfPositiveRegister)) + "%"}
          />
          <Text
            size="md"
            text="das refeições dentro da dieta"
            color="neutral-200"
          />
        </Box>
      </Box>

      <Box
        bg="neutral-900"
        flex={1}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        top={-20}
        gap={8}
        paddingTop={32}
        paddingHorizontal={24}
      >
        <Text
          align="center"
          text="Estatísticas gerais"
          weight="bold"
          size="md"
        />
        <Styled.Card bg="neutral-600" marginTop={24}>
          <Styled.Title text={String(total)} />
          <Styled.Subtitle text="refeições registradas" />
        </Styled.Card>
        <Box flexDirection="row" gap={8}>
          <Styled.Card bg="primary-200" flex={1}>
            <Styled.Title text={String(positive)} />
            <Styled.Subtitle text="refeições dentro da dieta" />
          </Styled.Card>

          <Styled.Card bg="secondary-200" flex={1}>
            <Styled.Title text={String(negative)} />
            <Styled.Subtitle text="refeições fora da dieta" />
          </Styled.Card>
        </Box>
      </Box>
    </Screen>
  );
};
