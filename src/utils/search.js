

export const applySearchTerm = (searchString, searchData) => {
  const matchedSearch = searchData.filter(item => item.county.toLowerCase().includes(searchString) )
  console.log(matchedSearch)
  return matchedSearch
}