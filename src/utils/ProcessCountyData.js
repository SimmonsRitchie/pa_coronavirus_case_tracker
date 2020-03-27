import moment from 'moment'
import {getRowByName} from "./parse"

class ProcessCountyData {
  constructor(data) {
    /* @params:
    * data (array): Array of objects, each representing a row of a google sheet.
    */
    this.data = data
  }

  // PUBLIC METHODS
  rearrange() {
    /*
    * Expects am array of objects and transforms each object into a tidier structure.
    * Eg. structure like this, with each date as a separate key: 
    *   
    *   Array<Object<county: str, 2020-03-06: int, 2020-03-07: int, 2020-03-07: int...>>
    * 
    * Will be transformed to : Array<Object<county: str, dates: Array<2020-03-06: int, 2020-03-07: int, ...>, total: int>
    */
    this.data = this.data.map(item => {
      const {county, total} = item
      const dates = []
      Object.keys(item).forEach(key => {
        const dateValue = moment(key, "YYYY-MM-DD")
        if (dateValue.isValid()){
          dates.push({
            "date": dateValue, // store as moment instance
            "count": +item[key]
          })
        }
      })

      return {
        county,
        dates,
        total: +total 
      }
    })
    return this
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

export default ProcessCountyData