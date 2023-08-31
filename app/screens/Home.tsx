import { View } from "react-native";
import { Text } from "../components";
import { Button } from "../components/Button";
import { Box } from "../components/Box";

export const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text text="Home" size="2x-large" weight="bold" />

      <Box flex={1} gap={10} bg="neutral-700" borderRadius={16} width={"100%"}>
        <Button text="Label" />
        <Button text="Label" icon="pincel-simple-line" />

        <Button text="Label" variant="outline" />
        <Button text="Label" icon="pincel-simple-line" variant="outline" />
      </Box>
    </View>
  );
};
