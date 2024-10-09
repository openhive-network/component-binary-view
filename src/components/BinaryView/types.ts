export interface IDataNode {
  key: string;
  isObject?: false;
  value: string;
  offset: number;
  length: number;
}

export interface IObjectNode {
  key: string;
  isObject: true;
  offset: number;
  objectSize: number;
  value: Array<IDataNode | IObjectNode>
};

export interface IBinaryView {
  binary: string;
  offsets: Array<IDataNode | IObjectNode>;
}