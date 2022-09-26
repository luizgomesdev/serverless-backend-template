interface IStartOptions {
  port?: number;
  inMemory?: boolean;
  migrate?: boolean;
  seed?: boolean;
  heapInitial?: string;
  convertEmptyValues?: boolean;
}

interface ISeedSourceOptions {
  table: string;
  sources: string[];
}
interface ISeedOptions {
  [x: string]: {
    sources: ISeedSourceOptions[];
  };
}

export interface ILocalDynamoDBConfig {
  stages: string[];
  start: IStartOptions;
  seed?: ISeedOptions;
}
