import React from "react";

export const ThreePhasePowerFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">P = &radic;<span className="border-t border-gray-800 px-1">3</span> &times; V<sub>L</sub> &times; I<sub>L</sub> &times; cos(&theta;)</span>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.1)</span>
    </div>
    <div className="text-xs text-gray-500 mt-2 font-sans">
      Where: P = Active Power (Watts), V<sub>L</sub> = Line-to-Line Voltage (Volts), I<sub>L</sub> = Line Current (Amperes), cos(&theta;) = System Power Factor.
    </div>
  </div>
);

export const PowerFactorFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">cos(&theta;) = PF = </span>
      <div className="flex flex-col items-center justify-center text-sm">
        <span className="border-b border-gray-800 px-2 font-bold">Active Power (P, kW)</span>
        <span className="px-2 font-bold">Apparent Power (S, kVA)</span>
      </div>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.2)</span>
    </div>
  </div>
);

export const ReactivePowerFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">Q = &radic;<span className="border-t border-gray-800 px-1">S<sup>2</sup> &minus; P<sup>2</sup></span></span>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.3)</span>
    </div>
    <div className="text-xs text-gray-500 mt-2 font-sans">
      Where: Q = Reactive Power (kVAR), S = Apparent Power (kVA), P = Active Power (kW).
    </div>
  </div>
);

export const ActiveEnergyFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">E<sub>(kWh)</sub> = P<sub>(kW)</sub> &times; t<sub>(hours)</sub></span>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.4)</span>
    </div>
    <div className="text-xs text-gray-500 mt-2 font-sans">
      Where: E<sub>(kWh)</sub> represents the total electrical energy consumed over a period t in hours.
    </div>
  </div>
);

export const CapacitanceSizingFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">Q<sub>C</sub> = P &times; [tan(&theta;<sub>1</sub>) &minus; tan(&theta;<sub>2</sub>)]</span>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.5)</span>
    </div>
    <div className="text-xs text-gray-500 mt-2 font-sans">
      Where: Q<sub>C</sub> = Required Capacitor Bank rating (kVAR), P = Peak Active Power (kW), &theta;<sub>1</sub> = original phase angle, &theta;<sub>2</sub> = targeted corrected phase angle.
    </div>
  </div>
);

export const SimplePaybackFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">SPP (years) = </span>
      <div className="flex flex-col items-center justify-center text-sm">
        <span className="border-b border-gray-800 px-2 font-bold">Total Implementation Capital Cost (NGN)</span>
        <span className="px-2 font-bold">Annual Electrical Cost Savings (NGN / year)</span>
      </div>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.6)</span>
    </div>
  </div>
);

export const MotorEfficiencyFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">&eta;<sub>%</sub> = </span>
      <div className="flex flex-col items-center justify-center text-sm px-1">
        <span className="border-b border-gray-800 px-2 font-bold">Mechanical Shaft Power Output (kW)</span>
        <span className="px-2 font-bold">Electrical Power Input (kW)</span>
      </div>
      <span className="font-bold text-gray-800">&times; 100</span>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.7)</span>
    </div>
  </div>
);

export const VoltageDropFormula: React.FC = () => (
  <div className="my-6 p-4 bg-gray-50 border-l-4 border-slate-700 text-center font-serif text-lg">
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <span className="font-bold text-gray-800">V<sub>drop</sub> = &radic;<span className="border-t border-gray-800 px-1">3</span> &times; I &times; (R &times; cos(&theta;) + X &times; sin(&theta;))</span>
      <span className="text-gray-500 text-sm ml-4">(Equation 3.8)</span>
    </div>
    <div className="text-xs text-gray-500 mt-2 font-sans">
      Where: I = load current (A), R = AC cable resistance (&Omega;/km), X = cable reactance (&Omega;/km), cos(&theta;) = power factor.
    </div>
  </div>
);
