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
    value: String!
    transaction_id: String!
  }

  type Query {
    user(id: String!): User
  }

  type Mutation {
    registerUser(
      name: String!
      tax_id: String!
      password: String!
    ): AuthReturnPayload!
    login(tax_id: String!, password: String!): AuthReturnPayload
  }

  type AuthReturnPayload {
    user: User!
    token: String!
  }
`;
