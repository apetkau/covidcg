import { observable, action } from 'mobx';

const NORM_COUNTS = 'NORM_COUNTS';
const NORM_PERCENTAGES = 'NORM_PERCENTAGES';
export const NORM_MODES = {
  NORM_COUNTS,
  NORM_PERCENTAGES,
};

const COUNT_NEW = 'COUNT_NEW';
const COUNT_CUMULATIVE = 'COUNT_CUMULATIVE';
export const COUNT_MODES = {
  COUNT_NEW,
  COUNT_CUMULATIVE,
};

const DATE_BIN_DAY = 'DATE_BIN_DAY';
const DATE_BIN_WEEK = 'DATE_BIN_WEEK';
const DATE_BIN_MONTH = 'DATE_BIN_MONTH';
export const DATE_BINS = {
  DATE_BIN_DAY,
  DATE_BIN_WEEK,
  DATE_BIN_MONTH,
};

const COLOR_MODE_COMPARE = 'COLOR_MODE_COMPARE';
const COLOR_MODE_CODE = 'COLOR_MODE_CODE';
const COLOR_MODE_CLUSTAL = 'COLOR_MODE_CLUSTAL';
const COLOR_MODE_ZAPPO = 'COLOR_MODE_ZAPPO';
const COLOR_MODE_ZHAO_LONDON = 'COLOR_MODE_ZHAO_LONDON';
export const COLOR_MODES = {
  COLOR_MODE_COMPARE,
  COLOR_MODE_CODE,
  COLOR_MODE_CLUSTAL,
  COLOR_MODE_ZAPPO,
  COLOR_MODE_ZHAO_LONDON,
};

const COMPARE_MODE_MATCH = 'COMPARE_MODE_MATCH';
const COMPARE_MODE_MISMATCH = 'COMPARE_MODE_MISMATCH';
export const COMPARE_MODES = {
  COMPARE_MODE_MATCH,
  COMPARE_MODE_MISMATCH,
};

const COMPARE_COLOR_YELLOW = 'yellow';
const COMPARE_COLOR_GREEN = 'green';
const COMPARE_COLOR_BLUE = 'blue';
const COMPARE_COLOR_PINK = 'pink';
const COMPARE_COLOR_PURPLE = 'purple';
const COMPARE_COLOR_ORANGE = 'orange';
const COMPARE_COLOR_GRAY = 'gray';
const COMPARE_COLOR_DOTS = 'dots';
export const COMPARE_COLORS = {
  COLOR_MODE_CODE,
  COLOR_MODE_CLUSTAL,
  COLOR_MODE_ZAPPO,
  COLOR_MODE_ZHAO_LONDON,
  COMPARE_COLOR_YELLOW,
  COMPARE_COLOR_GREEN,
  COMPARE_COLOR_BLUE,
  COMPARE_COLOR_PINK,
  COMPARE_COLOR_PURPLE,
  COMPARE_COLOR_ORANGE,
  COMPARE_COLOR_GRAY,
  COMPARE_COLOR_DOTS,
};

const SORT_ASC = 'ASC';
const SORT_DESC = 'DESC';
const SORT_NONE = 'NONE';
export const SORT_DIRECTIONS = {
  SORT_ASC,
  SORT_DESC,
  SORT_NONE,
};

class ObservablePlotSettingsStore {
  @observable groupStackNormMode = NORM_MODES.NORM_COUNTS;
  @observable groupStackCountMode = COUNT_MODES.COUNT_NEW;
  @observable groupStackDateBin = DATE_BINS.DATE_BIN_DAY;

  @action
  setGroupStackNormMode(mode) {
    this.groupStackNormMode = mode;
  }
  @action
  setGroupStackCountMode(mode) {
    this.groupStackCountMode = mode;
  }
  @action
  setGroupStackDateBin(dateBin) {
    this.groupStackDateBin = dateBin;
  }

  @observable locationDateNormMode = NORM_MODES.NORM_PERCENTAGES;
  @observable locationDateCountMode = COUNT_MODES.COUNT_CUMULATIVE;
  @observable locationDateDateBin = DATE_BINS.DATE_BIN_DAY;

  @action
  setLocationDateNormMode(mode) {
    this.locationDateNormMode = mode;
  }
  @action
  setLocationDateCountMode(mode) {
    this.locationDateCountMode = mode;
  }
  @action
  setLocationDateDateBin(dateBin) {
    this.locationDateDateBin = dateBin;
  }

  // Color by 'compare': Comparison to reference, or 'code': With a defined color code
  @observable tableColorMode = COLOR_MODES.COLOR_MODE_COMPARE;
  @observable tableCompareMode = COMPARE_MODES.COMPARE_MODE_MISMATCH;
  @observable tableCompareColor = COMPARE_COLORS.COMPARE_COLOR_YELLOW;
  @observable tableSortColumn = 'cases_sum';
  @observable tableSortDirection = SORT_DIRECTIONS.SORT_DESC;

  @action
  setTableColorMode(mode) {
    this.tableColorMode = mode;
  }
  @action
  setTableCompareMode(mode) {
    this.tableCompareMode = mode;
  }
  @action
  setTableCompareColor(color) {
    this.tableCompareColor = color;
  }
  @action
  setTableSort(col, dir) {
    this.tableSortColumn = col;
    this.tableSortDirection = dir;
  }
}

export default ObservablePlotSettingsStore;