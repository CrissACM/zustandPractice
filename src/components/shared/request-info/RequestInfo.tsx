import { useEffect, useState } from "react";
import { tesloApi } from "../../../api/teslo.api";

export function RequestInfo() {
  const [info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((res) => setInfo(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h2>Información</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
}
