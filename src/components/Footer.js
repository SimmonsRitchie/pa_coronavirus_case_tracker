/* Footer: insert credit, footnotes and data source.

Note: The logo can look awkward depending on the footnote text (especially if it wraps).
You may need to adjust the css to hide the spotlight logo for smaller screen widths or
simply remove it entirely.
*/

import React from "react";

const Footer = () => {
  const spotlight = "https://www.spotlightpa.org/";
  return (
    <div>
      <div className="footer__container">
        <div>
          <div className="footer__notes is-size-7">
            <i>
              You can enter a footnote for the widget here if you'd like, explaining some aspect of it that might not be clear.
            </i>
          </div>
          <div className="footer__byline-source is-size-7 has-text-grey">
            <span>Source: Source of data.</span>
            <span className="footer__source">
              <span className="footer__separator"></span>
              <span className="footer__byline">
                Chart: Your Name Here,{" "}
                <a href={spotlight}>Spotlight PA</a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
