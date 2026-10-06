import {APIResponse, Transaction} from "./models";


export const MOCK_TRANSACTIONS: Transaction[] =
    [
        {"Date": "10-05-2026", "Type": "Transfer", "Amount": 1000.00, "Origin ID": 1234567890, "Destination ID": 2222222222},
        {"Date": "10-05-2026", "Type": "Deposit", "Amount": 1000.00, "Origin ID": null, "Destination ID": 2222222222},
        {"Date": "10-05-2026", "Type": "Withdraw", "Amount": 1000.00, "Origin ID": 1234567890, "Destination ID": null},
        {"Date": "10-05-2026", "Type": "Transfer", "Amount": 1000.00, "Origin ID": 1234567890, "Destination ID": 2222222222},
        {"Date": "10-05-2026", "Type": "Transfer", "Amount": 1000.00, "Origin ID": 1234567890, "Destination ID": 2222222222}
    ];

export class TransactionService {


    static async putTransactionSuccessful(): Promise<APIResponse<Transaction>> {
        return {
            data: null,
            error: null,
            status: 201,
        };
    };

    static async putTransactionFailed(): Promise<APIResponse<Transaction>> {
        return {
            data: null,
            error: "Transaction Failed: Invalid amount input.",
            status: 400,
        };
    };



    static async getTransactionsByAccountIdSuccessful(): Promise<APIResponse<Transaction[]>> {
        return {
            data: MOCK_TRANSACTIONS,
            error: null,
            status: 200,
        };
    };

    static async getTransactionsByAccountIdFailed(): Promise<APIResponse<Transaction[]>> {
        return {
            data: null,
            error: "Getting Transaction History Failed: Account ID not found.",
            status: 404,
        };
    };




}
