import SignUpForm from '../../components/signup-form/signup-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

import { SignInAuthenticationContainer } from './sign-in.styles'

const SignIn = () => {
    return (
        <SignInAuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </SignInAuthenticationContainer>
    )
}

export default SignIn