import { Equipment, AuditParameters } from "../types";

export const initialEquipmentList: Equipment[] = [
  { id: "EQ1", name: "Universal Lathe Machine (Colchester Student 1800)", category: "heavy_machinery", quantity: 4, powerRatingKW: 5.5, powerFactor: 0.72, hoursPerDay: 4, daysPerWeek: 3, efficiency: 0.82 },
  { id: "EQ2", name: "Vertical Milling Machine (Bridgeport Pro)", category: "heavy_machinery", quantity: 2, powerRatingKW: 4.0, powerFactor: 0.75, hoursPerDay: 3, daysPerWeek: 2, efficiency: 0.84 },
  { id: "EQ3", name: "Electric Arc Welding Transformer (400A)", category: "heavy_machinery", quantity: 3, powerRatingKW: 11.0, powerFactor: 0.62, hoursPerDay: 2, daysPerWeek: 3, efficiency: 0.75 },
  { id: "EQ4", name: "Horizontal Shaping Machine", category: "heavy_machinery", quantity: 1, powerRatingKW: 3.0, powerFactor: 0.70, hoursPerDay: 1, daysPerWeek: 2, efficiency: 0.80 },
  { id: "EQ5", name: "Radial Arm Drilling Machine", category: "heavy_machinery", quantity: 2, powerRatingKW: 2.2, powerFactor: 0.74, hoursPerDay: 2, daysPerWeek: 4, efficiency: 0.81 },
  { id: "EQ6", name: "Reciprocating Air Compressor (3-Phase)", category: "auxiliary", quantity: 1, powerRatingKW: 7.5, powerFactor: 0.76, hoursPerDay: 5, daysPerWeek: 5, efficiency: 0.85 },
  { id: "EQ7", name: "Centrifugal Pump Test Rig (Fluid Lab)", category: "auxiliary", quantity: 2, powerRatingKW: 3.0, powerFactor: 0.78, hoursPerDay: 1.5, daysPerWeek: 2, efficiency: 0.83 },
  { id: "EQ8", name: "Metallurgical Muffle Furnace (Therm Lab)", category: "auxiliary", quantity: 1, powerRatingKW: 12.0, powerFactor: 1.0, hoursPerDay: 3, daysPerWeek: 1, efficiency: 0.90 },
  { id: "EQ9", name: "Split Unit Air Conditioners (2 HP)", category: "hvac", quantity: 8, powerRatingKW: 1.5, powerFactor: 0.78, hoursPerDay: 6, daysPerWeek: 5, efficiency: 0.85 },
  { id: "EQ10", name: "Industrial Exhaust Fans", category: "hvac", quantity: 4, powerRatingKW: 0.75, powerFactor: 0.74, hoursPerDay: 6, daysPerWeek: 5, efficiency: 0.78 },
  { id: "EQ11", name: "T8 Fluorescent Lighting Fittings (2x36W with magnetic ballast)", category: "lighting", quantity: 45, powerRatingKW: 0.082, powerFactor: 0.65, hoursPerDay: 8, daysPerWeek: 5, efficiency: 0.60 },
  { id: "EQ12", name: "High Bay Incandescent Spotlights", category: "lighting", quantity: 10, powerRatingKW: 0.200, powerFactor: 1.0, hoursPerDay: 10, daysPerWeek: 5, efficiency: 0.95 },
  { id: "EQ13", name: "Hydraulic Bench Pumps (Thermo Fluids)", category: "auxiliary", quantity: 2, powerRatingKW: 1.5, powerFactor: 0.78, hoursPerDay: 2, daysPerWeek: 2, efficiency: 0.82 },
  { id: "EQ14", name: "Double Wheeled Pedestal Grinders", category: "heavy_machinery", quantity: 2, powerRatingKW: 1.1, powerFactor: 0.72, hoursPerDay: 1, daysPerWeek: 5, efficiency: 0.78 },
  { id: "EQ15", name: "Metal Cutting Horizontal Band Saw", category: "heavy_machinery", quantity: 1, powerRatingKW: 1.5, powerFactor: 0.75, hoursPerDay: 1, daysPerWeek: 3, efficiency: 0.80 }
];

export const initialAuditParameters: AuditParameters = {
  tariffRate: 210.50, // BEDC Band A Tariff (NGN/kWh)
  powerFactorCorrectionTarget: 0.95,
  ledRetrofitCost: 4500, // NGN per lamp (including fitting adjustment and labor)
  ledPowerRating: 0.018, // 18W LED tubes replaces 82W double fluorescent fittings / 200W spot
  vfdUnitCost: 285000, // Compressor VFD in NGN
  capacitorBankCostPerKVAR: 18000 // NGN per kVAR
};

