import type { RegisterRequest } from '../models/models'

export interface RegisterError {
    FirstName : string,
    LastName : string,
    Email : string,
    PhoneNumber : string,
    Username : string,
    Password : string,
    Password2 : string
}

export function validateRegister(values: RegisterRequest) : RegisterError {
    return {
        FirstName: values.FirstName.trim().length === 0 ? "No First Name is present" : "",
        LastName: values.LastName.trim().length === 0 ? "No Last Name is present" : "",
        Email: values.Email.trim().length === 0 ? "No Email is present" : "",
        PhoneNumber: values.PhoneNumber.trim().length === 0 ? "No Phone Number is present" : "",
        Username: values.Username.trim().length === 0 ? "No username is present" : "",
        Password: values.Password.trim().length === 0 ? "No password is present" : "",
        Password2: values.Password2.trim().length === 0 ? "No password confirmation is present" : ""
    }
}

export function falseRegister(registerErrors : RegisterError) : boolean {
    return (
        registerErrors.FirstName.length > 0 ||
        registerErrors.LastName.length > 0 ||
        registerErrors.Email.length > 0 ||
        registerErrors.PhoneNumber.length > 0 ||
        registerErrors.Username.length > 0 || 
        registerErrors.Password.length > 0 ||
        registerErrors.Password2.length > 0
    );
}