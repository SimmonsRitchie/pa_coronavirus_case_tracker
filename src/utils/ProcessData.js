import moment from 'moment'
import {getRowByName} from "./parse"

class ProcessData {
  constructor(data) {
    /* @params:
    * data (array): Array of objects, each representing a row of a google sheet.
    */
    this.data = data
  }

  // PUBLIC METHODS
  transposeInqData() {
    let transposedData = []
    // get county list from first row
    const { Date, ...countyData } = this.data[0]
    const countyNames = Object.keys(countyData)
    countyNames.forEach(countyName => {
      const newRow = {}
      if (countyName.toLowerCase() === 'total') {
        newRow["county"] = 'total'
      } else {
        newRow["county"] = countyName
      }
      this.data.forEach((row, idx) => {
        const { Date } = row
        newRow[Date] = row[countyName]
        if (idx === (this.data.length - 1)) {
          newRow["total"] = row[countyName]
        }
      })
      transposedData.push(newRow)
    })
    this.data = transposedData
    return this
  }


  rearrange(primaryKey) {
    /*
    * Expects am array of objects and transforms each object into a tidier structure.

    * Eg. Expects each object to be structured as follows: 
    *   
    *   {
    *   primaryKey: str,
    *   2020-03-06: str
    *   2020-03-07: str
    *   ...
    *  }
    * 
    * This be transformed into a new object. 'total' and 'date' key-value pairs are added. Existing dates are nested
    * as an array under 'dates'. In addition, dates are now represented as Moment instances. 
    * 
    * Eg.
    * 
    *   {
    *   primaryKey: str,
    *   total: int
    *   dates: [
    *     { data: <Moment Obj>, value: int},
    *     { data: <Moment Obj>, value: int},
    *     ...
    *   ]
    * }
    * 
    * @params: primaryKey: Str. Name of object key that describes the data the object holds. Eg. 'county' or 'category'.
    */
    this.data = this.data.map(item => {
      const total = item.total
      const primaryVal = item[primaryKey]
      const dates = []
      Object.keys(item).forEach(key => {
        const dateValue = moment(key, "YYYY-MM-DD")
        if (dateValue.isValid()){
          dates.push({
            "date": dateValue, // store as moment instance
            "value": this._cleanNumber(item[key])
          })
        }
      })

      return {
        [primaryKey]: primaryVal,
        dates,
        total: this._cleanNumber(total) 
      }
    })
    return this
  }



  nest(dataLabel) {
    /* Returns current data var as an object and nests current data structure as a key of that object
    *
    * @param: dataLabel. Str. Key name for new data structure.
    */ 
    this.data = {
      [dataLabel]: this.data
    }
    return this
  }

  addCountyMeta({dataLabel, primaryKey}) {
    /* Adds meta data to this.data based on data in this.data[dataLabel] 
    * @param: dataLabel. Str. Key name on data object where data is located
    * @param: primaryKey: Str. Key name of each obj in data that serves as the primary key 
    * (ie. column title)
    */
    const totalRow = getRowByName(this.data[dataLabel], primaryKey, "total")
    const mostRecentDate = moment.max(totalRow.dates.map(item => item.date))
    const oldestDate = moment.min(totalRow.dates.map(item => item.date))
    const meta = {
      total: totalRow.total,
      mostRecentDate,
      oldestDate
    }
    this.data["meta"] = meta
    return this
  }

  addTestsMeta({dataLabel, primaryKey}) {
    /* Adds meta data to this.data based on data in this.data[dataLabel] */
    const totalRow = getRowByName(this.data[dataLabel], primaryKey, "total")
    const mostRecentDate = moment.max(totalRow.dates.map(item => item.date))
    const oldestDate = moment.min(totalRow.dates.map(item => item.date))
    const meta = {
      mostRecentDate,
      oldestDate
    }
    this.data["meta"] = meta
    return this
  }


  getData() {
    return this.data
  }

  // PRIVATE METHODS
  _cleanNumber(str) {
    // Converts string into a clean number
    if (typeof str === 'string') {
      let clean = str.replace(/[\s,]/,'')
      return +clean
    } else {
      return str
    }
  }

}

export default ProcessData