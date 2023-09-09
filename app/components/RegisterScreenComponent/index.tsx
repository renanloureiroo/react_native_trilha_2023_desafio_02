import { FC, ReactNode } from "react";
import { Box } from "../Box";
import { Screen } from "../Screen";
import { Header } from "../Header";
import { useSafeArea } from "../../shared/hooks/useSafeArea";
import { Theme } from "../../shared/theme";

interface RegisterScreenComponentnProps {
  headerColor?: keyof Theme["colors"];
  headerTitle: string;
  onPressLeftAction: () => void;
  children: ReactNode;
  contentScrollable?: boolean;
  footer?: ReactNode;
}

export const RegisterScreenComponent: FC<RegisterScreenComponentnProps> = (
  props
) => {
  const {
    children,
    headerTitle,
    headerColor = "neutral-500",
    contentScrollable = false,
    onPressLeftAction,
    footer,
  } = props;
  const { top } = useSafeArea();

  return (
    <Screen
      safeAreaEdges={["bottom"]}
      backgroundColor="neutral-900"
      paddingBottom={16}
    >
      <Box
        paddingHorizontal={24}
        paddingBottom={34}
        paddingTop={top + 16}
        bg={headerColor}
      >
        <Header title={headerTitle} onPressLeftAction={onPressLeftAction} />
      </Box>

      <Box
        scroll={contentScrollable}
        flex={1}
        bg="neutral-900"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        paddingHorizontal={24}
        paddingTop={32}
        top={-20}
      >
        {children}
      </Box>
      {footer && footer}
    </Screen>
  );
};
