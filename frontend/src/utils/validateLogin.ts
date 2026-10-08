import type { LoginRequest } from '../models/models'

export interface LoginError {
    Username : string,
    Password : string
}

export function validateLogin(values: LoginRequest) : LoginError {
    return {
        Username: values.Username.trim().length === 0 ? "No username is present" : "",
        Password: values.Password.trim().length === 0 ? "No password is present" : ""
    }
}

export function falseLogin(loginErrors : LoginError) : boolean {
    return loginErrors.Username.length > 0 || loginErrors.Password.length > 0;
}