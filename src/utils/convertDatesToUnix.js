const convertDatesToUnix = (data) =>
  /**
   * Takes an array of objects. Each object is expected to have a key
   * called 'date' with a value that's a dayJS instance.
   *
   * Returns an array with dayJS object converted into a unix timestamp.
   */
  data.map((item) => {
    const unixDate = item.date.unix();
    return { ...item, date: unixDate };
  });

export default convertDatesToUnix;
