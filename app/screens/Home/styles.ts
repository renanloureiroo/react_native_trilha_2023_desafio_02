import { FlatList } from "react-native";
import { css, styled } from "styled-components/native";

export interface ItemProps {
  date: string;
  history: {
    hour: string;
    isPositive: boolean;
    title: string;
  }[];
}

export const List = styled(FlatList as typeof FlatList<ItemProps>)``;
