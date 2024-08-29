import { Center, Heading, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import bg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} bg='$gray700'>
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
						<Input placeholder='Nome' />
						<Input
							placeholder='E-mail'
							keyboardType='email-address'
							autoCapitalize='none'
						/>
						<Input placeholder='Senha' secureTextEntry />
						<Button title='Criar e acessar' />
					</Center>

					<Button
						title='Voltar para login'
						variant='outline'
						mt='$12'
					/>
				</VStack>
			</VStack>
		</ScrollView>
	)
}