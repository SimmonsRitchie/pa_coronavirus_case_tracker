/* Footer: insert credit, footnotes and data source.

Note: The logo can look awkward depending on the footnote text (especially if it wraps).
You may need to adjust the css to hide the spotlight logo for smaller screen widths or
simply remove it entirely.
*/

import React from "react";
import Dot from "./Formatters";

const Footer = ({ lastUpdated }) => {
  const spotlight = "https://www.spotlightpa.org/";
  const lastUpdatedClean = lastUpdated ? lastUpdated : "n/a"

  const CREDITS = [
    { creditType: "Source", name: "Pa Department of Health data compiled by Spotlight PA" },
    { creditType: "Last updated", name: lastUpdated },
    { creditType: "Interactive", name: "Daniel Simmons-Ritchie" }
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
