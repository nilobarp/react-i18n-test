import * as React from "react";
import intl from "react-intl-universal";
import { tr, trConfigure } from "../../utils/i18n";
import { Activation } from "../activation/activation";
import locale from "./locale";
import { messages } from "./messages";

const styledMessage = {
  background: "#eee",
  padding: "5px"
};

export class Dashboard extends React.Component<any, any> {
  constructor(props) {
    super(props);
    trConfigure(messages, locale);
  }
  public render() {
    // if locale is AR then set direction RTL
    const { currentLocale } = intl.getInitOptions();
    return (
      <div dir={currentLocale === "ar" ? "rtl" : ""}>
        <p>
          To change language add `?lang=en / ?lang=de / ?lang=fr / ?lang=ar` to
          url or change browser language.
        </p>
        <p style={styledMessage}>Simple translation with variable</p>
        <div style={styledMessage}>
          {tr("dashboardHeader", { name: "Nilotpal" })}
        </div>
        <p>Formatted currency value</p>
        <div style={styledMessage}>
          {tr("dashboardCreditLeft", { amount: 250000 })}
        </div>
        <hr />
        <p>
          Messages are isolated per component, when we render another tr'd
          component it mustn't interfere with other components language file.
        </p>
        <Activation />
        <hr />
        <p>Plural forms</p>
        <div style={styledMessage}>
          {tr("dashboardUnreadMessages", { unreadMessageCount: 0 })}
        </div>
        <div style={styledMessage}>
          {tr("dashboardUnreadMessages", { unreadMessageCount: 1 })}
        </div>
        <div style={styledMessage}>
          {tr("dashboardUnreadMessages", { unreadMessageCount: 99 })}
        </div>
      </div>
    );
  }
}
