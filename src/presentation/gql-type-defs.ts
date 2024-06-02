import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: String!
    name: String!
    tax_id: String!
    password: String!
  }

  type Account {
    id: String!
    account_number: String!
    user_id: String!
    balance: Int!
  }

  type Transaction {
    id: String!
    sender: String!
    receiver: String!
    value: Int!
    transaction_id: String!
  }

  type Query {
    user(id: String!): User
    calculateAvailableBalance(user_id: String!): CalculateAccountBalanceResponse
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): AuthReturnPayload!
    login(input: LoginUserInput!): AuthReturnPayload
    sendMoney(input: SendMoneyInput!): Transaction!
  }

  type AuthReturnPayload {
    user: User!
    token: String!
  }

  type CalculateAccountBalanceResponse {
    balance: Int!
  }

  input RegisterUserInput {
    name: String!
    tax_id: String!
    password: String!
  }

  input LoginUserInput {
    tax_id: String!
    password: String!
  }

  input SendMoneyInput {
    sender: String!
    receiver: String!
    value: Int!
    transaction_id: String!
  }
`;
