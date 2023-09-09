import { FC } from "react";
import * as Styled from "./styles";

interface AvatarProps {
  url: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { url } = props;
  return (
    <Styled.Root>
      <Styled.Photo
        source={{
          uri: url,
        }}
        resizeMethod="scale"
        resizeMode="cover"
        width={40}
        height={40}
        fadeDuration={100}
      />
    </Styled.Root>
  );
};
