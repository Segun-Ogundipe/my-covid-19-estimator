/**
 *  Utility class for calculating the impact/severe impact of covid-19
 */
export default class ImpactEstimator {
  /**
   *
   * @param {Object} input - The data that to be calculated.
   * @param {Boolean} isSevere - If true, the most severe case will be calculated.
   * The default is false.
   */
  constructor(input = {}, isSevere = false) {
    this.input = input;
    this.isSevere = isSevere;
    this.impact = {};
  }

  /**
   * Calculates the number of currently infected people.
   * Returns the Estimator Object
   */
  calcCurrentlyInfected() {
    if (this.isSevere) {
      this.impact.currentlyInfected = this.input.reportedCases * 50;

      return this;
    }

    this.impact.currentlyInfected = this.input.reportedCases * 10;

    return this;
  }

  /**
   * Calculates the number of infections by requested time (timeToElapse).
   * Returns the Estimator Object.
   */
  calcInfectionByRequestedTime() {
    const days = this.convertToDays();
    const infected = this.impact.currentlyInfected;
    const calc = infected * 2 ** Math.trunc(days / 3);

    this.impact.infectionsByRequestedTime = calc;

    return this;
  }

  /**
   * Calculates the number of severe cases by requested time.
   * Returns the Estimator Object.
   */
  calcSevereCasesByRequestedTime() {
    this.impact.severeCasesByRequestedTime = Math.trunc(
      0.15 * this.impact.infectionsByRequestedTime
    );

    return this;
  }

  /**
   * Calculates the number beds in the hospital by requested time.
   * Returns the Estimator Object.
   */
  caclHospitalBedsByRequestedTime() {
    const beds = this.input.totalHospitalBeds;
    const severe = this.impact.severeCasesByRequestedTime;

    this.impact.hospitalBedsByRequestedTime = Math.trunc(0.35 * beds - severe);

    return this;
  }

  /**
   * Calculates the number of cases for ICU by requested time.
   * Returns the Estimator Object.
   */
  calcCasesForICUByRequestedTime() {
    this.impact.casesForICUByRequestedTime = Math.trunc(
      0.05 * this.impact.infectionsByRequestedTime
    );

    return this;
  }

  /**
   * Calculates the number of cases for Ventilators by requested time.
   * Returns the Estimator Object.
   */
  calcCasesForVentilatorsByRequestedTime() {
    this.impact.casesForVentilatorsByRequestedTime = Math.trunc(
      0.02 * this.impact.infectionsByRequestedTime
    );

    return this;
  }

  /**
   * Calculates dollars economy is likely to loose requested time.
   * Returns the Estimator Object.
   */
  calcDollarsInFlight() {
    const days = this.convertToDays();
    const infections = this.impact.infectionsByRequestedTime;
    const pop = this.input.region.avgDailyIncomePopulation;
    const usd = this.input.region.avgDailyIncomeInUSD;

    this.impact.dollarsInFlight = Number(
      (infections * pop * usd * days).toFixed(2)
    );

    return this;
  }

  /**
   * Converts weeks/months to days.
   * Return the number in days.
   */
  convertToDays() {
    let days = 0;
    switch (this.input.periodType) {
      case 'weeks':
        days = this.input.timeToElapse * 7;
        break;
      case 'months':
        days = this.input.timeToElapse * 30;
        break;
      default:
        days = this.input.timeToElapse;
        break;
    }

    return days;
  }

  /**
   * Returns the impact object.
   */
  getImpact() {
    return this.impact;
  }
}
