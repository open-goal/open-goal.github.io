import NavbarNavLink from '@theme-original/NavbarItem/NavbarNavLink';
import Link from "@docusaurus/Link";
import { useEffect, useState } from 'react';

export default function NavbarNavLinkWrapper(props) {
  let [holidaysEnabled, setHolidaysEnabled] = useState(true);

  useEffect(() => {
    if (props.label === "Button_Holidays") {
      const val = localStorage.getItem("holidays-enabled");
      if (val == "false") {
        setHolidaysEnabled(false);
      }
    }
  }, [])

  if (props.label === "Button_Holidays") {
    return (
      <>
        <img src={require("@site/static/img/holidays.png").default} style={
          {
            cursor: 'pointer', opacity: holidaysEnabled ? 1.0 : 0.25,
            marginTop: "0.25rem",
            marginBottom: "0.25rem",
            marginLeft: "0.75rem",
            marginRight: "0.75rem"
          }
        } height={"24px"} width={"24px"} onClick={() => {
          const newVal = !holidaysEnabled;
          setHolidaysEnabled(newVal);
          localStorage.setItem("holidays-enabled", newVal.toString())
          window.dispatchEvent(new Event("local-storage-update"));
        }}></img>
      </>
    );
  }
  return (
    <>
      <NavbarNavLink {...props} />
    </>
  );
}
