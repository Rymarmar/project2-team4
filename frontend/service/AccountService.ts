import {APIResponse, Account} from "./models";


export const MOCK_ACCOUNT: Account =
    {
        "Account Number": 1234567890,
        "Account Type": "Checking",
        "Balance": 1000.00
    };

export const MOCK_ACCOUNTS: Account[] =
    [
        {"Account Number": 1234567890, "Account Type": "Checking", "Balance": 1000.00},
        {"Account Number": 2222222222, "Account Type": "Savings", "Balance": 20000.00}
    ];


export class AccountService {
    static async openAccountSuccessful(): Promise<APIResponse<Account>> {
        return {
            data: null,
            error: null,
            status: 201,
        };
    };


    static async openAccountFailed(): Promise<APIResponse<Account>> {
        return {
            data: null,
            error: "Opening Account Failed: Invalid Pin Formatting",
            status: 400,
        };
    };


    static async logInAccountSuccessful(): Promise<APIResponse<Account>> {
        return {
            data: null,
            error: null,
            status: 200,
        };
    };


    static async logInAccountsFailed(): Promise<APIResponse<Account>> {
        return {
            data: null,
            error: "Unauthorized: User is not authenticated",
            status: 401,
        };
    };


    static async getAccountsByAccountIdSuccessful(): Promise<APIResponse<Account>> {
        return {
            data: MOCK_ACCOUNT,
            error: null,
            status: 200,
        };
    };


    static async getAccountsByAccountIdFailed(): Promise<APIResponse<Account>> {
        return {
            data: null,
            error: "Account PIN incorrect",
            status: 401,
        };
    };


    static async getAccountsByUserIdSuccessful(): Promise<APIResponse<Account[]>> {
        return {
            data: MOCK_ACCOUNTS,
            error: null,
            status: 200,
        };
    }


    static async getAccountsByUserIdFailed(): Promise<APIResponse<Account[]>> {
        return {
            data: null,
            error: "User not logged in: Didn't get all accounts by User Id",
            status: 401,
        };
    };




}
