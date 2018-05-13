import moment from "moment";
import * as React from "react";
import { tr, trConfigure } from "../../utils/i18n";
import locale from "./locale";
import { messages } from "./messages";

const styledMessage = {
  background: "#eee",
  padding: "5px"
};

export const Activation = () => {
  trConfigure(messages, locale);
  return (
    <div>
      <p>Formatted date</p>
      <div style={styledMessage}>
        {tr("activationDeadline", {
          deadline: moment()
            .add(2, "days")
            .toDate()
        })}
      </div>
    </div>
  );
};
