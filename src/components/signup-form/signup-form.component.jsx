import { useState } from 'react'
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component'

import { SignUpContainer, SignUpHeader } from './sign-up-form.styles.jsx'



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields ] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("Password do not match!")
            return 
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            )

            resetFormField()
            await createUserDocumentFromAuth(user, { displayName })

        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Can\'t create a user, email already exists!')
            } else {
                console.log('Error', error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }
    
    return (
        <SignUpContainer>
            <SignUpHeader>Don't have an account?</SignUpHeader>
            <span>SignUp Form!</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={ displayName }
                />
                
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

                <FormInput 
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={ confirmPassword }
                />

                <Button 
                    buttonType={BUTTON_TYPES_CLASSES.base}
                    type="submit"
                    >
                        Sign Up
                    </Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm