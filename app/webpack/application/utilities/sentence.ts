import { capitalize, initial, last } from "lodash";

const MULTI_SEPARATOR = ", ";
const FINAL_SEPARATOR = " and ";
const TERMINATOR = ".";

const sentence = (phrases: string[]): string => {
  const phrase = (() => {
    if (phrases.length > 2) {
      return initial(phrases).join(MULTI_SEPARATOR) + FINAL_SEPARATOR + last(phrases);
    } else {
      return phrases.join(FINAL_SEPARATOR);
    }
  })();
  return capitalize(phrase) + TERMINATOR;
};

export { sentence };
