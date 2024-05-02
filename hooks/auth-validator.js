import { object, string, array, ref} from 'yup';

export const LoginValidator = object().shape({
    email: string().trim().email().required('Email is required'),
    password: string().trim().required('Password is required'),
});

export const SignUpValidator = object().shape({
    firstName: string().trim().required('First Name is required'),
    lastName: string().trim().required('Last Name is required'),
    email: string().trim().email().required('Email is required'),
    password: string().trim().required('Password is required'),
    confirmPassword: string()
    .oneOf([ref('password'), ''], 'Passwords must match').required(),
});