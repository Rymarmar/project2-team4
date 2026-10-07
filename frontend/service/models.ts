export interface User{
    "User Id": string;
    "First Name": string;
    "Last Name": string;
    "Phone Number": string;
    "Username": string;
}

export interface Account{
    "Account Number": number;
    "Account Type": string;
    "Balance": number;
}


export interface Transaction{
    "Date": string;
    "Type": string;
    "Amount": number;
    "Origin ID": number;
    "Destination ID": number;
}

export interface APIResponse<T>{
    data: T| null;
    error: string| null;
    status: number;
}