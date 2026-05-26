export interface StudentInfo {
  studentName: string;
  matricNumber: string;
  department: string;
  faculty: string;
  university: string;
  supervisorName: string;
  headOfDepartment: string;
  externalExaminer: string;
  submissionYear: string;
  degreeType: string; // "Bachelor of Engineering (B.Eng)" or "Master of Engineering (M.Eng)"
}

export interface Equipment {
  id: string;
  name: string;
  category: "heavy_machinery" | "lighting" | "hvac" | "auxiliary";
  quantity: number;
  powerRatingKW: number;
  powerFactor: number;
  hoursPerDay: number;
  daysPerWeek: number;
  efficiency: number; // percentage (0.00 to 1.00)
}

export interface AuditParameters {
  tariffRate: number; // Naira/kWh
  powerFactorCorrectionTarget: number; // e.g., 0.95
  ledRetrofitCost: number; // Naira per lamp
  ledPowerRating: number; // kW per lamp replacing fluorescent/incandescent
  vfdUnitCost: number; // Naira for a VFD unit
  capacitorBankCostPerKVAR: number; // Naira per kVAR
}
