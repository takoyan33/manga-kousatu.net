export type LoginUserFormInput = {
  email: string
  password: string
}

export type SignUpUserFormInput = LoginUserFormInput & {
  confirmPassword: string
}
