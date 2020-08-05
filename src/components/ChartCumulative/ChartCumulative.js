/* eslint-disable react/prop-types */
import React from 'react';

import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatUnix, formatK } from '../../utils/formatters'
import { COLORS } from '../../utils/constants/colors';
import CumulativeTooltip from './CumulativeTooltip';


const ChartCumulative = ({
  data, customLegend, testsTotalKey, posTotalKey,
}) => (
  <ResponsiveContainer>
    <AreaChart
      margin={{
        top: 0,
        right: 20,
        left: 0,
        bottom: 5,
      }}
      width={150}
      height={40}
      data={data}
    >
      <XAxis
        dataKey="date"
        tick={{ fontSize: 12 }}
        type="category"
        tickFormatter={formatUnix}
      />
      <YAxis
        tick={{ fontSize: 12 }}
        tickFormatter={formatK}
        width={40}
      />
      <Tooltip
        content={({ active, payload, label }) => (
          <CumulativeTooltip active={active} payload={payload} label={label} />
        )}
      />

      <Area
        type="monotone"
        dataKey={posTotalKey}
        stackId="1"
        stroke={COLORS.tests[0]}
        fill={COLORS.tests[0]}
      />
      <Area
        type="monotone"
        dataKey={testsTotalKey}
        stackId="2"
        stroke={COLORS.tests[1]}
        fill={COLORS.tests[1]}
      />
      <Legend
        verticalAlign="top"
        align="left"
        iconType="square"
        iconSize={10}
        content={customLegend}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default ChartCumulative;
