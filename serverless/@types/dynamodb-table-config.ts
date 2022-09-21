export interface IDynamoDBTableResource {
  Type: "AWS::DynamoDB::Table";
  Properties: {
    TableName: string;
    AttributeDefinitions: {
      AttributeName: string;
      AttributeType: string;
    }[];
    KeySchema: {
      AttributeName: string;
      KeyType: string;
    }[];
    GlobalSecondaryIndexes?: {
      IndexName: string;
      KeySchema: {
        AttributeName: string;
        KeyType: string;
      }[];
      Projection: {
        ProjectionType: string;
        NonKeyAttributes?: string[];
      };
      ProvisionedThroughput?: {
        ReadCapacityUnits: number;
        WriteCapacityUnits: number;
      };
    }[];
    ProvisionedThroughput?: {
      ReadCapacityUnits: number;
      WriteCapacityUnits: number;
    };
  };
}
