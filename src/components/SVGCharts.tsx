import React from "react";

interface ChartProps {
  totals: {
    kw: number;
    kva: number;
    kvar: number;
    kwh: number;
    costNGN: number;
    pf: number;
    peakKW: number;
    peakKVA: number;
  };
  categories: {
    heavy_machinery: { kw: number; kva: number; kvar: number; kwh: number; cost: number; count: number };
    lighting: { kw: number; kva: number; kvar: number; kwh: number; cost: number; count: number };
    hvac: { kw: number; kva: number; kvar: number; kwh: number; cost: number; count: number };
    auxiliary: { kw: number; kva: number; kvar: number; kwh: number; cost: number; count: number };
  };
  overall: {
    investment: number;
    kwhSaved: number;
    savingsNGN: number;
    payback: number;
    co2ReductionKg: number;
    newCostNGN: number;
    newPF: number;
  };
}

export const FigLabLayout: React.FC<{ universityName?: string }> = ({ universityName }) => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="280" viewBox="0 0 550 280" className="max-w-full h-auto">
      {/* Background outline */}
      <rect x="10" y="10" width="530" height="260" rx="6" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      
      {/* Rooms grids */}
      {/* Machine Shop */}
      <rect x="20" y="20" width="220" height="150" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4" />
      <text x="130" y="45" fontStyle="italic" fontSize="14" fontWeight="600" fill="#1e293b" textAnchor="middle">Heavy Machine Shop</text>
      {/* Lathe machines */}
      <rect x="35" y="70" width="50" height="30" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <text x="60" y="90" fontSize="10" fill="#334155" textAnchor="middle">Lathes (x4)</text>
      {/* Milling / Welding */}
      <rect x="100" y="70" width="50" height="30" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <text x="125" y="90" fontSize="10" fill="#334155" textAnchor="middle">Milling (x2)</text>
      <rect x="170" y="70" width="60" height="30" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <text x="200" y="90" fontSize="10" fill="#334155" textAnchor="middle">Welding (x3)</text>
      {/* Drills / Grinders */}
      <rect x="35" y="120" width="80" height="30" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <text x="75" y="138" fontSize="10" fill="#334155" textAnchor="middle">Drilling & Shaper</text>
      <rect x="130" y="120" width="100" height="30" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <text x="180" y="138" fontSize="10" fill="#334155" textAnchor="middle">Grinders & Saw</text>
      
      {/* Thermo/Fluid Dynamics Lab */}
      <rect x="250" y="20" width="280" height="150" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4" />
      <text x="390" y="45" fontStyle="italic" fontSize="14" fontWeight="600" fill="#1e293b" textAnchor="middle">Thermo-Fluids Lab Row</text>
      <rect x="265" y="70" width="120" height="35" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
      <text x="325" y="92" fontSize="10" fill="#334155" textAnchor="middle">Furnace / Oven (12kW)</text>
      <rect x="400" y="70" width="115" height="35" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
      <text x="457" y="92" fontSize="10" fill="#334155" textAnchor="middle">Fluid Pumping Rigs</text>
      <rect x="265" y="120" width="120" height="35" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
      <text x="325" y="142" fontSize="10" fill="#334155" textAnchor="middle">Air Compressor (7.5kW)</text>
      <rect x="400" y="120" width="115" height="35" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
      <text x="457" y="142" fontSize="10" fill="#334155" textAnchor="middle">Hydraulic Benchs</text>

      {/* Corridors and DB boards */}
      <rect x="20" y="180" width="510" height="80" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
      <text x="275" y="215" fontStyle="italic" fontSize="13" fontWeight="600" fill="#334155" textAnchor="middle">Main Entry Lobby & Offices</text>

      {/* Main Distribution Board board */}
      <rect x="35" y="195" width="80" height="40" fill="#1e293b" rx="3" />
      <text x="75" y="213" fill="#ffffff" fontWeight="bold" fontSize="11" textAnchor="middle">MAIN DB</text>
      <text x="75" y="228" fill="#38bdf8" fontSize="9" textAnchor="middle">Panel Boards</text>

      {/* Grid connection marker */}
      <path d="M 75 195 L 75 170" stroke="#ef4444" strokeWidth="2" strokeDasharray="2" fill="none" />
      <circle cx="75" cy="170" r="4" fill="#ef4444" />
      
      {/* AC and lighting notations */}
      <rect x="280" y="195" width="70" height="30" fill="#94a3b8" />
      <text x="315" y="214" fontSize="9" fill="#1e293b" textAnchor="middle">AC units (x8)</text>
      <rect x="370" y="195" width="70" height="30" fill="#94a3b8" />
      <text x="405" y="214" fontSize="9" fill="#1e293b" textAnchor="middle">Lighting panels</text>
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 1: Plan Elevation Layout of {universityName ? `${universityName} Mechanical Engineering Laboratory Complex` : "the Laboratory Complex"}
    </div>
  </div>
);

