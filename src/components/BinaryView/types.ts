export interface IDataNode {
  key: string;
  value: string;
  offset: number;
  length: number;
}

export interface IObjectNode {
  key: string;
  isObject: true;
  offset: number;
  objectSize: number;
};

export interface IBinaryView {
  binary: string;
  offsets: Array<IDataNode | IObjectNode>;
}