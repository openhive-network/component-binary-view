import data from "../data";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    import('@hiveio/component-binary-view-web-component');
  });

  return (
    <binary-view data={JSON.stringify(data)} dark />
  );
}
