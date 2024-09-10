import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Heading, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { api } from "@services/api";
import { CaretRight } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type Props = TouchableOpacityProps & {
  exercise: ExerciseDTO
}

export function ExerciseCard({ exercise, ...rest }: Props) {
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
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}` }}
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
            {exercise.name}
          </Heading>
          <Text
            fontSize="$sm"
            color="$gray200"
            mt="$1"
          >
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>

        <CaretRight color={colors.gray300} />
      </HStack>
    </TouchableOpacity>
  )
}