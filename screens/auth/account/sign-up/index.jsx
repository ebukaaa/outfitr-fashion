import { useStore } from "./utils";

export function useSignUp() {
  const {
    styles: { titleStyles, subTitleStyles, buttonStyles },
    inputs,
    Input,
    Button,
    Text,
    onChangeText,
    onNavigate,
  } = useStore();

  return (
    <>
      <Text style={titleStyles}>Create account</Text>
      <Text style={subTitleStyles}>
        Let&apos;s us know your name, email and password
      </Text>

      {inputs.map(
        ({
          id,
          ref,
          icon,
          keyboardType,
          returnKeyType,
          textContentType,
          onValidate,
          onSubmitEditing,
        }) => (
          <Input
            key={id}
            ref={ref}
            icon={icon}
            placeholder={id}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            textContentType={textContentType}
            onSubmitEditing={onSubmitEditing}
            onValidate={onValidate}
            onChangeText={onChangeText}
          />
        )
      )}

      <Button
        label="Create your account"
        variant="primary"
        style={buttonStyles}
        onPress={onNavigate}
      />
    </>
  );
}