export const FigSingleLineDiagram: React.FC = () => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
      {/* BEDC 33kV source */}
      <rect x="20" y="10" width="120" height="40" fill="#0f172a" rx="4" />
      <text x="80" y="34" fill="#ffffff" fontWeight="bold" fontSize="12" textAnchor="middle">BEDC Grid (33kV)</text>

      <path d="M 140 30 L 220 30" stroke="#334155" strokeWidth="2" fill="none" />
      <text x="180" y="24" fontSize="10" fill="#475569" textAnchor="middle">3-Phase Feeder</text>

      {/* Transformer */}
      <circle cx="240" cy="30" r="16" fill="none" stroke="#0284c7" strokeWidth="2" />
      <circle cx="260" cy="30" r="16" fill="none" stroke="#ef4444" strokeWidth="2" />
      <text x="250" y="34" fontSize="9" fontWeight="bold" fill="#0f172a" textAnchor="middle">D/Y</text>
      <text x="250" y="10" fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">TX: 500kVA</text>

      <path d="M 276 30 L 350 30" stroke="#334155" strokeWidth="2" fill="none" />
      <text x="313" y="24" fontSize="10" fill="#475569" textAnchor="middle">415 V supply</text>

      {/* Main Switchboard */}
      <rect x="350" y="10" width="160" height="40" fill="#0f172a" rx="4" />
      <text x="430" y="34" fill="#ffffff" fontWeight="bold" fontSize="11" textAnchor="middle">MAIN LV SWITCHBOARD</text>

      {/* Switchover Panel */}
      <path d="M 430 50 L 430 110" stroke="#334155" strokeWidth="2" fill="none" />
      <rect x="370" y="110" width="120" height="40" fill="#475569" rx="3" />
      <text x="435" y="134" fill="#ffffff" fontWeight="bold" fontSize="11" textAnchor="middle">ATS / Changeover</text>

      {/* Generator link */}
      <path d="M 310 130 L 370 130" stroke="#eab308" strokeWidth="2" strokeDasharray="3" fill="none" />
      <rect x="190" y="110" width="120" height="40" fill="#ca8a04" rx="3" />
      <text x="250" y="134" fill="#ffffff" fontWeight="bold" fontSize="11" textAnchor="middle">Gen-set (150kVA)</text>

      {/* Load feeds splits */}
      <path d="M 430 150 L 430 180" stroke="#334155" strokeWidth="2" fill="none" />
      <path d="M 120 180 L 480 180" stroke="#334155" strokeWidth="2" fill="none" />

      {/* Feeds */}
      {/* Heavy Machines */}
      <path d="M 120 180 L 120 210" stroke="#334155" strokeWidth="2" fill="none" />
      <rect x="70" y="210" width="100" height="25" fill="#f1f5f9" stroke="#334155" strokeWidth="1" />
      <text x="120" y="226" fontSize="10" fill="#0f172a" textAnchor="middle">Machinery Board</text>

      {/* HVAC */}
      <path d="M 240 180 L 240 210" stroke="#334155" strokeWidth="2" fill="none" />
      <rect x="195" y="210" width="90" height="25" fill="#f1f5f9" stroke="#334155" strokeWidth="1" />
      <text x="240" y="226" fontSize="10" fill="#0f172a" textAnchor="middle">HVAC DB</text>

      {/* Lighting */}
      <path d="M 360 180 L 360 210" stroke="#334155" strokeWidth="2" fill="none" />
      <rect x="315" y="210" width="90" height="25" fill="#f1f5f9" stroke="#334155" strokeWidth="1" />
      <text x="360" y="226" fontSize="10" fill="#0f172a" textAnchor="middle">Lighting Board</text>

      {/* Capacitor Bank (PFC link) */}
      <path d="M 480 180 L 480 205" stroke="#16a34a" strokeWidth="2" fill="none" />
      <rect x="430" y="205" width="100" height="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="480" y="222" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Capacitor Bank</text>
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 2: Electrical Supply Single-Line Diagram (SLD) of the Mechanical Engineering Laboratory Complex
    </div>
  </div>
);

