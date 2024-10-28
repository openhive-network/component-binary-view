import type { IBinaryViewNode } from "@hiveio/wax";

export type TNode = IBinaryViewNode;

export interface IBinaryView {
  binary: string;
  offsets: Array<IBinaryViewNode>;
}

export interface IBinaryViewProps {
   // We use string due to DOM limitations in propagating data to Web Components
  data: IBinaryView | string;
  rootnode?: string; // Defaults to "transaction"
  rowbytes?: number | string;
  uppercase?: boolean | string;
  dark?: boolean | string;
}

export const BinaryViewEmits = ["copy"] as const;

export type TBinaryViewEmits = typeof BinaryViewEmits[number];
export type TBinaryViewPropKeys = keyof IBinaryViewProps;
