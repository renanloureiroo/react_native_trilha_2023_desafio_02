import { useReducer, useState, useCallback } from "react";
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
import { storage } from "../../shared/services/storage";
import { Keyboard } from "react-native";

type StateType = {
  name: string;
  description: string;
  date: string;
  hour: string;
  isDiet: boolean | null;
};

type ActionType =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_HOUR"; payload: string }
  | { type: "SET_IS_DIET"; payload: boolean };

const reducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_NAME":
      return {
        ...state,
        name: payload,
      };

    case "SET_DESCRIPTION":
      return {
        ...state,
        description: payload,
      };

    case "SET_DATE":
      return {
        ...state,
        date: payload,
      };

    case "SET_HOUR":
      return {
        ...state,
        hour: payload,
      };

    case "SET_IS_DIET":
      return {
        ...state,
        isDiet: payload,
      };

    default:
      return state;
  }
};

export const RegisterScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    description: "",
    date: "",
    hour: "",
    isDiet: null,
  });
  const { bottom, top } = useSafeArea();

  const { replace } =
    useNavigation<
      NativeStackNavigationProp<RegisterStackParamList, "Register">
    >();

  const navigateToSuccessScreen = () => {
    replace("RegisterSuccess");
  };

  const handleIsDiet = useCallback((value: boolean) => {
    dispatch({
      type: "SET_IS_DIET",
      payload: value,
    });
  }, []);

  const handleCreateRegister = useCallback(async () => {
    Keyboard.dismiss();
    const { name, description, date, hour, isDiet } = state;
    const data = {
      name,
      description,
      date,
      hour,
      isDiet,
    };
    let registers = await storage.get("@diet:registers");
    registers = registers ?? [];
    await storage.save("@diet:registers", [...registers, data]);
    navigateToSuccessScreen();
  }, [state]);
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
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        paddingHorizontal={24}
        paddingTop={32}
        top={-20}
      >
        <Box marginBottom={24}>
          <Input
            label="Nome"
            value={state?.name}
            onChangeText={(text) =>
              dispatch({
                type: "SET_NAME",
                payload: text,
              })
            }
          />
        </Box>
        <Box marginBottom={24}>
          <Input
            label="Descrição"
            multiline
            value={state?.description}
            onChangeText={(text) =>
              dispatch({
                type: "SET_DESCRIPTION",
                payload: text,
              })
            }
          />
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap={16}
        >
          <Box flex={1}>
            <Input
              label="Data"
              formatTo="date"
              keyboardType="numeric"
              maxLength={10}
              value={state?.date}
              onChangeText={(text) =>
                dispatch({
                  type: "SET_DATE",
                  payload: text,
                })
              }
            />
          </Box>

          <Box flex={1}>
            <Input
              label="Hora"
              maxLength={5}
              formatTo="time"
              keyboardType="numeric"
              value={state?.hour}
              onChangeText={(text) =>
                dispatch({
                  type: "SET_HOUR",
                  payload: text,
                })
              }
            />
          </Box>
        </Box>
        <Box marginTop={24} gap={4}>
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
              selected={state?.isDiet === true}
              option={{
                id: "sim",
                label: "Sim",
                value: "sim",
              }}
              onPress={() => handleIsDiet(true)}
            />
            <Select
              type="secondary"
              selected={state?.isDiet === false}
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
      <Box bg="neutral-900" paddingHorizontal={24} paddingBottom={bottom + 16}>
        <Button
          text="Cadastrar refeição"
          fullWidth
          onPress={handleCreateRegister}
        />
      </Box>
    </Screen>
  );
};
