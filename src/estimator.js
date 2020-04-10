import ImpactEstimator from './ImpactEstimator';

const covid19ImpactEstimator = (data) => {
  const impact = new ImpactEstimator(data);
  impact
    .calcCurrentlyInfected()
    .calcInfectionByRequestedTime()
    .calcSevereCasesByRequestedTime()
    .caclHospitalBedsByRequestedTime()
    .calcCasesForICUByRequestedTime()
    .calcCasesForVentilatorsByRequestedTime()
    .calcDollarsInFlight();

  const severeImpact = new ImpactEstimator(data, true);
  severeImpact
    .calcCurrentlyInfected()
    .calcInfectionByRequestedTime()
    .calcSevereCasesByRequestedTime()
    .caclHospitalBedsByRequestedTime()
    .calcCasesForICUByRequestedTime()
    .calcCasesForVentilatorsByRequestedTime()
    .calcDollarsInFlight();
  return {
    data,
    estimate: {
      impact: impact.getImpact(),
      severeImpact: severeImpact.getImpact()
    }
  };
};

export default covid19ImpactEstimator;
