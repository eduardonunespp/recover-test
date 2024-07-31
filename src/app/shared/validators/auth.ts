import * as yup from "yup";

const passwordValidation = yup
.string()
.required("A Senha do usuário é obrigatória")
.min(8, "A senha do usuário deve conter no mínimo 8 caracteres")
.max(32, "A senha do usuário deve conter no máximo 32 caracteres")
.matches(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
.matches(/[a-z]/, "A senha deve conter pelo menos 1 letra minúscula")
.matches(/\d/, "A senha deve conter pelo menos 1 número")
.matches(/[@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos 1 caractere especial (@, #, $, etc.)");

export const AuthSignInValidator = yup.object({
  email: yup
    .string()
    .required("O Email do usuário é orbigatório")
    .email("Email inválido"),
    password: passwordValidation 
});

export const SendEmailValidator = yup.object({
  email: yup.string().required("O Email do usuário é obrigatório").email("Email inválido")
})

export const AuthRecoverPasswordValidator = yup.object({
  password: passwordValidation,
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], "As senhas devem coincidir")
    .required("A confirmação da senha é obrigatória")
})
