import moment from 'moment'


export const determineMostRecentDate = (arrOfDates) => {
  // Expects an array of moment objects, return the most recent date
  return moment.max(arrOfDates)
}


export const getRowByName = (data, colName, rowName) => {
  // Expects an array of objects, representing rows in a Google Sheet, and extracts the object (ie row)
  // that matches the row value in a given column.
  return data.filter(item => item[colName].toLowerCase() === rowName.toLowerCase())[0];
}


export const getTotalFromSheet = (sheet) => {
  // Returns the value of the total row in the total column of a given sheet
  const totalRow = getRowByName(sheet, "county","total")
  return totalRow.total
}