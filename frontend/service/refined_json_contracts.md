# API Endpoints

## 1. Register User

### `RegisterUser()`

Registers a new user account.

**Request Body:**

```json
{
  "First Name": "String",
  "Last Name": "String",
  "Phone Number": "String",
  "Username": "String",
  "Password": "String",
  "Password2": "String"
}
```

**Responses:**

| Status            | Description                                       |
|-------------------|---------------------------------------------------|
| `201 Created`     | User successfully registered.                     |
| `400 Bad Request` | Invalid request syntax or passwords do not match. |

---

## 2. Log In User

### `LogInUser()`

Authenticates a user using their username and password.

**Request Body:**

```json
{
  "Username": "String",
  "Password": "String"
}
```

**Responses:**

| Status | Description |
|---|---|
| `200 OK` | User successfully authenticated. |
| `401 Unauthorized` | Invalid username or password. |

---

## 3. Get User

### `GetUser()`

Retrieves information about the currently authenticated user.

**Request Body:**

No request body is required. The server identifies the user based on their authenticated session.

**Success Response:**

```json
{
  "User Id": 123,
  "First Name": "John",
  "Last Name": "Smith",
  "Phone Number": "201-555-1234",
  "Username": "johnsmith"
}
```

**Responses:**

| Status | Description |
|---|---|
| `200 OK` | User information successfully retrieved. |
| `401 Unauthorized` | User is not logged in. |

---

## 4. Open Account

### `OpenAccount()`

Creates a new bank account for the currently authenticated user.

**Request Body:**

```json
{
  "Account Type": "String",
  "PIN": 1234
}
```

**Responses:**

| Status            | Description                   |
|-------------------|-------------------------------|
| `201 Created`     | Account successfully created. |
| `400 Bad Request` | Bad PIN formatting.           |

**Success Response:** No return body.

[//]: # (```json)

[//]: # ({)

[//]: # (  "Account Num": 123456)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (---)

## 5. Log In to Account

### `LogInAccount()`

Authenticates access to an account using the account PIN.

**Request Body:**

```json
{
  "Account Type": "Checkings",
  "PIN": 1234
}
```

**Success Response:**

```json
{
  "Correct Pin": true
}
```

**Responses:**

| Status | Description |
|---|---|
| `200 OK` | PIN was successfully verified. |
| `401 Unauthorized` | PIN authentication failed or user is not logged in. |

---

## 6. Get Accounts

### `GetAccountsByUserId()`

Retrieves all accounts belonging to the currently authenticated user.

This endpoint can be used to retrieve the user's checking and savings accounts for display on the Main Page and Transaction Page.

**Request Body:**

No request body is required. The server identifies the user based on their authenticated session.

**Success Response:**

```json
{
  "Accounts": [
    {
      "Account Number": 123456,
      "Account Type": "Checking",
      "Balance": 1000.50
    },
    {
      "Account Number": 654321,
      "Account Type": "Savings",
      "Balance": 5000.00
    }
  ]
}
```

**Responses:**

| Status | Description |
|---|---|
| `200 OK` | Accounts successfully retrieved. |
| `401 Unauthorized` | User is not logged in. |

---

## 7. Get Account

### `GetAccountByAccountId()`

Retrieves information about a specific account. The user must be logged in.

**Request Body:**

```json

{

  "Account Number": 123456,

  "PIN": 1234

}

```

**Success Response:**

```json
{
  "User Id": 123,
  "Account Number": 123456,
  "Account Type": "Checking",
  "Balance": 1000.50
}
```

**Responses:**

| Status | Description |
|---|---|
| `200 OK` | Account information successfully retrieved. |
| `404 Not Found` | The specified account does not exist. |
| `401 Unauthorized` | User is not logged in. |

**404 Response Message:**

```text
No account with id provided.
```

---

## 8. Put Transaction

### `PutTransaction()`

Creates a new transaction between two accounts. The user must be logged in.

**Request Body:**

```json
{
  "Transaction Type": "String",
  "Amount": 100.00,
  "Origin Account ID": 123456,
  "Destination Account ID": 654321
}
```

**Responses:**

| Status | Description |
|---|---|
| `201 Created` | Transaction successfully created. |
| `400 Bad Request` | Invalid transaction amount. |
| `401 Unauthorized` | User is not logged in. |

---

## 9. Get Transactions by Account ID

### `GetTransactionByAccountId()`

Retrieves all transactions associated with a specific account. The user must be logged in.

**Request Body:**

```json
{
  "Account ID": 123456
}
```

**Success Response:**

```json
{
  "Transactions List": [
    {
      "Date": "String",
      "Type": "String",
      "Amount": "String",
      "Origin ID": 123456,
      "Destination ID": 654321
    }
  ]
}
```

**Responses:**

| Status | Description |
|---|---|
| `200 OK` | Transactions successfully retrieved. |
| `404 Not Found` | The specified account does not exist. |
| `401 Unauthorized` | User is not logged in. |

---

# Page-to-API Mapping

## Register Page

**Required API Calls:**

- `RegisterUser()`

**Purpose:**

Creates a new user account.

---

## Login Page

**Required API Calls:**

- `LogInUser()`
- `GetUser()`

**Purpose:**

Authenticates the user and retrieves their user information after a successful login.

---

## Account Creation Page

**Required API Calls:**

- `GetUser()`
- `OpenAccount()`
- `GetAccountsByUserId()`

**Purpose:**

Displays the user's information, creates a new checking or savings account, and retrieves the user's accounts.

---

## Account Login Page

**Required API Calls:**

- `GetUser()`
- `LogInAccount()`
- `GetAccount()`

**Purpose:**

Displays the user's information, verifies the account PIN, and retrieves the selected account's information.

---

## Main Page

**Required API Calls:**

- `GetUser()`
- `GetAccountsByUserId()`

**Information Displayed:**

- User information
- Checking account information
- Savings account information
- Account balances

---

## Transaction Page

**Required API Calls:**

- `GetUser()`
- `GetAccountsByUserId()`
- `PutTransaction()`

**Information Displayed:**

- User information
- Checking account information
- Savings account information

**Actions:**

- Create a new transaction

---

## Transaction History Page

**Required API Calls:**

- `GetAccountsByUserId()`
- `GetTransactionByAccountId()`

**Information Displayed:**

- Checking account transactions
- Savings account transactions
- Transaction date
- Transaction type
- Transaction amount
- Origin account
- Destination account

---

# Status Code Summary

| Status Code | Meaning | Usage |
|---|---|---|
| `200 OK` | Request succeeded | Successful login and data retrieval |
| `201 Created` | Resource successfully created | User, account, and transaction creation |
| `400 Bad Request` | Invalid request | Invalid syntax, password mismatch, or invalid amount |
| `401 Unauthorized` | Authentication required or failed | Invalid credentials, incorrect PIN, or user not logged in |
| `404 Not Found` | Resource does not exist | Account or account ID could not be found |

---

# API Endpoint Summary

| Endpoint | Purpose |
|---|---|
| `RegisterUser()` | Register a new user |
| `LogInUser()` | Authenticate a user |
| `GetUser()` | Retrieve the logged-in user's information |
| `OpenAccount()` | Create a new checking or savings account |
| `LogInAccount()` | Verify an account PIN |
| `GetAccountsByUserId()` | Retrieve all accounts belonging to the logged-in user |
| `GetAccount()` | Retrieve a specific account |
| `PutTransaction()` | Create a new transaction |
| `GetTransactionByAccountId()` | Retrieve transactions for an account |
