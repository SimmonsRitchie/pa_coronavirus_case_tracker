import moment from 'moment'

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
        const validDate = moment(key, "YYYY-MM-DD").isValid()
        if (validDate){
          dates.push({
            "date": key,
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

  getData() {
    return this.data
  }

}

export default ProcessData