// configHeader.jsx
import { useContext } from "react";
import { ContextGlobal } from "../../global.context";

export const useConfigHeaders = () => {
  const { state: { jwt } } = useContext(ContextGlobal);

  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    }
  };
  return config;
};
