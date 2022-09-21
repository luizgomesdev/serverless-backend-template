export interface IIAMRoleResource {
  Type: "AWS::IAM::Role";
  Properties: {
    PolicyName: string;
    PolicyDocument: {
      Version: string;
      Statement: {
        Effect: string;
        Action: string[];
        Resource: string | string[];
      }[];
    };
  };
}
