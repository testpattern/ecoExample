// Need to implement this to allow jest to close the database connection at the end of its test run
class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    process.exit(0);
  }
}

module.exports = CustomReporter;