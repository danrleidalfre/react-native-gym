import { Button, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  name: string
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Button
      minWidth="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderColor={isActive ? "$green500" : "$gray600"}
      borderWidth="$1"
      sx={{
        ":active": { borderColor: "$green500" }
      }}
      {...rest}
    >
      <Text
        color={isActive ? "$green500" : "$gray200"}
        fontFamily="$heading"
        fontSize="$xs"
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Button>
  )
}