import { FlatList } from "react-native";
import { css, styled } from "styled-components/native";
import { HistoryDayProps } from "../../components/HistoryDay";

export type ItemProps = Omit<HistoryDayProps, "onPress">;

export const List = styled(FlatList as typeof FlatList<ItemProps>)``;
