import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { ScreenHeader } from "@components/ScreenHeader";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

export function Exercises() {
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('');

  async function fetchGroups() {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Exercícios" />

      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
          gap: 10
        }}
        style={{
          marginVertical: 40,
          minHeight: 44,
          maxHeight: 44,
        }}
      />

      <VStack px="$8" flex={1}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mb="$5"
        >
          <Heading
            color="$gray200"
            fontSize="$md"
            fontFamily="$heading"
            textTransform="capitalize"
          >
            {groupSelected}
          </Heading>
          <Text
            color="$gray200"
            fontSize="$sm"
            fontFamily="$body"
          >
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}
