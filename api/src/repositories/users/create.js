const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

const dynamodb = new AWS.DynamoDB.DocumentClient()

const createUser = async ({
  name,
  email,
  password
}) => {
  const id = uuidv4()

  const now = new Date().toISOString()

  const user = {
    id,
    name,
    email,
    password,
    created_at: now,
    updated_at: now
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE_USERS,
    Item: user
  }

  await dynamodb.put(params).promise()

  return user;
}

module.exports = createUser;