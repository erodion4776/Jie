import React, { useState } from "react";
import { StudentInfo, Equipment, AuditParameters } from "../types";
import { 
  Download, 
  Settings, 
  Settings2, 
  Cpu, 
  TrendingUp, 
  Sliders, 
  RotateCcw,
  BookOpen
} from "lucide-react";
import { generateStandaloneHTML } from "../utils/htmlGenerator";

interface SidebarProps {
  student: StudentInfo;
  setStudent: React.Dispatch<React.SetStateAction<StudentInfo>>;
  equipment: Equipment[];
  setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
  params: AuditParameters;
  setParams: React.Dispatch<React.SetStateAction<AuditParameters>>;
  totals: {
    kw: number;
    kwh: number;
    costNGN: number;
    pf: number;
  };
  overall: {
    investment: number;
    savingsNGN: number;
    payback: number;
  };
  onReset: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  showWatermark: boolean;
  setShowWatermark: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  student,
  setStudent,
  equipment,
  setEquipment,
  params,
  setParams,
  totals,
  overall,
  onReset,
  setActiveSection,
  showWatermark,
  setShowWatermark
}) => {
  const [activeTab, setActiveTab] = useState<"metadata" | "equipment" | "parameters">("metadata");
  const [showPdfGuide, setShowPdfGuide] = useState(true);
  const [pdfGuideTab, setPdfGuideTab] = useState<"desktop" | "android" | "ios">("desktop");

  const handleStudentChange = (field: keyof StudentInfo, value: string) => {
    setStudent(prev => ({ ...prev, [field]: value }));
  };

  const handleParamChange = (field: keyof AuditParameters, value: number) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  const handleEquipmentChange = (id: string, field: keyof Equipment, value: number) => {
    setEquipment(prev => prev.map(eq => {
      if (eq.id === id) {
        return { ...eq, [field]: value };
      }
      return eq;
    }));
  };

  const triggerDownload = () => {
    const htmlContent = generateStandaloneHTML(student, equipment, params, showWatermark);
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `energy_audit_project.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full lg:w-96 bg-slate-900 text-slate-100 flex flex-col h-full border-r border-slate-800 shadow-xl overflow-hidden">
      
      {/* Brand Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white uppercase truncate max-w-[200px]">
              {student.university ? student.university : "Thesis Hub"}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">ENERGY AUDIT COMPILER</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          title="Reset Parameters"
          className="p-1 px-2 border border-slate-700 rounded text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Download Button & Interactive PDF Converter Guide */}
      <div className="p-4 bg-slate-950/60 border-b border-slate-800 space-y-3">
        <button
          onClick={triggerDownload}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all hover:scale-[1.01]"
        >
          <Download className="w-4 h-4 text-slate-950" />
          Download Standalone HTML
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowPdfGuide(prev => !prev)}
            className="w-full px-3 py-2 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all font-mono"
          >
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              PDF Conversion Guide
            </span>
            <span className="text-[10px] text-slate-400 hover:text-slate-250">
              {showPdfGuide ? "Hide" : "Show Steps"}
            </span>
          </button>
          
          {showPdfGuide && (
            <div className="border-t border-slate-800/80 bg-slate-950/20 p-3">
              {/* Segmented Tab Bar */}
              <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-0.5 rounded border border-slate-800/80 mb-3">
                <button
                  type="button"
                  onClick={() => setPdfGuideTab("desktop")}
                  className={`py-1 text-[9px] font-mono font-bold rounded text-center transition-all ${
                    pdfGuideTab === "desktop"
                      ? "bg-slate-800 text-emerald-400 shadow-sm"
                      : "text-slate-450 hover:text-slate-200"
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPdfGuideTab("android")}
                  className={`py-1 text-[9px] font-mono font-bold rounded text-center transition-all ${
                    pdfGuideTab === "android"
                      ? "bg-slate-800 text-emerald-400 shadow-sm"
                      : "text-slate-450 hover:text-slate-200"
                  }`}
                >
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => setPdfGuideTab("ios")}
                  className={`py-1 text-[9px] font-mono font-bold rounded text-center transition-all ${
                    pdfGuideTab === "ios"
                      ? "bg-slate-800 text-emerald-400 shadow-sm"
                      : "text-slate-450 hover:text-slate-200"
                  }`}
                >
                  iOS (iPhone)
                </button>
              </div>

              <div className="text-[10.5px] text-slate-300 space-y-2.5 text-left font-serif leading-relaxed">
                {pdfGuideTab === "desktop" && (
                  <>
                    <div className="font-sans text-[11px] text-emerald-400 font-bold border-b border-slate-850 pb-1 flex items-center justify-between">
                      <span>DESKTOP CHROME / SAFARI / EDGE</span>
                    </div>
                    <ol className="list-decimal pl-4.5 space-y-1.5 text-slate-300">
                      <li>
                        Click <strong className="text-white">"Download Standalone HTML"</strong> above.
                      </li>
                      <li>
                        Find and <strong className="text-white font-sans">double-click</strong> the file (<code className="font-mono text-[9px] bg-slate-950 px-1 py-0.5 rounded text-amber-400">energy_audit_project.html</code>) to open/view it.
                      </li>
                      <li>
                        Press <kbd className="font-mono text-[10px] bg-slate-850 border border-slate-705 px-1 py-0.5 rounded text-white shadow-sm">Ctrl + P</kbd> / <kbd className="font-mono text-[10px] bg-slate-850 border border-slate-705 px-1 py-0.5 rounded text-white shadow-sm">Cmd + P</kbd> to open printer dialogue.
                      </li>
                      <li>
                        Set Target Destination to <strong className="text-emerald-450">"Save as PDF"</strong>.
                      </li>
                      <li>
                        <strong className="text-white block mt-1">⚠️ Crucial Browser Toggles:</strong>
                        <ul className="list-disc pl-3.5 space-y-1 text-slate-400 mt-1">
                          <li>Toggle <strong className="text-slate-250">ON</strong> the option for <strong className="text-rose-400">"Background graphics"</strong> (renders formula styling & charts!).</li>
                          <li>Ensure <strong className="text-slate-255">Margins</strong> are set to <strong className="text-slate-255">Default</strong>.</li>
                        </ul>
                      </li>
                      <li>
                        Click <strong className="text-white">Save</strong>, select your target folder, and you're good!
                      </li>
                    </ol>
                  </>
                )}

                {pdfGuideTab === "android" && (
                  <>
                    <div className="font-sans text-[11px] text-emerald-400 font-bold border-b border-slate-850 pb-1 flex items-center justify-between">
                      <span>ANDROID (GOOGLE CHROME)</span>
                    </div>
                    <ol className="list-decimal pl-4.5 space-y-1.5 text-slate-300">
                      <li>
                        Click <strong className="text-white">"Download Standalone HTML"</strong> above.
                      </li>
                      <li>
                        Locate and open the downloaded <code className="font-mono text-[9px] bg-slate-950 px-1 py-0.5 rounded text-amber-400 font-bold">.html</code> file using the Chrome app on your phone.
                      </li>
                      <li>
                        Tap the <strong className="text-white">Three Dots menu (⋮)</strong> at the top right corner of Google Chrome.
                      </li>
                      <li>
                        Tap <strong className="text-emerald-400">Share...</strong>, then select <strong className="text-emerald-400">Print</strong> from the list of icons.
                      </li>
                      <li>
                        Tap <strong className="text-white">Select a printer</strong> at the top left and select <strong className="text-emerald-450">Save as PDF</strong>.
                      </li>
                      <li>
                        <strong className="text-white block mt-1">⚠️ Essential Toggle:</strong>
                        <span className="text-slate-400">If charts appear white or blank, expand print options and toggle <strong className="text-slate-200">Print background colors and images</strong> on.</span>
                      </li>
                      <li>
                        Tap the round yellow/green <strong className="text-emerald-400">Save PDF 💾</strong> icon to download it.
                      </li>
                    </ol>
                  </>
                )}

                {pdfGuideTab === "ios" && (
                  <>
                    <div className="font-sans text-[11px] text-emerald-400 font-bold border-b border-slate-850 pb-1 flex items-center justify-between">
                      <span>IPHONE / IPAD (SAFARI)</span>
                    </div>
                    <ol className="list-decimal pl-4.5 space-y-1.5 text-slate-300">
                      <li>
                        Click <strong className="text-white">"Download Standalone HTML"</strong> above.
                      </li>
                      <li>
                        Open your iOS <strong className="text-white">Files</strong> app, go to your downloads, and open the `.html` file (it will open perfectly in Safari).
                      </li>
                      <li>
                        Tap the Safari <strong className="text-emerald-450">Share button (📤)</strong> at the bottom of your screen.
                      </li>
                      <li>
                        Scroll down the Share sheet menu and select the <strong className="text-emerald-400">Print</strong> option.
                      </li>
                      <li>
                        <strong className="text-amber-400">💡 Native PDF Zoom Gesture:</strong>
                        <span className="text-slate-400"> On the print screen, place two fingers on any of the page thumbnail previews and <strong className="text-white">zoom out / pinch out</strong>. This instantly opens it as a native PDF document!</span>
                      </li>
                      <li>
                        Tap the top right <strong className="text-white block-inline">Share button (📤)</strong> on the new expanded PDF screen.
                      </li>
                      <li>
                        Select <strong className="text-emerald-400">"Save to Files"</strong> to save this beautiful, fully flattened thesis PDF!
                      </li>
                    </ol>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mini Scoreboard / Metric panel */}
      <div className="p-4 grid grid-cols-2 gap-2 bg-slate-950/20 border-b border-slate-800">
        <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg">
          <span className="text-[9px] text-slate-400 uppercase font-mono block">Baseline Outlay</span>
          <span className="text-sm font-semibold font-mono text-rose-400">
            ₦{Math.round(totals.costNGN).toLocaleString()}
          </span>
          <span className="text-[9px] text-slate-400 block mt-0.5">({Math.round(totals.kwh).toLocaleString()} kWh/yr)</span>
        </div>
        <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg">
          <span className="text-[9px] text-emerald-400 uppercase font-mono block">Annual Savings</span>
          <span className="text-sm font-semibold font-mono text-emerald-400">
            ₦{Math.round(overall.savingsNGN).toLocaleString()}
          </span>
          <span className="text-[9px] text-slate-400 block mt-0.5">Payback: <strong className="text-slate-300">{overall.payback.toFixed(1)} yrs</strong></span>
        </div>
      </div>

      {/* Inner Tabs Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-950/30 text-xs">
        <button
          onClick={() => setActiveTab("metadata")}
          className={`flex-1 py-3 text-center border-b-2 font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "metadata" ? "border-emerald-500 text-white bg-slate-800/40" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          Student Info
        </button>
        <button
          onClick={() => setActiveTab("equipment")}
          className={`flex-1 py-3 text-center border-b-2 font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "equipment" ? "border-emerald-500 text-white bg-slate-800/40" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          Eq. Inventory
        </button>
        <button
          onClick={() => setActiveTab("parameters")}
          className={`flex-1 py-3 text-center border-b-2 font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "parameters" ? "border-emerald-500 text-white bg-slate-800/40" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Audit Econ.
        </button>
      </div>

      {/* Active Tab Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        
        {activeTab === "metadata" && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-300 flex items-center gap-1.5 pb-1.5 border-b border-slate-800">
              <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
              University & Cover Settings
            </h3>
            
            <div className="space-y-2">
              <div>
                <label className="text-slate-400 block mb-1 font-mono">University Name</label>
                <input 
                  type="text" 
                  value={student.university} 
                  onChange={e => handleStudentChange("university", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg mt-1 font-sans">
                <span className="text-slate-300 text-[11px] font-medium">Show Academic Watermark</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showWatermark} 
                    onChange={e => setShowWatermark(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-slate-950 peer-checked:after:left-[4px]"></div>
                </label>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono">Degree Type</label>
                <input 
                  type="text" 
                  value={student.degreeType} 
                  onChange={e => handleStudentChange("degreeType", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono">Student full Name</label>
                <input 
                  type="text" 
                  value={student.studentName} 
                  onChange={e => handleStudentChange("studentName", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono">Matriculation No</label>
                <input 
                  type="text" 
                  value={student.matricNumber} 
                  onChange={e => handleStudentChange("matricNumber", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono">Project Supervisor</label>
                <input 
                  type="text" 
                  value={student.supervisorName} 
                  onChange={e => handleStudentChange("supervisorName", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono">Head of Department</label>
                <input 
                  type="text" 
                  value={student.headOfDepartment} 
                  onChange={e => handleStudentChange("headOfDepartment", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-mono">External Examiner</label>
                <input 
                  type="text" 
                  value={student.externalExaminer} 
                  onChange={e => handleStudentChange("externalExaminer", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "equipment" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-300 flex items-center gap-1.5 pb-1.5 border-b border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Upgrade Equipment Load Config
            </h3>
            
            <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">
              Alter quantities, active electrical ratings, and operational running factors of machines to see calculations update across the dissertation.
            </p>

            <div className="space-y-3 pr-1">
              {equipment.map((eq) => (
                <div key={eq.id} className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-bold text-slate-200 block truncate max-w-[210px]">{eq.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-850 border border-slate-700 rounded text-slate-400 uppercase font-mono">{eq.category}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                    <div>
                      <label className="text-slate-500 block mb-0.5">Quantity</label>
                      <input 
                        type="number" 
                        value={eq.quantity} 
                        min="0"
                        onChange={e => handleEquipmentChange(eq.id, "quantity", parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-white font-mono text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-0.5">Power (kW)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={eq.powerRatingKW} 
                        onChange={e => handleEquipmentChange(eq.id, "powerRatingKW", parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-white font-mono text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-0.5">Hr/Day</label>
                      <input 
                        type="number" 
                        value={eq.hoursPerDay} 
                        min="0"
                        max="24"
                        onChange={e => handleEquipmentChange(eq.id, "hoursPerDay", parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-white font-mono text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "parameters" && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-300 flex items-center gap-1.5 pb-1.5 border-b border-slate-800">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Economic Audit Factors
            </h3>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">BEDC Grid Tariff (₦/kWh)</label>
              <input 
                type="number" 
                value={params.tariffRate} 
                onChange={e => handleParamChange("tariffRate", parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-emerald-400 focus:outline-none focus:border-emerald-500 font-mono text-sm font-semibold"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">Target Power Factor (cos &theta;)</label>
              <input 
                type="number" 
                step="0.01"
                min="0.80"
                max="1.0"
                value={params.powerFactorCorrectionTarget} 
                onChange={e => handleParamChange("powerFactorCorrectionTarget", parseFloat(e.target.value) || 0.95)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono text-sm font-semibold"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">Capacitor Bank Cost (₦/kVAR)</label>
              <input 
                type="number" 
                value={params.capacitorBankCostPerKVAR} 
                onChange={e => handleParamChange("capacitorBankCostPerKVAR", parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">LED Lamp Unit Upgrade Cost (₦)</label>
              <input 
                type="number" 
                value={params.ledRetrofitCost} 
                onChange={e => handleParamChange("ledRetrofitCost", parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">LED Core Power Rating (kW)</label>
              <input 
                type="number" 
                step="0.001"
                value={params.ledPowerRating} 
                onChange={e => handleParamChange("ledPowerRating", parseFloat(e.target.value) || 0.018)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">Compressor VFD Modulator-set Cost (₦)</label>
              <input 
                type="number" 
                value={params.vfdUnitCost} 
                onChange={e => handleParamChange("vfdUnitCost", parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        )}

      </div>

      {/* Signature segment */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-center text-slate-500 font-serif">
        {student.university ? student.university : "Engineering"} Thesis Compiler &copy; 2026
      </div>
    </div>
  );
};
