import IntlMessageFormat from "intl-messageformat";
import intl from "react-intl-universal";

interface ITranslationPlaceholder {
  [key: string]: string | number | Date | ITranslationPlaceholder;
}

let moduleMessages;
let currentLocale = "en-US";

export function trConfigure(messages, locale) {
  moduleMessages = messages;
  currentLocale = intl.getInitOptions().currentLocale;
  intl.load(locale);
}

export function tr(messageId, vars?: ITranslationPlaceholder) {
  return intl
    .get(`${moduleMessages[messageId].id}`, vars)
    .d(formatDefaultMessage(`${moduleMessages[messageId].message}`, vars));
}

const formatDefaultMessage = (message: string, vars: object) => {
  // check if this is a plural message
  if (message.match(/{.+,(\s+)?plural(\s+)?,/) !== null) {
    const formatter = new IntlMessageFormat(message, "en-US");
    return formatter.format(vars);
  } else {
    for (const key of Object.keys(vars)) {
      message = message.replace(
        new RegExp("\\{" + key + "\\}", "gi"),
        vars[key]
      );
    }
    return message;
  }
};