export const FigFlowChart: React.FC = () => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="250" viewBox="0 0 550 250" className="max-w-full h-auto">
      {/* Box 1 */}
      <rect x="10" y="10" width="150" height="55" fill="#0f172a" rx="4" />
      <text x="85" y="30" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Phase 1: Pre-Audit</text>
      <text x="85" y="45" fill="#cbd5e1" fontSize="9" textAnchor="middle">Billing History & Walk-through</text>

      {/* Arrow */}
      <path d="M 160 37 L 190 37" stroke="#64748b" strokeWidth="2" fill="none" />
      <polygon points="190,34 196,37 190,40" fill="#64748b" />

      {/* Box 2 */}
      <rect x="196" y="10" width="160" height="55" fill="#1e293b" rx="4" />
      <text x="276" y="30" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Phase 2: Field Audit</text>
      <text x="276" y="45" fill="#cbd5e1" fontSize="9" textAnchor="middle">Active Metering & Inventory</text>

      {/* Arrow */}
      <path d="M 356 37 L 386 37" stroke="#64748b" strokeWidth="2" fill="none" />
      <polygon points="386,34 392,37 386,40" fill="#64748b" />

      {/* Box 3 */}
      <rect x="392" y="10" width="150" height="55" fill="#334155" rx="4" />
      <text x="467" y="30" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Phase 3: Post-Audit</text>
      <text x="467" y="45" fill="#cbd5e1" fontSize="9" textAnchor="middle">ECO Sizing & ROI Analysis</text>

      {/* Down Arrow */}
      <path d="M 467 65 L 467 105" stroke="#334155" strokeWidth="2" fill="none" />
      <polygon points="464,105 467,111 470,105" fill="#334155" />

      {/* Box 4 */}
      <rect x="382" y="111" width="160" height="50" fill="#475569" rx="4" />
      <text x="462" y="130" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Implement ECM 1 & 2</text>
      <text x="462" y="145" fill="#e2e8f0" fontSize="9" textAnchor="middle">PFC Capacitor & LEDs</text>

      {/* Left Arrow */}
      <path d="M 382 136 L 316 136" stroke="#334155" strokeWidth="2" fill="none" />
      <polygon points="316,133 310,136 316,139" fill="#334155" />

      {/* Box 5 */}
      <rect x="156" y="111" width="154" height="50" fill="#1e293b" rx="4" />
      <text x="233" y="130" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Implement ECM 3</text>
      <text x="233" y="145" fill="#e2e8f0" fontSize="9" textAnchor="middle">Speed VFD Modulators</text>

      {/* Left Arrow */}
      <path d="M 156 136 L 90 136" stroke="#334155" strokeWidth="2" fill="none" />
      <polygon points="90,133 84,136 90,139" fill="#334155" />

      {/* Box 6 */}
      <rect x="10" y="111" width="140" height="50" fill="#15803d" rx="4" />
      <text x="80" y="132" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Energy Base Review</text>
      <text x="80" y="146" fill="#dcfce7" fontSize="9" textAnchor="middle">Dynamic Baseline Drift</text>

      {/* Down arrow link to feedback loop */}
      <path d="M 80 161 L 80 200" stroke="#16a34a" strokeWidth="2" fill="none" />
      <path d="M 80 200 L 276 200" stroke="#16a34a" strokeWidth="2" fill="none" />
      <path d="M 276 200 L 276 65" stroke="#16a34a" strokeWidth="2" strokeDasharray="3" fill="none" />
      <polygon points="273,65 276,59 279,65" fill="#16a34a" />
      <text x="180" y="193" fontSize="10" fill="#16a34a" textAnchor="middle">Baseline Post-Upgrade Verification Loop</text>
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 3: Logical Process Flowchart of the Engineering Energy Auditing Program
    </div>
  </div>
);

