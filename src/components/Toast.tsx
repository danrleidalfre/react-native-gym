import { HStack, Pressable, ToastDescription, Toast as ToastNative, ToastTitle, VStack } from "@gluestack-ui/themed"
import { X } from "phosphor-react-native"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

type Props = {
	id: number
	title: string
	description?: string
	action?: 'error' | 'success'
	onClose: () => void
}

export function Toast({
	id,
	title,
	description,
	action = 'success',
	onClose
}: Props) {
	const { tokens } = gluestackUIConfig
	const { colors, fontSizes } = tokens

	return (
		<ToastNative
			nativeID={`toast-${id}`}
			action={action}
			bgColor={action === 'success' ? "$green500" : "$red500"}
			mt="$10"
		>
			<VStack space="xs" w="$full">
				<HStack alignItems="center" justifyContent="space-between">
					<ToastTitle color="$white" fontFamily="$heading">
						{title}
					</ToastTitle>
					<Pressable onPress={onClose}>
						<X color={colors.coolGray50} size={fontSizes.lg} />
					</Pressable>
				</HStack>
				{description && (
					<ToastDescription color="$white" fontFamily="$body">
						{description}
					</ToastDescription>
				)}
			</VStack>
		</ToastNative >
	)
}