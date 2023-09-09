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
export type Registers = Record<string, Register[]>;

export interface IGetRegisterDTO {
  date: string;
  name: string;
  hour: string;
}

export interface RegisterWithIndex {
  register: Register;
  index: number;
}

export type Statistics = {
  positive: number;
  negative: number;
  total: number;
  percentageOfPositiveRegister: number;
  percentageOfNegativeRegister: number;
};

interface RegistersContextProps {
  hydrated: boolean;
  registers: Registers;
  refreshRegisters: () => Promise<void>;
  getRegister: (data: IGetRegisterDTO) => RegisterWithIndex | undefined;
  deleteRegister: (data: IGetRegisterDTO) => Promise<void>;
  updateRegister: (data: RegisterWithIndex) => Promise<void>;
  getStatistics: () => Statistics;
}

interface RegisterProviderProps {
  children: ReactNode;
}

export const RegistersContext = createContext<RegistersContextProps>(
  {} as RegistersContextProps
);

export const RegistersProvider: FC<RegisterProviderProps> = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [registers, setRegisters] = useState<Registers>({} as Registers);

  const fetchRegister = async () => {
    const registersByStorage = await storage.get<Registers>("@diet:registers");

    if (!registersByStorage) {
      return;
    }

    setRegisters(registersByStorage);
  };

  const getRegister = useCallback(
    ({ date, hour, name }: IGetRegisterDTO): RegisterWithIndex => {
      const registerIndex = registers?.[date].findIndex(
        (register) => register.hour === hour && register.name === name
      );

      return {
        register: registers?.[date][registerIndex],
        index: registerIndex,
      };
    },
    [registers]
  );

  const refreshRegisters = useCallback(async () => {
    fetchRegister();
  }, []);

  const deleteRegister = useCallback(
    async ({ date, hour, name }: IGetRegisterDTO) => {
      try {
        let updatedRegisters = {};
        const updatedRegistersDate = registers[date].filter(
          (register) => register.hour !== hour && register.name !== name
        );
        if (updatedRegistersDate.length === 0) {
          Object.entries(registers).forEach(([key, value]) => {
            if (key !== date) {
              updatedRegisters = {
                ...updatedRegisters,
                [key]: value,
              };
            }
          });

          setRegisters(updatedRegisters);
          await storage.save("@diet:registers", updatedRegisters);
          return;
        }
        updatedRegisters = {
          ...registers,
          [date]: updatedRegistersDate,
        };

        setRegisters(updatedRegisters);

        await storage.save("@diet:registers", updatedRegisters);
      } catch (error) {
        console.log(error);
      }
    },
    [registers]
  );

  const updateRegister = useCallback(
    async ({ register, index }: RegisterWithIndex) => {
      try {
        const updatedRegistersDate = registers[register.date].map(
          (_, indexRegister) => {
            if (indexRegister === index) {
              return {
                ...register,
              };
            }

            return register;
          }
        );
        const updatedRegisters = {
          ...registers,
          [register.date]: updatedRegistersDate,
        };
        setRegisters(updatedRegisters);
        await storage.save("@diet:registers", updatedRegisters);
      } catch (error) {}
    },
    []
  );

  const getStatistics = useCallback(() => {
    const registersCount = Object.entries(registers).reduce(
      (acc, currentvalue) => {
        if (currentvalue[1].length === 0) {
          return acc;
        }

        const positiveRegisters = currentvalue[1].filter(
          (item) => item.isPositive
        );
        console.log(positiveRegisters);

        const negativeRegisters = currentvalue[1].filter(
          (item) => !item.isPositive
        );
        console.log(negativeRegisters);

        const totalRegisters = currentvalue[1].length;
        console.log(totalRegisters);

        return {
          positive: acc.positive + positiveRegisters.length,
          negative: acc.negative + negativeRegisters.length,
          total: acc.total + totalRegisters,
        };
      },
      {
        positive: 0,
        negative: 0,
        total: 0,
      }
    );

    return {
      positive: registersCount.positive,
      negative: registersCount.negative,
      total: registersCount.total,
      percentageOfPositiveRegister:
        100 * (registersCount.positive / registersCount.total),
      percentageOfNegativeRegister:
        100 * (registersCount.negative / registersCount.total),
    };
  }, [registers]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchRegister();
        setHydrated(true);
      } catch (e) {
        console.log(e);
        setHydrated(true);
      }
    };

    fetch();
  }, []);

  return (
    <RegistersContext.Provider
      value={{
        hydrated,
        registers,
        refreshRegisters,
        getRegister,
        deleteRegister,
        updateRegister,
        getStatistics,
      }}
    >
      {children}
    </RegistersContext.Provider>
  );
};