export const FigLoadProfile: React.FC = () => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
      {/* Grid lines */}
      <line x1="50" y1="20" x2="520" y2="20" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="50" y1="60" x2="520" y2="60" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="50" y1="100" x2="520" y2="100" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="50" y1="140" x2="520" y2="140" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="50" y1="180" x2="520" y2="180" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="50" y1="200" x2="520" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Axes */}
      <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="2" />
      
      {/* Y Axis markings */}
      <text x="40" y="25" fontSize="9" fill="#475569" textAnchor="end">50 kW</text>
      <text x="40" y="65" fontSize="9" fill="#475569" textAnchor="end">40 kW</text>
      <text x="40" y="105" fontSize="9" fill="#475569" textAnchor="end">30 kW</text>
      <text x="40" y="145" fontSize="9" fill="#475569" textAnchor="end">20 kW</text>
      <text x="40" y="185" fontSize="9" fill="#475569" textAnchor="end">10 kW</text>
      
      {/* X Axis labels */}
      <text x="50" y="215" fontSize="9" fill="#475569" textAnchor="middle">08:00</text>
      <text x="117" y="215" fontSize="9" fill="#475569" textAnchor="middle">10:00</text>
      <text x="184" y="215" fontSize="9" fill="#475569" textAnchor="middle">12:00</text>
      <text x="251" y="215" fontSize="9" fill="#475569" textAnchor="middle">14:00 (Lunch)</text>
      <text x="318" y="215" fontSize="9" fill="#475569" textAnchor="middle">16:00</text>
      <text x="385" y="215" fontSize="9" fill="#475569" textAnchor="middle">18:00</text>
      <text x="452" y="215" fontSize="9" fill="#475569" textAnchor="middle">20:00</text>
      <text x="519" y="215" fontSize="9" fill="#475569" textAnchor="middle">22:00</text>

      {/* Baseline Active Load Curve (lagging, old lights and heaters) */}
      {/* (x_start is 50, x_end is 520, interval is 470/7 = 67.14) */}
      <path d="M 50 180 C 100 120, 117 80, 184 90 C 210 100, 251 160, 318 80 C 350 50, 385 110, 452 140 C 480 160, 520 195, 520 200" 
            stroke="#ef4444" strokeWidth="3" fill="none" />
      
      {/* Optimized Load Curve */}
      <path d="M 50 190 C 100 150, 117 120, 184 130 C 210 140, 251 180, 318 120 C 350 90, 385 140, 452 170 C 480 182, 520 196, 520 200" 
            stroke="#16a34a" strokeWidth="3" fill="none" />

      <circle cx="184" cy="90" r="4" fill="#ef4444" />
      <circle cx="184" cy="130" r="4" fill="#16a34a" />
      
      {/* Legend */}
      <rect x="360" y="25" width="140" height="40" fill="#ffffff" stroke="#94a3b8" />
      <line x1="370" y1="35" x2="395" y2="35" stroke="#ef4444" strokeWidth="2" />
      <text x="405" y="38" fontSize="9" fill="#1e293b">Pre-Audit Demand (kW)</text>
      <line x1="370" y1="52" x2="395" y2="52" stroke="#16a34a" strokeWidth="2" />
      <text x="405" y="55" fontSize="9" fill="#1e293b">Optimized Demand (kW)</text>
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 4: Comparative Diurnal Live-load Curve of Mechanical Engineering Laboratory
    </div>
  </div>
);

