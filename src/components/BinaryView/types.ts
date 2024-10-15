import { IBinaryViewNode } from "@hiveio/wax";

export type TNode = IBinaryViewNode;

export interface IBinaryView {
  binary: string;
  offsets: Array<IBinaryViewNode>;
}