import { useReducer, useCallback, useState, useEffect } from "react";

import { useSafeArea } from "../../shared/hooks/useSafeArea";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { storage } from "../../shared/services/storage";
import { Keyboard } from "react-native";
import type { RegisterStackParamList } from "../../navigator/RegisterStack";
import type { Register, Registers } from "../../context/RegistersContext";
import {
  Button,
  Header,
  Input,
  Screen,
  Text,
  Box,
  Select,
  RegisterScreenComponent,
  Dialog,
} from "../../components";
import { dateProvider } from "../../shared/utils/date";
import { useRegistersContext } from "../../shared/hooks/useRegistersContext";

type StateType = {
  name: string;
  description: string;
  date: string;
  hour: string;
  isPositive: boolean | null;
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
        isPositive: payload,
      };

    default:
      return state;
  }
};

export const RegisterScreen = () => {
  const { params } = useRoute<RouteProp<RegisterStackParamList, "Register">>();

  const isEdit = !!params;

  const [state, dispatch] = useReducer(reducer, {
    name: params?.name ?? "",
    description: params?.description ?? "",
    date:
      params?.date ??
      dateProvider.format({
        date: new Date(),
      }),
    hour:
      params?.hour ??
      dateProvider.format({
        date: new Date(),
        format: "HH:mm",
      }),
    isPositive: params?.isPositive ?? null,
  });

  const { updateRegister } = useRegistersContext();

  const { replace, goBack } =
    useNavigation<
      NativeStackNavigationProp<RegisterStackParamList, "Register">
    >();

  const validateForm = (values: StateType) => {
    const { name, description, date, hour, isPositive } = values;

    if (!name || !description || !date || !hour || isPositive === null) {
      return false;
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      return false;
    }

    if (!/^\d{2}:\d{2}$/.test(hour)) {
      return false;
    }

    return true;
  };

  const navigateToSuccessScreen = (isDietParam: boolean) => {
    replace("RegisterSuccess", {
      isDiet: isDietParam,
    });
  };
  const navigateToShowRegisterScreen = () => {
    replace("RegisterShow", {
      name: state.name,
      date: state.date,
      hour: state.hour,
    });
  };

  const handleIsDiet = useCallback((value: boolean) => {
    dispatch({
      type: "SET_IS_DIET",
      payload: value,
    });
  }, []);

  const handleCreateRegister = useCallback(async () => {
    Keyboard.dismiss();
    const { name, description, date, hour, isPositive } = state;
    const data = {
      name,
      description,
      date,
      hour,
      isPositive,
    };
    const isValidForm = validateForm(state);
    if (!isValidForm) {
      return;
    }

    if (isEdit) {
      console.log("EDIT", data);
      await updateRegister({
        register: data as Register,
        index: params?.index as number,
      });
      navigateToShowRegisterScreen();
      return;
    }
    let registers = await storage.get<Registers>("@diet:registers");
    const registersAlreadyExistsInDate = registers?.[date];

    if (registersAlreadyExistsInDate) {
      await storage.save("@diet:registers", {
        ...registers,
        [date]: [...registersAlreadyExistsInDate, data],
      });
    } else {
      await storage.save("@diet:registers", {
        ...registers,
        [date]: [data],
      });
    }

    navigateToSuccessScreen(isPositive as boolean);
  }, [state]);

  const handleGoBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <RegisterScreenComponent
      headerTitle={isEdit ? "Editar refeição" : "Nova refeição"}
      contentScrollable
      onPressLeftAction={handleGoBack}
      footer={
        <Box bg="neutral-900" paddingHorizontal={24} paddingBottom={16}>
          <Button
            text={isEdit ? "Salvar alterações" : "Cadastrar refeição"}
            fullWidth
            onPress={handleCreateRegister}
          />
        </Box>
      }
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
            placeholder="dd/mm/aaaa"
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
            placeholder="hh:mm"
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
            selected={state?.isPositive === true}
            option={{
              id: "sim",
              label: "Sim",
              value: "sim",
            }}
            onPress={() => handleIsDiet(true)}
          />
          <Select
            type="secondary"
            selected={state?.isPositive === false}
            option={{
              id: "nao",
              label: "Não",
              value: "nao",
            }}
            onPress={() => handleIsDiet(false)}
          />
        </Box>
      </Box>
    </RegisterScreenComponent>
  );
};
