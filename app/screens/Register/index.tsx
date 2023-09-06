import { useState } from "react";
import { Box } from "../../components/Box";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Screen } from "../../components/Screen";
import { Select } from "../../components/Select";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { useSafeArea } from "../../shared/hooks/useSafeArea";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RegisterStackParamList } from "../../navigator/RegisterStack";

export const RegisterScreen = () => {
  const [isDiet, setIsDiet] = useState<boolean | null>(null);
  const { bottom, top } = useSafeArea();

  const { replace } =
    useNavigation<
      NativeStackNavigationProp<RegisterStackParamList, "Register">
    >();

  const handleNavigate = () => {
    replace("RegisterSuccess");
  };

  const handleIsDiet = (value: boolean) => {
    console.log(value);
    setIsDiet(value);
  };
  return (
    <Screen safeAreaEdges={["bottom"]} backgroundColor="neutral-900">
      <Box
        paddingHorizontal={24}
        paddingBottom={34}
        paddingTop={top}
        bg="neutral-500"
      >
        <Header title="Nova refeição" />
      </Box>
      <Box
        scroll
        flex={1}
        bg="neutral-900"
        borderTopEndRadius={20}
        borderTopStartRadius={20}
        paddingHorizontal={24}
        paddingTop={32}
        top={-20}
      >
        <Box marginBottom={24}>
          <Input label="Nome" />
        </Box>
        <Box marginBottom={24}>
          <Input label="Descrição" multiline />
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap={16}
        >
          <Box flex={1}>
            <Input label="Data" />
          </Box>

          <Box flex={1}>
            <Input label="Hora" />
          </Box>
        </Box>
        <Box marginTop={24}>
          <Text text="Está dentro da dieta?" />
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={16}
            marginBottom={40}
          >
            <Select
              type="primary"
              selected={isDiet === true}
              option={{
                id: "sim",
                label: "Sim",
                value: "sim",
              }}
              onPress={() => handleIsDiet(true)}
            />
            <Select
              type="secondary"
              selected={isDiet === false}
              option={{
                id: "nao",
                label: "Não",
                value: "nao",
              }}
              onPress={() => handleIsDiet(false)}
            />
          </Box>
        </Box>
      </Box>
      <Box paddingHorizontal={24}>
        <Button text="Cadastrar refeição" fullWidth onPress={handleNavigate} />
      </Box>
    </Screen>
  );
};
