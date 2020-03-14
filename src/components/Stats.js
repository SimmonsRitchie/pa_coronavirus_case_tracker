import React from 'react';

const Stats = ({confirmedCases="...", deaths="..."}) => {
  return ( 
    <div>
    <div>Cases</div>
    <div>{confirmedCases}</div>
    <div>Deaths</div>
    <div>{deaths}</div>
    </div> );
}
 
export default Stats;