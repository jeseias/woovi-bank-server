# Woovi Bank Server

## Overview

Welcome to the Woovi Bank Server project! This project is a replica of a day-to-day CRUD system for a bank, built using modern technologies such as NodeJS, KoaJS, MongoDB, and GraphQL. The goal of this project is to simulate a work routine at a startup, focusing on delivering what the customer needs by making the best decisions and writing clean, maintainable code.

## Live testing

- **Feel free to test our API Live on its graphQL**: [playground](https://woovi-bank-server-35fd2a7fa9e5.herokuapp.com/__playground)
## Features

- **Send a transaction**: Allows one account to send a transaction to another account.
- **Receive a transaction**: Handles the receipt of transactions by an account.
- **Calculate available balance**: Calculates the available balance for an account.

## Technologies Used

- **NodeJS**
- **KoaJS**
- **MongoDB**
- **GraphQL**

## Collections

The application manages two main collections:

- **Users**
- **Accounts**
- **Transactions**

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **NodeJS (22.2.x)**
- **npm (10.7.x)**
- **Bun (1.1.x)**
- **MongoDB**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jeseias/woovi-bank-server
   cd woovi-bank-server

2. **To run the tests**

   ```bash
   bun run test

3. **To start the server**

   ```bash
   bun dev
