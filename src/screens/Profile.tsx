import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { Toast } from "@components/Toast";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

type FormProps = {
  name: string
  email: string
  old_password: string
  new_password: string
  confirm_password: string
}

export function Profile() {
  const toast = useToast()
  const { user } = useAuth()
  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  })

  const [photo, setPhoto] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleUserPhotoSelect() {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (canceled) {
        return
      }

      const uriPhoto = assets[0].uri
      const { size } = await FileSystem.getInfoAsync(uriPhoto) as { size: number }

      if (size / 1024 / 1024 > 5) {
        return toast.show({
          placement: 'top',
          render: ({ id }) => (
            <Toast
              id={id}
              title="Tamanho deve ser no máximo de 5MB."
              action="error"
              onClose={() => toast.close(id)}
            />
          )
        })
      }

      setPhoto(uriPhoto)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleProfileUpdate(payload: FormProps) {
    try {
      setIsLoading(true)

      await api.put('/users', payload)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: photo }}
            alt="User Photo"
            size="xl"
          />
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>
          <Center w="$full" gap="$4">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  bg="$gray600"
                  isReadOnly
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </Center>
          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>
          <Center w="$full" gap="$4">
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
            <Button title="Atualizar" onPress={handleSubmit(handleProfileUpdate)} isLoading={isLoading} />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
