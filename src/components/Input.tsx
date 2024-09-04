import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
  isInvalid?: boolean
}

export function Input({ isReadOnly = false, isInvalid = false, ...rest }: Props) {
  return (
    <GluestackInput
      isInvalid={isInvalid}
      h='$14'
      borderWidth='$1'
      borderColor='transparent'
      borderRadius='$md'
      $focus={{
        borderColor: isInvalid ? '$red500' : '$green500'
      }}
      $invalid={{
        borderColor: '$red500'
      }}
      isReadOnly={isReadOnly}
      isDisabled={isReadOnly}
    >
      <InputField
        bg='$gray700'
        px='$4'
        color='$white'
        fontFamily='$body'
        placeholderTextColor='$gray300'
        {...rest}
      />
    </GluestackInput>
  )
}