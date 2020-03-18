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
  rearrange() {
    // Moves data into new object structure.
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
    // Nests data into another layer
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