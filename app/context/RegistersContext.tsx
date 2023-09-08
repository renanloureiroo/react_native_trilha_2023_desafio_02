import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { storage } from "../shared/services/storage";

export type Register = {
  date: string;
  name: string;
  description: string;
  hour: string;
  isPositive: boolean;
};
type Registers = Record<string, Register[]>;

interface RegistersContextProps {
  hydrated: boolean;
  registers: Registers;
  refreshRegisters: () => Promise<void>;
}

interface RegisterProviderProps {
  children: ReactNode;
}

export const RegistersContext = createContext<RegistersContextProps>(
  {} as RegistersContextProps
);

export const RegistersProvider: FC<RegisterProviderProps> = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [registers, setRegisters] = useState<Registers>({});

  const fetchRegister = async () => {
    const registers = await storage.get<Register[]>("@diet:registers");

    let formatedRegisters: Registers = {};

    if (registers) {
      registers.forEach((register) => {
        if (!formatedRegisters[register.date]) {
          formatedRegisters = {
            ...formatedRegisters,
            [register.date]: [],
          };
        }

        formatedRegisters[register.date] = [
          register,
          ...formatedRegisters[register.date],
        ];
      });
    }

    setRegisters(formatedRegisters);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        fetchRegister();
      } catch (e) {
        console.log(e);
      } finally {
        setHydrated(true);
      }
    };

    fetch();
  }, []);

  const getRegisterByDate = useCallback(
    (date: string) => {
      return registers[date] ?? [];
    },
    [registers]
  );

  const refreshRegisters = useCallback(async () => {
    fetchRegister();
  }, []);
  return (
    <RegistersContext.Provider
      value={{
        hydrated,
        registers,
        refreshRegisters,
      }}
    >
      {children}
    </RegistersContext.Provider>
  );
};
