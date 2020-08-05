import moment from "moment"

const filterCommonDates = (arrOfArrs) => {
  /**
   * Takes an array of objects representing selected region data, gets common date range
   *
   * @param {arr[Obj]} arrOfArrs: An array of objects representing region data. Expects each object to be
   *  structured like:
   *   {
   *    date: <momentJs instance>,
   *    value: int,
   *  }
   */

  // 1) Get most recent of all oldests date of all regions
  const arrOfOldestDates = arrOfArrs.map((arrOfObjs) => {
    const arrayOfDates = arrOfObjs.map(item => item.date)
    return moment.min(arrayOfDates)
  })
  const minDateCutOff = moment.max(arrOfOldestDates)

  // 2) Get oldest of most recent date of all regions
  const arrOfMostRecentDates = arrOfArrs.map((arrOfObjs) => {
    const arrayOfDates = arrOfObjs.map(item => item.date)
    return moment.max(arrayOfDates)
  })
  const maxDateCutOff = moment.max(arrOfMostRecentDates)


  // 3) Filter chartData for each region by cut off dates and update each region object.
  const clnArrOfArrs = arrOfArrs.map((arrOfObjs) => {
    return arrOfObjs.filter((datum) => {
      if (datum.date.unix() >= minDateCutOff.unix() && datum.date.unix() <= maxDateCutOff.unix()) {
        return datum;
      }
    });
  });
  return clnArrOfArrs
};

export default filterCommonDates;