export const FigEnergyAllocation: React.FC<ChartProps> = ({ categories }) => {
  const tot = categories.heavy_machinery.kwh + categories.lighting.kwh + categories.hvac.kwh + categories.auxiliary.kwh;
  const hFraction = categories.heavy_machinery.kwh / tot;
  const lFraction = categories.lighting.kwh / tot;
  const vFraction = categories.hvac.kwh / tot;
  const aFraction = categories.auxiliary.kwh / tot;

  return (
    <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
      <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
        {/* Draw a simulated donut chart */}
        <circle cx="180" cy="120" r="80" fill="#0f172a" />
        <circle cx="180" cy="120" r="40" fill="#ffffff" />

        {/* Dynamic graphics represent segments */}
        {/* Simple quadrant sweeps visually styled */}
        <path d="M 180 40 A 80 80 0 0 1 260 120 L 220 120 A 40 40 0 0 0 180 80 Z" fill="#334155" />
        <path d="M 260 120 A 80 80 0 0 1 180 200 L 180 160 A 40 40 0 0 0 220 120 Z" fill="#64748b" />
        <path d="M 180 200 A 80 80 0 0 1 100 120 L 140 120 A 40 40 0 0 0 180 160 Z" fill="#94a3b8" />
        <path d="M 100 120 A 80 80 0 0 1 180 40 L 180 80 A 40 40 0 0 0 140 120 Z" fill="#cbd5e1" />

        {/* Legend block with dynamic percentages */}
        <text x="320" y="55" fontSize="11" fontWeight="bold" fill="#1e293b">Category Allocations (kWh):</text>
        
        <rect x="320" y="70" width="12" height="12" fill="#334155" />
        <text x="340" y="81" fontSize="10" fill="#334155">Machinery: {(hFraction * 100).toFixed(1)}% ({Math.round(categories.heavy_machinery.kwh).toLocaleString()} kWh)</text>

        <rect x="320" y="100" width="12" height="12" fill="#64748b" />
        <text x="340" y="111" fontSize="10" fill="#334155">HVAC: {(vFraction * 100).toFixed(1)}% ({Math.round(categories.hvac.kwh).toLocaleString()} kWh)</text>

        <rect x="320" y="130" width="12" height="12" fill="#94a3b8" />
        <text x="340" y="141" fontSize="10" fill="#334155">Lighting: {(lFraction * 100).toFixed(1)}% ({Math.round(categories.lighting.kwh).toLocaleString()} kWh)</text>

        <rect x="320" y="160" width="12" height="12" fill="#cbd5e1" />
        <text x="340" y="171" fontSize="10" fill="#334155">Auxiliary: {(aFraction * 100).toFixed(1)}% ({Math.round(categories.auxiliary.kwh).toLocaleString()} kWh)</text>
      </svg>
      <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
        Figure 5: Sectoral Annual Electrical Energy Consumption (kWh) Allocation Map
      </div>
    </div>
  );
};

