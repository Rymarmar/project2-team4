
import {UserService} from "../service/UserService.ts";
import type {APIResponse, User} from "../models/models.ts";
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const randomDelay = (min = 500, max = 800) =>
    delay(Math.floor(Math.random() * (max - min + 1)) + min);


export async function login(username: string, password: string) {
    if(username === "johnsmith" && password === "apple123"){
        const user: Promise<APIResponse<User>> =  UserService.logIn(1);
        return {
            success: true,
            body: user
        };
    }
    else{
        const user: Promise<APIResponse<User>> =  UserService.logIn(1);
        return {
            success: false,
            body: user
        };
    }
}

// export async function register(firstName: string, lastName: string, phoneNumber:string,
//                                username: string, email: string, password1: string, password2: string) {
    // const requestObject = {
    //     "FirstName": firstName,
    //     "LastName": lastName,
    //     "Email": email,
    //     "PhoneNumber": phoneNumber,
    //     "Username": username,
    //     "Password": password1,
    //     "Password2": password2
    // }

export async function register(email: string, password1: string, password2: string){
    if(password1 !== password2 || !email.includes("@")) {
        const user: Promise<APIResponse<User>> = UserService.register(0);
        return {
            success: false,
            body: user
        };
    }
    else{
        const user: Promise<APIResponse<User>> =  UserService.register(1);
        return {
            success: true,
            body: user
        };
    }
}

export async function logout() {
    await randomDelay(500, 800);
    return {
        success: true,
        data: null,
    };
}