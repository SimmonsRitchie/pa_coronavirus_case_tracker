

export const applySearchTerm = (searchString, searchData) => {
  var matchedSearch = [];
  for (var i=0; i<searchData.length; i++) {
    if (searchData[i].county.indexOf(searchString) > -1) {
      matchedSearch[i]=1;
    }
  }
  return matchedSearch
}