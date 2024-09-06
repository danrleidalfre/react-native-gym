import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { SignOut } from "phosphor-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { UserPhoto } from "./UserPhoto";

import defaultImage from '@assets/userPhotoDefault.png';
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
  const { user, signOut } = useAuth()

  const { tokens } = gluestackUIConfig
  const { colors } = tokens

  const { name, avatar } = user
  const image = avatar ? { uri: avatar } : defaultImage


  return (
    <HStack bg="$gray600"
      pt="$16"
      pb="$5"
      px="$8"
      gap="$4"
      alignItems="center"
    >
      <UserPhoto
        source={image}
        w="$16"
        h="$16"
        alt="Imagem do usuário"
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">Olá</Text>
        <Heading color="$gray100" fontSize="$md">{name}</Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <SignOut color={colors.gray200} />
      </TouchableOpacity>
    </HStack>
  )
}