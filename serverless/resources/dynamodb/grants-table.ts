import { IDynamoDBTableResource } from "./../../@types/dynamodb-table-config";

export const grantsTableResource: IDynamoDBTableResource = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: "${self:provider.environment.GRANTS_TABLE_NAME}",
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],

    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};
