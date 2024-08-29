import { ButtonSpinner, Button as GluestackButton, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({ title, variant = 'solid', isLoading = false, ...rest }: Props) {
  const isSolid = variant === 'solid'

  return (
    <GluestackButton
      bg={isSolid ? '$green700' : 'transparent'}
      borderColor={isSolid ? 'transparent' : '$green500'}
      $active-bg={isSolid ? '$green500' : '$gray500'}
      w='$full'
      h='$14'
      borderWidth='$1'
      rounded='$sm'
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ButtonSpinner color='$white' /> : 
        <Text
          color={isSolid ? '$white' : '$green500'}
          fontFamily='$heading'
          fontSize='$sm'
        >
          {title}
        </Text>
      }
    </GluestackButton>
  )
}