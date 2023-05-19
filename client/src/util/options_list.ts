const optionsList = {
  types: {
    name: "types",
    dafault: "Select a type",
    choices: ["Earthquake", "Quarry Blast", "Ice Quake", "Explosion"],
  },
  mag: {
    name: "mag",
    dafault: "Select magnitude level",
    choices: ["2.5", "5.5", "6.1", "7", "8"],
  },
  dateRange: {
    name: "dateRange",
    dafault: "Select date range",
    choices: ["7", "14", "21", "30"],
  },
  sortOption: {
    name: "sortOption",
    dafault: "Sort By",
    choices: ["Largest Magnitude First", "Smallest Magnitude First"],
    values: ["desc", "asc"],
  },
};

export default optionsList;
