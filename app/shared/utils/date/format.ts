import { format as DFNSFormat } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IFormatDate {
  date: string | Date;
  format?: string;
}

interface IDateProvider {
  format({ date, format }: IFormatDate): string;
}

class DateFNSProvider implements IDateProvider {
  format({ date, format = "dd/MM/yyyy" }: IFormatDate): string {
    return DFNSFormat(new Date(date), format, {
      locale: ptBR,
    });
  }
}

export { DateFNSProvider };
