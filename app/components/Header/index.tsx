import { Avatar } from "../Avatar";
import { Box } from "../Box";
import { Icon } from "../Icon";
import * as Styled from "./styles";

export const Header = () => {
  return (
    <Styled.Root>
      <Icon name="logo" />
      <Avatar url="https://www.github.com/renanloureiroo.png" />
    </Styled.Root>
  );
};