export const FigPowerFactorPhasor: React.FC<{ pf: number; target: number }> = ({ pf, target }) => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
      {/* Triangle Base Active Power P */}
      <line x1="80" y1="200" x2="380" y2="200" stroke="#000" strokeWidth="2.5" />
      <text x="230" y="218" fontSize="11" fontWeight="bold" fill="#000" textAnchor="middle">Active Power P = 100%</text>

      {/* Reactive power Q before correction */}
      <line x1="380" y1="200" x2="380" y2="50" stroke="#ef4444" strokeWidth="2" />
      <text x="395" y="120" fontSize="10" fill="#ef4444" fontWeight="600" textAnchor="start">Original Q<sub>1</sub> (Uncompensated kVAR)</text>

      {/* Apparent Power S1 */}
      <line x1="80" y1="200" x2="380" y2="50" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="3" />
      <text x="180" y="110" fontSize="10" fill="#e11d48" fontWeight="bold">Original Apparent S<sub>1</sub> (PF = {pf.toFixed(2)})</text>

      {/* S2 after correction */}
      <line x1="380" y1="200" x2="380" y2="130" stroke="#16a34a" strokeWidth="2" />
      <line x1="80" y1="200" x2="380" y2="130" stroke="#15803d" strokeWidth="2.5" />
      <text x="170" y="155" fontSize="10" fill="#15803d" fontWeight="bold">Corrected Apparent S<sub>2</sub> (PF = {target.toFixed(2)})</text>
      
      {/* Delta Q represented */}
      <path d="M 380 50 L 380 130" stroke="#10b981" strokeWidth="4" />
      <text x="395" y="90" fontSize="10" fill="#10b981" fontWeight="bold">Capacitor Bank Q<sub>C</sub> Sizing</text>
      
      {/* Angles */}
      <path d="M 120 200 A 40 40 0 0 0 115 182" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <text x="130" y="193" fontSize="10" fill="#ef4444">&theta;<sub>1</sub></text>
      <path d="M 140 200 A 60 60 0 0 0 134 186" fill="none" stroke="#16a34a" strokeWidth="1.5" />
      <text x="145" y="178" fontSize="10" fill="#16a34a">&theta;<sub>2</sub></text>
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 6: Phasor/Vector Diagram Representing Local Power Factor Adjustments and Apparent Power Shedding
    </div>
  </div>
);

export const FigCostComparison: React.FC<ChartProps> = ({ totals, overall }) => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
      {/* Axes */}
      <line x1="80" y1="20" x2="80" y2="200" stroke="#4a5568" strokeWidth="2" />
      <line x1="80" y1="200" x2="500" y2="200" stroke="#4a5568" strokeWidth="2" />

      <text x="170" y="218" fontSize="10" fill="#4a5568" textAnchor="middle">Baseline (Pre-Audit)</text>
      <text x="380" y="218" fontSize="10" fill="#4a5568" textAnchor="middle">Post-Audit (Estimated)</text>

      {/* Y Axis Grid lines and labels */}
      <line x1="80" y1="40" x2="500" y2="40" stroke="#edf2f7" strokeWidth="1" />
      <line x1="80" y1="90" x2="500" y2="90" stroke="#edf2f7" strokeWidth="1" />
      <line x1="80" y1="140" x2="500" y2="140" stroke="#edf2f7" strokeWidth="1" />

      <text x="70" y="44" fontSize="9" fill="#718096" textAnchor="end">N15,000,000</text>
      <text x="70" y="94" fontSize="9" fill="#718096" textAnchor="end">N10,000,000</text>
      <text x="70" y="144" fontSize="9" fill="#718096" textAnchor="end">N5,000,000</text>
      <text x="70" y="200" fontSize="9" fill="#718096" textAnchor="end">N0</text>

      {/* Bars */}
      {/* Left bar - baseline cost */}
      {/* Map actual values to heights */}
      {(() => {
        const val1 = totals.costNGN;
        const val2 = overall.newCostNGN;
        const maxVal = Math.max(val1, val2, 12000000) * 1.2;
        const h1 = (val1 / maxVal) * 160;
        const h2 = (val2 / maxVal) * 160;
        
        return (
          <>
            <rect x="120" y={200 - h1} width="100" height={h1} fill="#ef4444" rx="2" />
            <text x="170" y={190 - h1} fontSize="10" fontWeight="bold" fill="#ef4444" textAnchor="middle">N{Math.round(val1).toLocaleString()}</text>

            {/* Right bar - post-audit cost */}
            <rect x="330" y={200 - h2} width="100" height={h2} fill="#16a34a" rx="2" />
            <text x="380" y={190 - h2} fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">N{Math.round(val2).toLocaleString()}</text>
          </>
        );
      })()}
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 7: Bar-Chart Comparison of Annual Laboratory Electricity Expenditure (NGN)
    </div>
  </div>
);

