import { format } from 'd3-format';
import dayjs from 'dayjs';
import countDecimals from './dataHelpers/countDecimals';

// Formats thousands, 1000 becomes 1k, etc.
export const formatK = format('~s');

// Formats commas, 1000 becomes 1,000
export const formatComma = (value, { defaultVal = '' } = {}) => {
  const formatter = format(',');
  if (value === undefined || value === null || Number.isNaN(value)) {
    return defaultVal;
  }
  return formatter(value);
};

// Formats commas to X dp. eg if x is 2. 1000.33532343 becomes 1,000.33
// If number of decimal places is lower than set dp, then final val will
// just use that number of dp.
export const formatCommaXDp = (value, dp = 2, { defaultVal = '' } = {}) => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return defaultVal;
  }
  const existingDp = countDecimals(value);
  const formatter = existingDp > dp ? format(`,.${dp}f`) : format(`,.${existingDp}f`);
  return formatter(value);
};

// formats commas but with 0 dp, 1000.45 becomes 1,000
export const formatCommaZeroDp = (value, { defaultVal = '' } = {}) => {
  const formatter = format(',.0f');
  if (value === undefined || value === null || Number.isNaN(value)) {
    return defaultVal;
  }
  return formatter(value);
};

// formats numbers as percent with 1 dp, eg. 49.343 becomes "49.3%".
// Second param will change dp.
export const formatPerc = (value, dp = 1, { defaultVal = '' } = {}) => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return defaultVal;
  }
  const newValue = formatCommaXDp(value, dp);
  return `${newValue}%`;
};

// cleans a list of items and defaults to 0 if val is less than 0
export const cleanAndFormatList = (items) => items.map((item) => {
  const newVal = (item && item > 0) ? formatCommaZeroDp(item) : 0;
  return newVal;
});

// formats unixTimeStamps into 'MMM D' (ie. 'Mar 9')
export const formatUnix = (value) => {
  const dateObj = dayjs.unix(value);
  const formattedDate = dateObj.format('MMM D');
  return formattedDate;
};

// formats unixTimeStamps into 'MMM D' (ie. 'Mar 9')
export const formatUnixShort = (value) => {
  const formattedDateShort = value.format('MMM D');
  return formattedDateShort;
};

// Formats a dayJs object into 'MMMM D' (eg. 'March 9')
export const formatMonthDay = (dayJsObj) => dayJsObj.format('MMMM D');
// Formats dates to show month name

// Formats a dayJs object into format: '7/15/2020')
export const formatDateSlashes = (dayJsObj) => dayJsObj.format('M/D/YYYY');


export const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};
