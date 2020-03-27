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
  rearrange(primaryKey) {
    /*
    * Expects am array of objects and transforms each object into a tidier structure.
    * Eg. Expects object as below, with each date as a separate key: 
    *   
    *   {
    *   primaryKey: str,
    *   2020-03-06: int
    *   2020-03-07: int
    *   ...
    *  }
    * 
    * Will be transformed, with new 'total' and 'date' key-value pairs. Existing dates will be nested under 'dates'
    * as a list, each the objects in the list will have each date. Their value represented as Moment instances. Eg.
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
    * @params: primaryKey: Str. Name of object key that describes the data the object holds. Eg. 'county'.
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
        county: primaryVal,
        dates,
        total: this._cleanNumber(total) 
      }
    })
    return this
  }

  _cleanNumber(str) {
    // Converts string into a clean number
    let clean = str.replace(/[\s,]/,'')
    return + clean
  }

  nest(keyName) {
    // Returns current data var as an object and nests current data structure as a key of that object.
    this.data = {
      [keyName]: this.data
    }
    return this
  }

  addSummary(keyName) {
    // Adds meta data to this.data based on data in this.data[keyName]
    const totalRow = getRowByName(this.data[keyName], "county", "total")
    const mostRecentDate = moment.max(totalRow.dates.map(item => item.date))
    const oldestDate = moment.min(totalRow.dates.map(item => item.date))
    const meta = {
      county: "meta",
      total: totalRow.total,
      mostRecentDate,
      oldestDate
    }
    this.data["meta"] = meta
    return this
  }

  getData() {
    return this.data
  }

}

export default ProcessData