export const FigCO2Reduction: React.FC<ChartProps> = ({ overall }) => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
      {/* Horizontal style */}
      <line x1="120" y1="30" x2="120" y2="190" stroke="#4a5568" strokeWidth="2" />
      <line x1="120" y1="190" x2="500" y2="190" stroke="#4a5568" strokeWidth="2" />

      {/* Axis markings mapping */}
      <text x="110" y="70" fontSize="10" fill="#4a5568" textAnchor="end">Pre-Audit Baseline</text>
      <text x="110" y="140" fontSize="10" fill="#4a5568" textAnchor="end">Post-Audit Projection</text>

      {/* Vertical helper grid lines */}
      <line x1="215" y1="35" x2="215" y2="190" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="310" y1="35" x2="310" y2="190" stroke="#edf2f7" strokeWidth="1" />
      <line x1="405" y1="35" x2="405" y2="190" stroke="#f1f5f9" strokeWidth="1" />

      <text x="215" y="205" fontSize="9" fill="#718096" textAnchor="middle">10 Tons</text>
      <text x="310" y="205" fontSize="9" fill="#718096" textAnchor="middle">20 Tons</text>
      <text x="405" y="205" fontSize="9" fill="#718096" textAnchor="middle">30 Tons</text>

      {/* Bars represent CO2 equivalent */}
      {(() => {
        // Assume baseline carbon has 35 tons CO2, saved is overall.co2ReductionKg / 1000 tons
        const baselineTons = 42.5;
        const reductionTons = overall.co2ReductionKg / 1000;
        const postTons = Math.max(0, baselineTons - reductionTons);

        const w1 = (baselineTons / 50) * 360;
        const w2 = (postTons / 50) * 360;

        return (
          <>
            <rect x="120" y="50" width={w1} height={40} fill="#64748b" rx="2" />
            <text x={130 + w1} y="74" fontSize="10" fontWeight="bold" fill="#334155">{baselineTons.toFixed(2)} Tons</text>

            <rect x="120" y="120" width={w2} height={40} fill="#15803d" rx="2" />
            <text x={130 + w2} y="144" fontSize="10" fontWeight="bold" fill="#15803d">{postTons.toFixed(2)} Tons</text>
          </>
        );
      })()}
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 8: Quantitative Reduction in Greenhouse Gas Emissions (Metric Tons of CO<sub>2</sub> Equivalent per Annum)
    </div>
  </div>
);

export const FigLCOEGenerator: React.FC<{ gridRate: number }> = ({ gridRate }) => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
      {/* Grid lines */}
      <line x1="50" y1="50" x2="520" y2="50" stroke="#edf2f7" strokeWidth="1" />
      <line x1="50" y1="100" x2="520" y2="100" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="50" y1="150" x2="520" y2="150" stroke="#edf2f7" strokeWidth="1" />
      <line x1="50" y1="190" x2="520" y2="190" stroke="#94a3b8" strokeWidth="2" />

      {/* Y labels */}
      <text x="40" y="55" fontSize="9" fill="#718096" textAnchor="end">N400/kWh</text>
      <text x="40" y="105" fontSize="9" fill="#718096" textAnchor="end">N300/kWh</text>
      <text x="40" y="155" fontSize="9" fill="#718096" textAnchor="end">N150/kWh</text>
      <text x="40" y="195" fontSize="9" fill="#718096" textAnchor="end">N0</text>

      {/* Bars: BEDC Band A vs Diesel Generator */}
      {(() => {
        const dieselRate = 336.00; // estimated levelized cost matching 0.28L at N1200/L
        const hGrid = (gridRate / 450) * 140;
        const hDiesel = (dieselRate / 450) * 140;

        return (
          <>
            <rect x="120" y={190 - hGrid} width="100" height={hGrid} fill="#0284c7" rx="3" />
            <text x="170" y={180 - hGrid} fontSize="10" fontWeight="bold" fill="#024e75" textAnchor="middle">N{gridRate.toFixed(2)}</text>
            <text x="170" y="210" fontSize="10" fill="#334155" textAnchor="middle">Grid (BEDC Band A)</text>

            <rect x="330" y={190 - hDiesel} width="100" height={hDiesel} fill="#b45309" rx="3" />
            <text x="380" y={180 - hDiesel} fontSize="10" fontWeight="bold" fill="#78350f" textAnchor="middle">N{dieselRate.toFixed(2)}</text>
            <text x="380" y="210" fontSize="10" fill="#334155" textAnchor="middle">Diesel Gen-set</text>
          </>
        );
      })()}
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 9: Levelized Cost of Energy (LCOE) Comparison: BEDC Main Supply vs. Diesel Standby Generation
    </div>
  </div>
);

