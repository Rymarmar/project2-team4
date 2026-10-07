import type {APIResponse, Account, AccountList} from "../models/models.ts";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const randomDelay = (min = 500, max = 800) =>
    delay(Math.floor(Math.random() * (max - min + 1)) + min);

export const MOCK_ACCOUNT: Account =
    {
        "AccountNumber": 1123456789,
        "AccountType": "Checking",
        "Balance": 1000.00
    };

export const MOCK_ACCOUNTS: AccountList = {
    "Accounts": [
        {"AccountNumber": 1123456789, "AccountType": "Checking", "Balance": 1000.00},
        {"AccountNumber": 9876543211, "AccountType": "Savings", "Balance": 20000.00}
    ]
};


export class AccountService {

    static async putAccounts(input : number): Promise<APIResponse<AccountList>>{
        await randomDelay();
        if (input === 1){
            return {
                data: MOCK_ACCOUNTS,
                error: null,
                status: 201,
            };
        }else if(input === 0) {
            return {
                data: null,
                error: "User did not register successfully, account creation failed.",
                status: 401,
            };
        } else{
            return {
                data: null,
                error: "Unimplemented error.",
                status: 501,
            };
        }
    }


    static async getAccountByAccountId(input: number): Promise<APIResponse<Account>> {
        await randomDelay();
        if (input === 1){
            return {
                data: MOCK_ACCOUNT,
                error: null,
                status: 200,
            };
        }
        else if(input === 0) {
            return {
                data: null,
                error: "User not logged in.",
                status: 401,
            };
        }
        else if(input === -1){
            return {
                data: null,
                error: "Account does not belong to user.",
                status: 403,
            };

        }else{
            return {
                data: null,
                error: "Unimplemented error.",
                status: 501,
            };
        }
    };


    static async getAccountsByUsername(input: number): Promise<APIResponse<AccountList>> {
        await randomDelay();
        if(input === 1){
            return {
                data: MOCK_ACCOUNTS,
                error: null,
                status: 200,
            };
        }else if(input === 0) {
            return {
                data: null,
                error: "User not logged in.",
                status: 401,
            };
        }
        else if(input === -1){
            return {
                data: null,
                error: "Account does not belong to user.",
                status: 403,
            };
        }
        else{
            return {
                data: null,
                error: "Unimplemented error.",
                status: 501,
            };
        }
    };




}
