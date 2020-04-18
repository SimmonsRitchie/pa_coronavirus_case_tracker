    // CONVERT INQ TESTING DATA INTO OLD FORMAT

    const convertInqTestingData = (rawTestData, casesPerDay) => {
      // Positive  data
      const positive = {}
      positive["category"] = "positive"
      casesPerDay.forEach(day => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        positive[Date] = cleanTotal
      })
      // total data
      const total = {}
      total["category"] = "total"
      rawTestData.forEach(day => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        total[Date] = cleanTotal
      })
      // negative data
      const negative = {}
      negative["category"] = "negative"
      rawTestData.forEach(day => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        negative[Date] = cleanTotal - +positive[Date]
      })
      // percent positive
      const percPos = {}
      percPos["category"] = "percent_positive"
      rawTestData.forEach(day => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        percPos[Date] = +positive[Date] / cleanTotal
      })
      return [positive, total, negative, percPos]
    }

    export default convertInqTestingData