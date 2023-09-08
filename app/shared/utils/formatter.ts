interface IFormatter {
  toDate(value: string): string;
  toTime(value: string): string;
}

class Formatter implements IFormatter {
  toDate(value: string): string {
    const valueWhiteOutInvalidChars = value.replace(/[^\d]/g, "");
    if (!value) return value;

    if (valueWhiteOutInvalidChars.length <= 2) {
      return `${valueWhiteOutInvalidChars.slice(0, 2)}`;
    }

    if (valueWhiteOutInvalidChars.length <= 4) {
      return `${valueWhiteOutInvalidChars.slice(
        0,
        2
      )}/${valueWhiteOutInvalidChars.slice(2, 4)}`;
    }

    if (valueWhiteOutInvalidChars.length > 4) {
      return `${valueWhiteOutInvalidChars.slice(
        0,
        2
      )}/${valueWhiteOutInvalidChars.slice(
        2,
        4
      )}/${valueWhiteOutInvalidChars.slice(4, 8)}`;
    }

    return valueWhiteOutInvalidChars;
  }
  toTime(value: string): string {
    if (!value) return value;
    const valueWhiteOutInvalidChars = value.replace(/[^\d]/g, "");

    if (valueWhiteOutInvalidChars.length <= 2) return valueWhiteOutInvalidChars;

    const hour = valueWhiteOutInvalidChars.slice(0, 2);
    const minute = valueWhiteOutInvalidChars.slice(2, 4);

    return `${hour}:${minute}`;
  }
}

export const formatter = new Formatter();
