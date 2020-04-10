import ImpactEstimator from '../src/ImpactEstimator';

describe('Impact Estimator Test', () => {
  const input = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  test('test basic impact', () => {
    const currentlyInfected = new ImpactEstimator(input);
    currentlyInfected
      .calcCurrentlyInfected()
      .calcInfectionByRequestedTime()
      .calcSevereCasesByRequestedTime()
      .caclHospitalBedsByRequestedTime()
      .calcCasesForICUByRequestedTime()
      .calcCasesForVentilatorsByRequestedTime()
      .calcDollarsInFlight();

    expect(currentlyInfected.getImpact()).not.toBeNull();
    expect(currentlyInfected.getImpact()).toEqual({
      currentlyInfected: 6740,
      infectionsByRequestedTime: 3533701120,
      severeCasesByRequestedTime: 530055168,
      hospitalBedsByRequestedTime: -529571953,
      casesForICUByRequestedTime: 176685056,
      casesForVentilatorsByRequestedTime: 70674022,
      dollarsInFlight: '727589060608.00'
    });
  });

  test('test severe impact', () => {
    const currentlyInfected = new ImpactEstimator(input, true);
    currentlyInfected
      .calcCurrentlyInfected()
      .calcInfectionByRequestedTime()
      .calcSevereCasesByRequestedTime()
      .caclHospitalBedsByRequestedTime()
      .calcCasesForICUByRequestedTime()
      .calcCasesForVentilatorsByRequestedTime()
      .calcDollarsInFlight();

    expect(currentlyInfected.getImpact()).not.toBeNull();
    expect(currentlyInfected.getImpact()).toEqual({
      currentlyInfected: 33700,
      infectionsByRequestedTime: 17668505600,
      severeCasesByRequestedTime: 2650275840,
      hospitalBedsByRequestedTime: -2649792625,
      casesForICUByRequestedTime: 883425280,
      casesForVentilatorsByRequestedTime: 353370112,
      dollarsInFlight: '3637945303040.00'
    });
  });
});
