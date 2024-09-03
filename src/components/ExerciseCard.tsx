import { Heading, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { CaretRight } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type Props = TouchableOpacityProps

export function ExerciseCard({ ...rest }: Props) {
  const { tokens } = gluestackUIConfig
  const { colors } = tokens

  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        alignItems="center"
        p="$2"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{ uri: 'https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp' }}
          alt=""
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading
            fontSize="$lg"
            color="$white"
            fontFamily="$heading"
          >
            Barra Fixa
          </Heading>
          <Text
            fontSize="$sm"
            color="$gray200"
            mt="$1"
          >
            3 séries x 12 repetições
          </Text>
        </VStack>

        <CaretRight color={colors.gray300} />
      </HStack>
    </TouchableOpacity>
  )
}