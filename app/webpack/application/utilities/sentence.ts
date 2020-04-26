import { capitalize, initial, last } from "lodash";

const MULTI = ", ";
const FINAL = " and ";
const TERMINATOR = ".";

export const sentence = (phrases: string[]): string => {
  const phrase = ((): string => {
    if (phrases.length > 2) {
      return initial(phrases).join(MULTI) + FINAL + last(phrases);
    } else {
      return phrases.join(FINAL);
    }
  })();
  return capitalize(phrase) + TERMINATOR;
};
