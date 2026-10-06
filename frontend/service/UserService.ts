import {User, APIResponse} from './models';

export const MOCK_USER: User =
    {
        "User Id": "123",
        "First Name": "John",
        "Last Name": "Smith",
        "Phone Number": "201-555-1234",
        "Username": "johnsmith"
    };

export class UserService {
    static async registerSuccessful(): Promise<APIResponse<User>> {
        return {
            data: null,
            error: null,
            status: 201,
        };
    };

    static async registerFailed(): Promise<APIResponse<User>> {
        return {
            data: null,
            error: "Failed User Registration: Passwords do not match",
            status: 400,
        };
    }

    static async logInSuccessful(): Promise<APIResponse<User>> {
        return {
            data: null,
            error: null,
            status: 200,
        };
    };

    static async logInFailed(): Promise<APIResponse<User>> {
        return {
            data: null,
            error: "Failed Log In: Password Incorrect",
            status: 401,
        };
    };

    static async getUserSuccessful(): Promise<APIResponse<User>> {
        return {
            data: MOCK_USER,
            error: null,
            status: 200,
        };
    };

    static async getUserFailed(): Promise<APIResponse<User>> {
        return {
            data: null,
            error: "User not Found",
            status: 404,
        };
    };
}




