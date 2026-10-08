import type {APIResponse, Account, AccountList, NewTransaction} from "../models/models.ts";
import {TransactionService} from "./TransactionService";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const randomDelay = (min = 500, max = 800) =>
    delay(Math.floor(Math.random() * (max - min + 1)) + min);



export let MOCK_ACCOUNTS: AccountList = {
    "Accounts": [
        {"AccountNumber": 1123456789, "AccountType": "Checking", "Balance": 1000.00},
        {"AccountNumber": 9876543211, "AccountType": "Savings", "Balance": 20000.00}
    ]
};


export class AccountService {

    static async updateAccountBalances(input: number, newTransaction :NewTransaction): Promise<APIResponse<AccountList>>{
        if (input === 1){
            let transactionType: string = newTransaction.TransactionType
            let amount:number = newTransaction.Amount
            let originId: number = (newTransaction.OriginID === 1123456789) ? 0 : 1
            let destinationId: number = (newTransaction.DestinationID === 1123456789) ? 0 : 1
            if(transactionType != "Deposit" && amount > MOCK_ACCOUNTS.Accounts[originId].Balance){
                return{
                    data: null,
                    error: "Transaction failed: Insufficient funds",
                    status: 400,
                }
            }

            const transactionResponse = await TransactionService.putTransaction(input, newTransaction)
            if (transactionResponse.status > 300){
                return{
                    data: null,
                    error: null,
                    status: transactionResponse.status,
                }
            }

            switch(transactionType){
                case "Deposit":
                    MOCK_ACCOUNTS.Accounts[destinationId].Balance+=amount
                    break
                case "Withdraw":
                    MOCK_ACCOUNTS.Accounts[originId].Balance-=amount
                    break
                case "Transfer":
                    MOCK_ACCOUNTS.Accounts[destinationId].Balance+=amount
                    MOCK_ACCOUNTS.Accounts[originId].Balance-=amount
                    break
            }
            let  clonedAccounts =  structuredClone(MOCK_ACCOUNTS);
            return{
                data: clonedAccounts,
                error: "Accounts Updated: Transaction success",
                status: 200,
            }
        }else{
            return{
                data: null,
                error: "Unimplemented error",
                status: 501,
            }
        }

    }

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


    static async getAccountByAccountID(input: number, accountNumber: number): Promise<APIResponse<Account>> {
        await randomDelay();
        if (input === 1){
            const accountIndex = (accountNumber === MOCK_ACCOUNTS.Accounts[0].AccountNumber) ? 0 :  1
            return {
                data: MOCK_ACCOUNTS.Accounts[accountIndex],
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
