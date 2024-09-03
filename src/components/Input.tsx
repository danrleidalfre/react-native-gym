import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
}

export function Input({ isReadOnly = false, ...rest }: Props) {
  return (
    <GluestackInput
      h='$14'
      borderWidth='$1'
      borderColor='transparent'
      borderRadius='$md'
      $focus={{
        borderWidth: 1,
        borderColor: '$green500'
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