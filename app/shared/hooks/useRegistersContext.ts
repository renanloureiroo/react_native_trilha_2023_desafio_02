import { useContext } from "react";
import { RegistersContext } from "../../context/RegistersContext";

export const useRegistersContext = () => {
  return useContext(RegistersContext);
};
