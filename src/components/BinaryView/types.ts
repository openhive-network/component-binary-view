interface INode {
  key: string;
  offset: number;
  size: number;
}

export interface IDataNode extends INode {
  type: "pod";
  value: string;
}

export interface IObjectNode extends INode {
  type: "object";
  value: Array<TNode>
};

export interface IArrayNode extends INode {
  type: "array";
  length: number;
  value: Array<TNode>
};

export type TNode = IDataNode | IObjectNode | IArrayNode;

export interface IBinaryView {
  binary: string;
  offsets: Array<TNode>;
}