import React, { useContext } from "react";
import {Dot} from "./Formatters";
import { DataContext } from "../context/DataContext";
import { determineMostRecentDate } from "../utils/parse";

const Footer = () => {
  // Get date of last update based on data columns
  const { data } = useContext(DataContext);
  const lastUpdated = determineMostRecentDate([
    data.paCases.meta.mostRecentDate,
    data.paDeaths.meta.mostRecentDate
  ]);
  const formattedDate = lastUpdated
    ? lastUpdated.format("MMM Do, YYYY")
    : "n/a";
  const spotlightUrl = "https://www.spotlightpa.org"

  const CREDITS = [
    {
      creditType: "Source",
      name: "Pa Department of Health data compiled by Spotlight PA"
    },
    {
      creditType: "Last updated",
      name: formattedDate
    },
    { 
      creditType: "Interactive", 
      name: <span>Daniel Simmons-Ritchie, <a href={spotlightUrl} target="_blank">Spotlight PA</a></span> }
  ];

  return (
    <div>
      <div className="footer__container">
        <div>
          <div className="footer__notes is-size-7">
            <i>{/* Insert footnote if needed */}</i>
          </div>
          <div className="footer__credit-container">
            <span className="is-size-7 has-text-grey">
              {CREDITS.map((item, idx) => {
                const { creditType, name } = item;
                const includeDot = idx + 1 < CREDITS.length;
                return (
                  <CreditLine
                    key={idx}
                    creditType={creditType}
                    name={name}
                    includeDot={includeDot}
                  />
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreditLine = ({ creditType, name, includeDot = false }) => {
  return (
    <React.Fragment>
      {creditType}: {name} {includeDot && <Dot />}
    </React.Fragment>
  );
};

export default Footer;
