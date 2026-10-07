import type {APIResponse, Transaction, TransactionList} from "../models/models.ts";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const randomDelay = (min = 500, max = 800) =>
    delay(Math.floor(Math.random() * (max - min + 1)) + min);


export const MOCK_TRANSACTION: Transaction = {
    "Date": "10-01-2026",
    "TransactionType": "Deposit",
    "Amount": 21000.00,
    "OriginID": null,
    "DestinationID": 9876543211
}
export const MOCK_TRANSACTIONS: TransactionList = {

    "Transactions": [
        {"Date": "10-01-2026", "TransactionType": "Deposit", "Amount": 21000.00, "OriginID": null, "DestinationID": 9876543211},
        {"Date": "10-02-2026", "TransactionType": "Deposit", "Amount": 1000.00, "OriginID": null, "DestinationID": 1123456789},
        {"Date": "10-03-2026", "TransactionType": "Withdraw", "Amount": 1000.00, "OriginID": 1123456789, "DestinationID": null},
        {"Date": "10-04-2026", "TransactionType": "Transfer", "Amount": 500.00, "OriginID": 9876543211, "DestinationID": 1123456789},
        {"Date": "10-05-2026", "TransactionType": "Transfer", "Amount": 500.00, "OriginID": 9876543211, "DestinationID": 1123456789}
    ]
};


export class TransactionService {
    static async putTransaction(input: number): Promise<APIResponse<Transaction>> {
        await randomDelay();
        if(input === 1){
            return {
                data: MOCK_TRANSACTION,
                error: null,
                status: 201,
            };
        }
        else if(input === 0){
            return {
                data: null,
                error: "Transaction Failed: Invalid amount input.",
                status: 400,
            };
        }else if(input === -1){
            return {
                data: null,
                error: "Transaction Failed: User is not logged in.",
                status: 401,
            };
        }else if(input === -2){
            return {
                data: null,
                error: "Origin Account ID doesn't belong to the logged-in user.",
                status: 403,
            };
        }
        else{
            return{
                data: null,
                error: "Unimplemented error.",
                status: 501,
            };
        }

    };



    static async getTransactions(input: number): Promise<APIResponse<TransactionList>> {
        await randomDelay();
        if(input === 1) {
            return {
                data: MOCK_TRANSACTIONS,
                error: null,
                status: 200,
            };
        }
        else if(input === 0){
            return {
                data: null,
                error: "Transaction History Failed: User is not authenticated.",
                status: 401,
            };
        }else if(input === -1){
            return {
                data: null,
                error: "Transaction History Failed: Transactions belong to another user or account.",
                status: 403,
            };
        }else{
            return{
                data: null,
                error: "Unimplemented error.",
                status: 501,
            };
        }
    };





}
