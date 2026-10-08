import type {APIResponse, Transaction, TransactionList, TransactionRequest} from "../models/models.ts";
import { MOCK_ACCOUNTS } from './AccountService';

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
    static async putTransaction(input: number | TransactionRequest): Promise<APIResponse<Transaction>> {
        await randomDelay();
        if (typeof input !== 'number') {
            const { TransactionType: type, Amount: amount, OriginID: originId, DestinationID: destinationId } = input;
            const origin = MOCK_ACCOUNTS.Accounts.find((account) => account.AccountNumber === originId);
            const destination = MOCK_ACCOUNTS.Accounts.find((account) => account.AccountNumber === destinationId);
            const fail = (error: string, status = 400): APIResponse<Transaction> => ({ data: null, error, status });
            const cents = Math.round(amount * 100);

            if (!Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(cents)
                || (amount * 100) % 1 !== 0) {
                return fail('Enter a positive amount with up to two decimal places.');
            }
            if (!['Deposit', 'Withdraw', 'Transfer'].includes(type)) {
                return fail('Select a valid transaction type.');
            }
            if (type !== 'Deposit' && !origin) {
                return fail('The source account is not available.', 403);
            }
            if (type !== 'Withdraw' && !destination) {
                return fail('The destination account is not available.', 403);
            }
            if ((type === 'Deposit' && originId !== null)
                || (type === 'Withdraw' && destinationId !== null)) {
                return fail('Invalid account fields for this transaction type.');
            }
            if (type === 'Transfer' && originId === destinationId) {
                return fail('Choose a different destination account.');
            }
            if (type !== 'Deposit' && origin && cents > Math.round(origin.Balance * 100)) {
                return fail('Insufficient funds in the selected account.');
            }

            // Store balances in the mock service so a subsequent account fetch sees the change.
            if (type !== 'Deposit' && origin) {
                origin.Balance = (Math.round(origin.Balance * 100) - cents) / 100;
            }
            if (type !== 'Withdraw' && destination) {
                destination.Balance = (Math.round(destination.Balance * 100) + cents) / 100;
            }
            const now = new Date();
            const transaction: Transaction = {
                ...input,
                Date: `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${now.getFullYear()}`,
            };
            MOCK_TRANSACTIONS.Transactions.push(transaction);
            return { data: transaction, error: null, status: 201 };
        }
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
