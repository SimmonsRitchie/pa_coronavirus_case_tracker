import React from 'react';
import PropTypes from 'prop-types';
import { formatUnix, formatComma } from '../../utils/formatters'
import TooltipWrapper from '../TooltipWrapper';
import moment from 'moment';

const CumulativeTooltip = ({ active, payload, label }) => {
  if (active) {
    const formattedLabel = formatUnix(label);
    const tooltipContent = [
      {
        name: 'Total tests',
        val: formatComma(payload[1].value),
      },
      {
        name: 'Positive',
        val: formatComma(payload[0].value),
        pct: formatComma(
          ((payload[0].value / payload[1].value) * 100).toFixed(1),
        ),
      },
    ];

    return (
      <TooltipWrapper label={formattedLabel}>
        {tooltipContent.map((item) => {
          const { name, val, pct } = item;
          return <TooltipItem key={name} label={name} val={val} pct={pct} />;
        })}
      </TooltipWrapper>
    );
  }
  return null;
};

const TooltipItem = ({ label, val, pct }) => (
  <div>
    {label}
    {': '}
    <span className="data-display-tooltip__value">{val}</span>
    {pct && (
      <span className="data-display-tooltip__value">
        {' '}
        (
        {pct}
        %)
      </span>
    )}
  </div>
);

CumulativeTooltip.defaultProps = {
  label: null,
};

CumulativeTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(moment),
  ]),
};

export default CumulativeTooltip;
