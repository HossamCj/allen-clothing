import { useState } from 'react'
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component'

import { ButtonsContainer, SignUpContainer, SignUpHeader } from './sign-in-form.styles.jsx'



const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields ] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } =  await signInAuthUserWithEmailAndPassword(
                email,
                password
            )
            resetFormField()
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password')
                    break
                case 'auth/user-not-found':
                    alert('No user associated with this email')
                    break
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }
    
    return (
        <SignUpContainer>
            <SignUpHeader>Already have an account?</SignUpHeader>
            <span>Sign In with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={ email } 
                />

                <FormInput 
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={ password }
                />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                        type="button" 
                        buttonType={ BUTTON_TYPES_CLASSES.google } 
                        onClick={signInWithGoogle}
                        >
                            Google sign in
                        </Button>
                </ButtonsContainer>
                
            </form>
        </SignUpContainer>
    )
}

export default SignInForm