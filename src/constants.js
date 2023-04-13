export const INITIAL_STATE_STORE = {
  loading: false,
  outputSetting: {
    timeFormat: "Day",
    viewFormat: "Graph",
    tempUnit: "Celcius"
  },
  filters: {
    sort: "Alphabetical",
    cycle: "All",
    breed: "All",
    text: ""
  },
  data: {
    cows: [],
    selected: null,
    selectedData: [],
    selectedLoading: false,
    error: null,
    mode: null
  }
};

export const SORT_BY = ["Alphabetical", "High Temp", "High PH", "Activity"];

export const CYCLES = [
  { id: "1", text: "One" },
  { id: "2", text: "Two" },
  { id: "3", text: "Three" },
  { id: "4", text: "Four" },
  { id: "5", text: "Five" }
];

export const BREEDS = [
  { id: "redAngus", text: "Red Angus" },
  { id: "holstein", text: "Holstein" }
];

export const VIEW_FORMATS = ["Table", "Graph"];

export const TIME_FORMATS = ["Day", "Week", "Month", "Year"];
