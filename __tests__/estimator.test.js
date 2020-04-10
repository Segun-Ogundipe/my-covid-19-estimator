import covid19Estimator from '../src/estimator';

describe('Estimator Test', () => {
  const input = {
    region: {
      name: 'Africa',
      avgAge: 20.5,
      avgDailyIncomeInUSD: 4.2,
      avgDailyIncomePopulation: 0.85
    },
    periodType: 'weeks',
    timeToElapse: 1.5,
    reportedCases: 582,
    population: 56087256,
    totalHospitalBeds: 2873654
  };

  test('test basic impact', () => {
    const estimate = covid19Estimator(input);

    expect(estimate.impact).not.toBeNull();
    expect(estimate.impact).toEqual({
      currentlyInfected: 5820,
      infectionsByRequestedTime: 46560,
      severeCasesByRequestedTime: 6984,
      hospitalBedsByRequestedTime: 998794,
      casesForICUByRequestedTime: 2328,
      casesForVentilatorsByRequestedTime: 931,
      dollarsInFlight: 15830
    });
  });

  test('test severe impact', () => {
    const estimate = covid19Estimator(input);

    expect(estimate.severeImpact).not.toBeNull();
    expect(estimate.severeImpact).toEqual({
      currentlyInfected: 29100,
      infectionsByRequestedTime: 232800,
      severeCasesByRequestedTime: 34920,
      hospitalBedsByRequestedTime: 970858,
      casesForICUByRequestedTime: 11640,
      casesForVentilatorsByRequestedTime: 4656,
      dollarsInFlight: 79152
    });
  });
});
