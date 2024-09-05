import { Center, Heading, Image, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed";

import bg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Toast } from "@components/Toast";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";
import { useState } from "react";

export function SignIn() {
	const { signIn } = useAuth()
	const toast = useToast()
	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [isLoading, setIsLoading] = useState(false)

	function handleNewAccount() {
		navigation.navigate('signUp')
	}

	async function handleSignIn() {
		try {
			setIsLoading(true)
			await signIn(email, password)
		} catch (error) {
			let errorMessage = 'Entre em contato com o suporte.';

			if (error instanceof AppError) {
				errorMessage = error.message;
			}

			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<Toast
						id={id}
						title={errorMessage}
						action="error"
						onClose={() => toast.close(id)}
					/>
				)
			});
		} finally {
			setIsLoading(false)
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

					<Center gap='$2'>
						<Heading color='$gray100'>Acesse sua conta</Heading>
						<Input
							placeholder='E-mail'
							keyboardType='email-address'
							autoCapitalize='none'
							onChangeText={setEmail}
							value={email}
						/>
						<Input
							placeholder='Senha'
							secureTextEntry
							onChangeText={setPassword}
							value={password}
						/>
						<Button
							title='Acessar'
							onPress={() => handleSignIn()}
							isLoading={isLoading}
						/>
					</Center>

					<Center flex={1} justifyContent='flex-end' mt='$4'>
						<Text
							color='$gray100'
							fontSize='$sm'
							mb='$3'
							fontFamily='$body'
						>
							Ainda não tem acesso?
						</Text>
						<Button title='Criar conta' variant='outline' onPress={handleNewAccount} />
					</Center>
				</VStack>
			</VStack>
		</ScrollView>
	)
}