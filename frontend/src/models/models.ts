export interface RegisterRequest{
    "FirstName": string;
    "LastName": string;
    "Email": string;
    "PhoneNumber": string;
    "Username": string;
    "Password": string;
    "Password2": string;
}

export interface LoginRequest{
    "Username": string;
    "Password": string;
}

export interface User{
    "FirstName": string;
    "LastName": string;
    "Email": string;
    "PhoneNumber": string;
    "Username": string;
}

export interface Account{
    "AccountNumber": number;
    "AccountType": 'Checking' | 'Savings';
    "Balance": number;
}

export interface AccountList{
    "Accounts": Account[]
}

export interface TransactionRequest{
    "TransactionType": 'Deposit' | 'Withdraw' | 'Transfer';
    "Amount": number;
    "OriginID": number | null;
    "DestinationID": number | null;
}

export interface Transaction{
    "Date": string;
    "TransactionType": 'Deposit' | 'Withdraw' | 'Transfer';
    "Amount": number;
    "OriginID": number | null;
    "DestinationID": number | null;
}

export interface TransactionList{
    "Transactions": Transaction[]
}

export interface APIResponse<T>{
    data: T| null;
    error: string| null;
    status: number;
}






