

export const applySearchTerm = ({searchText, searchData, searchDataKey}) => {
  /*
  * @param: searchString. Str. Search term
  * @param: searchData. Arr. Array of objects to search
  * @param: searchProp. Key of each object that we want to search 
  *
  */
  const cleanSearchText = searchText.toLowerCase()
  const matchedSearch = searchData.filter(item => item[searchDataKey].toLowerCase().includes(cleanSearchText) )
  return matchedSearch
}