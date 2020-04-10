import ImpactEstimator from './ImpactEstimator';

const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = new ImpactEstimator(input);
  impact
    .calcCurrentlyInfected()
    .calcInfectionByRequestedTime()
    .calcSevereCasesByRequestedTime()
    .caclHospitalBedsByRequestedTime()
    .calcCasesForICUByRequestedTime()
    .calcCasesForVentilatorsByRequestedTime()
    .calcDollarsInFlight();

  const severeImpact = new ImpactEstimator(input, true);
  severeImpact
    .calcCurrentlyInfected()
    .calcInfectionByRequestedTime()
    .calcSevereCasesByRequestedTime()
    .caclHospitalBedsByRequestedTime()
    .calcCasesForICUByRequestedTime()
    .calcCasesForVentilatorsByRequestedTime()
    .calcDollarsInFlight();
  return {
    input,
    impact: impact.getImpact(),
    severeImpact: severeImpact.getImpact()
  };
};

export default covid19ImpactEstimator;