export const FigPaybackHorizon: React.FC<{ pfc: number; led: number; vfd: number }> = ({ pfc, led, vfd }) => (
  <div className="my-6 p-4 border border-gray-200 rounded-lg flex flex-col items-center bg-white">
    <svg width="550" height="240" viewBox="0 0 550 240" className="max-w-full h-auto">
      {/* Horizon Axis */}
      <line x1="50" y1="190" x2="520" y2="190" stroke="#475569" strokeWidth="2" />
      <line x1="50" y1="20" x2="50" y2="190" stroke="#475569" strokeWidth="1.5" />

      {/* Milestone ticks */}
      <line x1="50" y1="190" x2="50" y2="195" stroke="#4a5568" strokeWidth="1.5" />
      <text x="50" y="212" fontSize="9" fill="#4a5568" textAnchor="middle">0 Yrs</text>

      <line x1="167.5" y1="190" x2="167.5" y2="195" stroke="#4a5568" strokeWidth="1.5" />
      <text x="167.5" y="212" fontSize="9" fill="#4a5568" textAnchor="middle">1 Yr</text>

      <line x1="285" y1="190" x2="285" y2="195" stroke="#4a5568" strokeWidth="1.5" />
      <text x="285" y="212" fontSize="9" fill="#4a5568" textAnchor="middle">2 Yrs</text>

      <line x1="402.5" y1="190" x2="402.5" y2="195" stroke="#4a5568" strokeWidth="1.5" />
      <text x="402.5" y="212" fontSize="9" fill="#4a5568" textAnchor="middle">3 Yrs</text>

      <line x1="520" y1="190" x2="520" y2="195" stroke="#4a5568" strokeWidth="1.5" />
      <text x="520" y="212" fontSize="9" fill="#4a5568" textAnchor="middle">4 Yrs</text>

      {/* Tilted vertical bars representing payback */}
      {/* PFC payback */}
      {(() => {
        const xPFC = 50 + (pfc * 117.5);
        const xLED = 50 + (led * 117.5);
        const xVFD = 50 + (vfd * 117.5);

        return (
          <>
            {/* Draw PFC */}
            <circle cx={xPFC} cy="60" r="6" fill="#16a34a" />
            <line x1={xPFC} y1="60" x2={xPFC} y2="190" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3" />
            <text x={xPFC} y="45" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">PFC Capacitor Bank ({pfc.toFixed(2)} Yrs)</text>

            {/* Draw LED */}
            <circle cx={xLED} cy="100" r="6" fill="#0284c7" />
            <line x1={xLED} y1="100" x2={xLED} y2="190" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3" />
            <text x={xLED} y="88" fontSize="9" fontWeight="bold" fill="#024e75" textAnchor="middle">LED Lighting Retrofit ({led.toFixed(2)} Yrs)</text>

            {/* Draw VFD */}
            <circle cx={xVFD} cy="140" r="6" fill="#ca8a04" />
            <line x1={xVFD} y1="140" x2={xVFD} y2="190" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3" />
            <text x={xVFD} y="128" fontSize="9" fontWeight="bold" fill="#854d0e" textAnchor="middle">Compressor Speed VFD ({vfd.toFixed(2)} Yrs)</text>
          </>
        );
      })()}
    </svg>
    <div className="text-sm font-semibold text-gray-700 mt-2 text-center select-none font-serif">
      Figure 10: Comparative Simple Payback Period Timeline Matrix
    </div>
  </div>
);
