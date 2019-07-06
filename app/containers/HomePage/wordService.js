const filterWords = (list, searchText) => {
  const val = searchText.toLowerCase();
  const found = list.hasOwnProperty(val);
  return Object.values((found) ? list[val] : list);
};

export {
  filterWords
};
