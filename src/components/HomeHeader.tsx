import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { SignOut } from "phosphor-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  const { tokens } = gluestackUIConfig
  const { colors } = tokens

  return (
    <HStack bg="$gray600"
      pt="$16"
      pb="$5"
      px="$8"
      gap="$4"
      alignItems="center"
    >
      <UserPhoto
        source={{ uri: 'https://github.com/danrleidalfre.png' }}
        w="$16"
        h="$16"
        alt="Imagem do usuário"
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">Olá</Text>
        <Heading color="$gray100" fontSize="$md">Danrlei</Heading>
      </VStack>
      <SignOut color={colors.gray200} />
    </HStack>
  )
}