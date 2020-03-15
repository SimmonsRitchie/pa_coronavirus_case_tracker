import moment from 'moment'

const extractDateFromData = (sheet) => {
  // 1) Get the total row
  const totalRow = getRowByName(sheet, "county","total")
  // 2) Get second to last item in total row 
  const dateStr = getSecondToLastCol(totalRow)
  // 3) Convert to moment js instance for comparison
  const date = moment(dateStr, "YYYY-MM-DD")
  return date
}

const getRowByName = (data, colName, rowName) => {
  // Expects an array of objects, representing rows in a Google Sheet, and extracts the object (ie row)
  // that matches the row value in a given column.
  return data.filter(item => item[colName].toLowerCase() === rowName.toLowerCase())[0];
}

const getSecondToLastCol = (row) => {
  // Converts an object into an array and extracts second to last key.
  return Object.keys(row).slice(-2,-1)[0]; 
}

export const getMostRecentDate = (sheet1, sheet2) => {
  // Gets the most recent date by comparing the most recent date in two sheets
  const date1 = extractDateFromData(sheet1)
  const date2 = extractDateFromData(sheet2)
  let mostRecent
  if (date1.isAfter(date2)) {
    mostRecent = date1
  } else {
    mostRecent = date2
  }
  // format as string
  return mostRecent.format("MMM Do, YYYY")
}

export const getTotalFromSheet = (sheet) => {
  // Returns the value of the total row in the total column of a given sheet
  const totalRow = getRowByName(sheet, "county","total")
  return totalRow.total
}