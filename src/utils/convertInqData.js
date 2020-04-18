    // CONVERT INQ TESTING DATA INTO OLD FORMAT

    const convertInqTestingData = (rawTestData, casesPerDay) => {
      // Positive  data
      const positive = {}
      positive["category"] = "positive"
      casesPerDay.forEach((day, idx) => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        positive[Date] = cleanTotal
        if (idx === (casesPerDay.length - 1)) {
          positive["total"] = cleanTotal
        }
      })
      // total data
      const total = {}
      total["category"] = "total"
      rawTestData.forEach((day, idx) => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        total[Date] = cleanTotal
        if (idx === (rawTestData.length - 1)) {
          total["total"] = cleanTotal
        }
      })
      // negative data
      const negative = {}
      negative["category"] = "negative"
      rawTestData.forEach((day, idx) => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        negative[Date] = cleanTotal - +positive[Date]
        if (idx === (rawTestData.length - 1)) {
          negative["total"] = cleanTotal
        }
      })
      // percent positive
      const percPos = {}
      percPos["category"] = "percent_positive"
      rawTestData.forEach((day, idx) => {
        const {Date, Total} = day
        const cleanTotal = +Total.replace(/[\s,]/,'')
        percPos[Date] = +positive[Date] / cleanTotal
        if (idx === (rawTestData.length - 1)) {
          percPos["total"] = +positive[Date] / cleanTotal
        }
      })
      return [positive, total, negative, percPos]
    }

    export default convertInqTestingData