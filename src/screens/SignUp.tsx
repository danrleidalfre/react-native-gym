import { Center, Heading, Image, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed";

import bg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";

import { Toast } from "@components/Toast";
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import * as yup from 'yup';

const signUpSchema = yup.object({
	name: yup.string().required(),
	email: yup.string().required().email(),
	password: yup.string().required(),
	password_confirm: yup.string().required().oneOf(
		[yup.ref('password'), '']
	)
})

type FormProps = yup.InferType<typeof signUpSchema>;

export function SignUp() {
	const toast = useToast()
	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
		resolver: yupResolver(signUpSchema)
	})

	function handleGoBack() {
		navigation.goBack()
	}

	async function handleSignUp({ name, email, password }: FormProps) {
		try {
			const { data } = await api.post('/users', { name, email, password })
		} catch (error) {
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<Toast
						id={id}
						title={error instanceof AppError ? error.message : 'Entre em contato com o suporte.'}
						action="error"
						onClose={() => toast.close(id)}
					/>
				)
			})
		}
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1}>
				<Image
					source={bg}
					defaultSource={bg}
					alt='People training'
					w='$full'
					h={600}
					position='absolute'
				/>

				<VStack flex={1} px='$10' pb='$16'>
					<Center my='$24'>
						<Logo />
						<Text fontSize='$sm' color='$gray100'>
							Treine sua mente e seu corpo
						</Text>
					</Center>

					<Center gap='$2' flex={1}>
						<Heading color='$gray100'>Crie sua conta</Heading>
						<Controller
							control={control}
							name="name"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder='Nome'
									onChangeText={onChange}
									value={value}
									isInvalid={!!errors.name}
								/>
							)}
						/>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder='E-mail'
									keyboardType='email-address'
									autoCapitalize='none'
									onChangeText={onChange}
									value={value}
									isInvalid={!!errors.email}
								/>
							)}
						/>
						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder='Senha'
									secureTextEntry
									onChangeText={onChange}
									value={value}
									isInvalid={!!errors.password}
								/>
							)}
						/>
						<Controller
							control={control}
							name="password_confirm"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder='Confirme a Senha'
									secureTextEntry
									onChangeText={onChange}
									value={value}
									onSubmitEditing={handleSubmit(handleSignUp)}
									returnKeyType="send"
									isInvalid={!!errors.password_confirm}
								/>
							)}
						/>
						<Button title='Criar e acessar' onPress={handleSubmit(handleSignUp)} />
					</Center>

					<Button
						title='Voltar para login'
						variant='outline'
						mt='$12'
						onPress={handleGoBack}
					/>
				</VStack>
			</VStack>
		</ScrollView>
	)
}