import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeArea = () => {
  const { bottom, left, right, top } = useSafeAreaInsets();

  return {
    top,
    right,
    bottom,
    left,
  };
};
