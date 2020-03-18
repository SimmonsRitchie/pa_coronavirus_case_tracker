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


const createLookUpTable = (arr, key) => {
  return arr.reduce((accumulator, d) => {
    accumulator[d[key]] = d;
    return accumulator;
  }, {});
}

export const createMergedCountyData = (arrCases, arrDeaths) => {
  // convert arr2 into look up table
  const arrDeathsLookUp = createLookUpTable(arrDeaths, "county")
  const mergedData =[]
  arrCases.forEach((item, idx) => {
    const {county, total} = item
    if (county !== "total") {
      mergedData.push({
        county, 
        casesTotal: total,
        deathsTotal: arrDeathsLookUp[county].total
      }) 
    }
  })
  const sortedData = mergedData.sort((a, b) => b.casesTotal - a.casesTotal)
  return sortedData
}