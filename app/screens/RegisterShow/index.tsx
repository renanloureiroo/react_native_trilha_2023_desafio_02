import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Box,
  Button,
  Dialog,
  RegisterScreenComponent,
  Screen,
  Text,
} from "../../components";
import { useRegistersContext } from "../../shared/hooks/useRegistersContext";
import type { RegisterStackParamList } from "../../navigator/RegisterStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { AppStackParamList } from "../../navigator/AppStack";
import { Register, RegisterWithIndex } from "../../context/RegistersContext";

export const RegisterShowScreen = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [register, setRegister] = useState<RegisterWithIndex>(
    {} as RegisterWithIndex
  );
  const {
    params: { date, hour, name },
  } = useRoute<RouteProp<RegisterStackParamList, "RegisterShow">>();
  const { push } =
    useNavigation<
      NativeStackNavigationProp<RegisterStackParamList, "RegisterShow">
    >();
  const { reset } =
    useNavigation<
      NativeStackNavigationProp<AppStackParamList, "ResgisterStack">
    >();
  const { getRegister, deleteRegister } = useRegistersContext();

  useEffect(() => {
    const values = getRegister({
      date,
      hour,
      name,
    });
    setRegister(values!);
  }, []);

  const handleEditRegister = () => {
    push("Register", {
      index: register.index,
      date: register.register.date,
      hour: register.register.hour,
      name: register.register.name,
      description: register.register.description,
      isPositive: register.register.isPositive,
    });
  };

  const handleDeleteRegister = () => {
    setIsOpen(true);
  };

  const handleGoBack = () => {
    reset({
      index: 0,
      routes: [{ name: "Home" }],
      history: [],
      type: "stack",
    });
  };
  return (
    <RegisterScreenComponent
      onPressLeftAction={handleGoBack}
      headerTitle="Refeição"
      headerColor={
        register.register?.isPositive ? "primary-200" : "secondary-200"
      }
      footer={
        <Box paddingHorizontal={24} gap={8}>
          <Button text="Editar refeição" onPress={handleEditRegister} />
          <Button
            variant="outline"
            text="Excluir refeição"
            onPress={handleDeleteRegister}
          />
        </Box>
      }
    >
      <Box alignItems="flex-start">
        <Box gap={4} marginBottom={16}>
          <Text
            text={register.register?.name}
            weight="bold"
            size="x-lg"
            color="neutral-100"
          />
          <Text
            text={register.register?.description}
            color="neutral-200"
            size="x-md"
          />
        </Box>

        <Box marginBottom={24}>
          <Text
            text={"Data e hora"}
            weight="bold"
            size="md"
            color="neutral-100"
          />
          <Text color="neutral-100" size="md">
            {register.register?.date} às {register.register?.hour}
          </Text>
        </Box>

        <Box
          flexDirection="row"
          gap={8}
          justifyContent="flex-start"
          alignItems="center"
          height={34}
          borderRadius={9999}
          bg="neutral-600"
          paddingHorizontal={16}
        >
          <Box
            width={12}
            height={12}
            borderRadius={9999}
            bg={register.register?.isPositive ? "primary-300" : "secondary-300"}
          />

          <Text
            size="md"
            text={
              register.register?.isPositive
                ? "dentro da dieta"
                : "fora da dieta"
            }
          />
        </Box>
      </Box>
      <Dialog
        open={isOpen}
        text="Deseja realmente excluir o registro da refeição?"
        buttons={[
          {
            text: "Cancelar",
            onPress: () => setIsOpen(false),
            variant: "outline",
          },
          {
            text: "Excluir",
            onPress: async () => {
              await deleteRegister({
                date: register.register!.date,
                hour: register.register!.hour,
                name: register.register!.name,
              });

              reset({
                index: 0,
                routes: [{ name: "Home" }],
                history: [],
                type: "stack",
              });
            },
          },
        ]}
      />
    </RegisterScreenComponent>
  );
};