export function performAuditCalculations(
  equipmentList: Equipment[],
  params: AuditParameters
) {
  // Let's compute individual dynamic data
  const equipmentDetails = equipmentList.map((eq) => {
    const totalPowerKW = eq.quantity * eq.powerRatingKW;
    const apparentPowerKVA = totalPowerKW / eq.powerFactor;
    const reactivePowerKVAR = Math.sqrt(Math.max(0, apparentPowerKVA ** 2 - totalPowerKW ** 2));
    
    // Annual operating hours = hoursPerDay * daysPerWeek * 52 weeks
    const annualHours = eq.hoursPerDay * eq.daysPerWeek * 52;
    const annualEnergyKWH = totalPowerKW * annualHours;
    const annualCostNGN = annualEnergyKWH * params.tariffRate;

    // Diesel generator calculations (approx 0.28 liters diesel per kWh)
    // Assuming diesel price is N1250/liter
    const dieselLitersPerYear = annualEnergyKWH * 0.28;
    const dieselCostNGN = dieselLitersPerYear * 1250;

    return {
      ...eq,
      totalPowerKW,
      apparentPowerKVA,
      reactivePowerKVAR,
      annualHours,
      annualEnergyKWH,
      annualCostNGN,
      dieselLitersPerYear,
      dieselCostNGN
    };
  });

  // Category summary
  const categories = {
    heavy_machinery: { kw: 0, kva: 0, kvar: 0, kwh: 0, cost: 0, count: 0 },
    lighting: { kw: 0, kva: 0, kvar: 0, kwh: 0, cost: 0, count: 0 },
    hvac: { kw: 0, kva: 0, kvar: 0, kwh: 0, cost: 0, count: 0 },
    auxiliary: { kw: 0, kva: 0, kvar: 0, kwh: 0, cost: 0, count: 0 }
  };

  equipmentDetails.forEach((eq) => {
    categories[eq.category].kw += eq.totalPowerKW;
    categories[eq.category].kva += eq.apparentPowerKVA;
    categories[eq.category].kvar += eq.reactivePowerKVAR;
    categories[eq.category].kwh += eq.annualEnergyKWH;
    categories[eq.category].cost += eq.annualCostNGN;
    categories[eq.category].count += eq.quantity;
  });

  // Total sums
  const grandTotalKW = equipmentDetails.reduce((sum, eq) => sum + eq.totalPowerKW, 0);
  const grandTotalKVA = equipmentDetails.reduce((sum, eq) => sum + eq.apparentPowerKVA, 0);
  const grandTotalKVAR = equipmentDetails.reduce((sum, eq) => sum + eq.reactivePowerKVAR, 0);
  const grandTotalKWH = equipmentDetails.reduce((sum, eq) => sum + eq.annualEnergyKWH, 0);
  const grandTotalCostNGN = grandTotalKWH * params.tariffRate;
  const averagePowerFactor = grandTotalKW / grandTotalKVA;

  // Peak load estimates (assume simultaneity factor of 0.65 for school lab labs)
  const peakLoadKW = grandTotalKW * 0.65;
  const peakLoadKVA = grandTotalKVA * 0.65;

  // -- ECM 1: PFC Capacitor Banks --
  const originalPF = averagePowerFactor;
  const targetPF = params.powerFactorCorrectionTarget;
  
  // Angle before and after
  const theta1 = Math.acos(Math.max(0.1, Math.min(1.0, originalPF)));
  const theta2 = Math.acos(Math.max(0.1, Math.min(1.0, targetPF)));
  
  // QC in kVAR required to compensate peak load
  const pfcKVARRequired = peakLoadKW * (Math.tan(theta1) - Math.tan(theta2));
  const pfcCapitalCostNGN = Math.max(0, pfcKVARRequired * params.capacitorBankCostPerKVAR);
  
  // Copper loss reduction on network: P_loss is proportional to (1/PF)^2.
  // Line losses are usually 3.5% of total consumption. Savings factor: 1 - (PF_old/PF_new)^2
  const copperLossSavingsFraction = Math.max(0, 0.035 * (1 - (originalPF / targetPF) ** 2));
  const pfcAnnualKWHSaved = grandTotalKWH * copperLossSavingsFraction;
  const pfcAnnualSavingsNGN = pfcAnnualKWHSaved * params.tariffRate;
  const pfcPaybackYears = pfcAnnualSavingsNGN > 0 ? pfcCapitalCostNGN / pfcAnnualSavingsNGN : 0;

  // -- ECM 2: High Efficiency LED Lighting Retrofit --
  // We'll replace EQ11 and EQ12 lights with LEDs
  const fluorescentItem = equipmentList.find((eq) => eq.id === "EQ11");
  const incandescentItem = equipmentList.find((eq) => eq.id === "EQ12");

  const fluorQty = fluorescentItem ? fluorescentItem.quantity : 0;
  const incanQty = incandescentItem ? incandescentItem.quantity : 0;

  // Fluor saving: replace 0.082kW fitting with 0.018kW LED single tube (times quantity)
  const fluorPowerSavedEach = 0.082 - params.ledPowerRating;
  const fluorAnnualHours = fluorescentItem ? (fluorescentItem.hoursPerDay * fluorescentItem.daysPerWeek * 52) : 2080;
  const fluorKWHSaved = fluorQty * fluorPowerSavedEach * fluorAnnualHours;

  // Incandescent saving: replace 0.200kW spot with 0.018kW LED (or equivalent specialized LED spotlight)
  const incanPowerSavedEach = 0.200 - params.ledPowerRating;
  const incanAnnualHours = incandescentItem ? (incandescentItem.hoursPerDay * incandescentItem.daysPerWeek * 52) : 2600;
  const incanKWHSaved = incanQty * incanPowerSavedEach * incanAnnualHours;

  const ledTotalKWHSaved = fluorKWHSaved + incanKWHSaved;
  const ledAnnualSavingsNGN = ledTotalKWHSaved * params.tariffRate;
  const ledCapitalCostNGN = (fluorQty + incanQty) * params.ledRetrofitCost;
  const ledPaybackYears = ledAnnualSavingsNGN > 0 ? ledCapitalCostNGN / ledAnnualSavingsNGN : 0;

  // -- ECM 3: VFD on Air Compressor --
  // Energy saved: 35% of compressor (EQ6) annual energy
  const compressorItem = equipmentDetails.find((eq) => eq.id === "EQ6");
  const compressorEnergyKWH = compressorItem ? compressorItem.annualEnergyKWH : 0;
  const vfdAnnualKWHSaved = compressorEnergyKWH * 0.35;
  const vfdAnnualSavingsNGN = vfdAnnualKWHSaved * params.tariffRate;
  const vfdCapitalCostNGN = params.vfdUnitCost;
  const vfdPaybackYears = vfdAnnualSavingsNGN > 0 ? vfdCapitalCostNGN / vfdAnnualSavingsNGN : 0;

  // Sum of all actions
  const totalInvestmentNGN = pfcCapitalCostNGN + ledCapitalCostNGN + vfdCapitalCostNGN;
  const totalAnnualSavingsKWH = pfcAnnualKWHSaved + ledTotalKWHSaved + vfdAnnualKWHSaved;
  const totalAnnualSavingsNGN = pfcAnnualSavingsNGN + ledAnnualSavingsNGN + vfdAnnualSavingsNGN;
  const overallPaybackYears = totalAnnualSavingsNGN > 0 ? totalInvestmentNGN / totalAnnualSavingsNGN : 0;

  // Carbon credits: grid carbon reduction (0.45 kg CO2 / kWh) and generator fuel avoidance
  // Avoided carbon on grid = saved kWh * 0.45 kg/kWh
  const co2ReductionKg = totalAnnualSavingsKWH * 0.45;

  return {
    equipmentDetails,
    categories,
    totals: {
      kw: grandTotalKW,
      kva: grandTotalKVA,
      kvar: grandTotalKVAR,
      kwh: grandTotalKWH,
      costNGN: grandTotalCostNGN,
      pf: averagePowerFactor,
      peakKW: peakLoadKW,
      peakKVA: peakLoadKVA
    },
    pfc: {
      kvarRequired: pfcKVARRequired,
      investment: pfcCapitalCostNGN,
      kwhSaved: pfcAnnualKWHSaved,
      savings: pfcAnnualSavingsNGN,
      payback: pfcPaybackYears
    },
    led: {
      investment: ledCapitalCostNGN,
      kwhSaved: ledTotalKWHSaved,
      savings: ledAnnualSavingsNGN,
      payback: ledPaybackYears,
      fluorQty,
      incanQty
    },
    vfd: {
      investment: vfdCapitalCostNGN,
      kwhSaved: vfdAnnualKWHSaved,
      savings: vfdAnnualSavingsNGN,
      payback: vfdPaybackYears
    },
    overall: {
      investment: totalInvestmentNGN,
      kwhSaved: totalAnnualSavingsKWH,
      savingsNGN: totalAnnualSavingsNGN,
      payback: overallPaybackYears,
      co2ReductionKg,
      newCostNGN: grandTotalCostNGN - totalAnnualSavingsNGN,
      newPF: targetPF
    }
  };
}
