

export const googleSheetUrl = (googleSheetId, gid=0) => {
  // Returns google sheet URL based on provided args
  return `https://docs.google.com/spreadsheets/d/e/${googleSheetId}/pub?gid=${gid}&single=true&output=csv`
}
