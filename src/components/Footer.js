import React, {useContext} from "react";
import Dot from "./Formatters";
import { DataContext } from "../context/DataContext";
import { getMostRecentDate} from "../utils/parse"

const Footer = () => {
  // Get date of last update based on data columns
  const { data } = useContext(DataContext);
  const lastUpdated = getMostRecentDate(data.paCases, data.paDeaths)
  console.log(lastUpdated)

  const CREDITS = [
    { creditType: "Source", name: "Pa Department of Health data compiled by Spotlight PA" },
    { creditType: "Last updated", name: lastUpdated },
    { creditType: "Interactive", name: "Daniel Simmons-Ritchie, Spotlight PA" }
  ];

  return (
    <div>
      <div className="footer__container">
        <div>
          <div className="footer__notes is-size-7">
            <i>
              Cases include presumptive and confirmed.
            </i>
          </div>
          <div className="footer__credit-container">
          {CREDITS.map((item, idx) => {
            const {creditType, name} = item
            const includeDot = (idx + 1) < CREDITS.length
            return <CreditLine
              key={idx}
              creditType={creditType}
              name={name}
              includeDot={includeDot}
            />}
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CreditLine = ({ creditType, name, includeDot = false }) => {
  return (
    <span className="footer__credit-line is-size-7 has-text-grey">
      {creditType}: {name} {includeDot && <Dot />}
    </span>
  );
};

export default Footer;
