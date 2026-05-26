import React from "react";
import { StudentInfo, Equipment, AuditParameters } from "../types";
import { 
  ThreePhasePowerFormula, 
  PowerFactorFormula, 
  ReactivePowerFormula, 
  ActiveEnergyFormula, 
  CapacitanceSizingFormula, 
  SimplePaybackFormula, 
  MotorEfficiencyFormula, 
  VoltageDropFormula 
} from "./Equations";
import { 
  FigLabLayout, 
  FigSingleLineDiagram, 
  FigFlowChart, 
  FigLoadProfile, 
  FigEnergyAllocation, 
  FigPowerFactorPhasor, 
  FigCostComparison, 
  FigCO2Reduction, 
  FigLCOEGenerator, 
  FigPaybackHorizon 
} from "./SVGCharts";
import * as ch from "../data/chaptersText";

interface AcademicDocumentProps {
  student: StudentInfo;
  equipment: Equipment[];
  params: AuditParameters;
  calculations: any; // Result of performAuditCalculations
  showWatermark: boolean;
}

export const AcademicDocument: React.FC<AcademicDocumentProps> = ({
  student,
  equipment,
  params,
  calculations,
  showWatermark
}) => {
  const totals = calculations.totals;
  const categories = calculations.categories;
  const overall = calculations.overall;
  const pfc = calculations.pfc;
  const led = calculations.led;
  const vfd = calculations.vfd;

  const replaceUni = (text: string) => {
    if (!text) return "";
    if (student.university && student.university.trim() !== "") {
      return text.replace(/University of Benin/g, student.university).replace(/UNIBEN/g, student.university);
    }
    return text.replace(/University of Benin’s/g, "the laboratory's")
               .replace(/University of Benin/g, "the university")
               .replace(/UNIBEN/g, "the university");
  };

  return (
    <div className="flex-1 bg-slate-100 p-3 md:p-8 overflow-y-auto font-serif selection:bg-emerald-200">
      {!showWatermark && (
        <style dangerouslySetInnerHTML={{ __html: `
          .opacity-\\[0\\.035\\] {
            display: none !important;
          }
        `}} />
      )}
      
      {/* Top Floating Help Bar */}
      <div className="max-w-[8.27in] mx-auto mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm text-amber-900 text-xs font-sans flex items-center justify-between no-print">
        <div>
          <strong className="block font-semibold">Academic Layout Mode: Times New Roman (A4 Equivalent)</strong>
          <span>The document blocks below reflect actual A4 sizing settings. When printing from your browser, set Margins to <strong>Default</strong>, and toggle <strong>Print background graphics</strong> on for the absolute best layout fidelity!</span>
        </div>
        <button 
          onClick={() => window.print()}
          className="ml-4 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition-all shrink-0 uppercase"
        >
          Quick Print Preview
        </button>
      </div>

      <div id="thesis-body" className="space-y-12">
        
        {/* PAGE 1: TITLE/COVER PAGE */}
        <div className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in] flex flex-col justify-between text-center select-text">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10 flex flex-col justify-between h-full flex-1">
            <div className="space-y-1.5 uppercase font-bold text-sm md:text-base leading-snug">
              <div>{student.university || "UNIVERSITY"}</div>
              <div className="text-gray-600 font-medium text-xs md:text-sm mt-1">{student.faculty}</div>
              <div className="text-gray-600 font-medium text-xs md:text-sm">{student.department}</div>
            </div>

            <div className="my-16 font-extrabold text-xl md:text-2xl text-slate-900 leading-tight tracking-tight uppercase">
              ENERGY AUDIT AND ANALYSIS OF {student.university ? student.university.toUpperCase() : "THE"} MECHANICAL ENGINEERING LABORATORY WORKSHOPS
            </div>

            <div className="my-8 text-sm md:text-base">
              <span className="text-gray-500 uppercase text-xs font-sans tracking-widest block mb-4">A Dissertation Project By:</span>
              <strong className="text-base md:text-lg block text-slate-800">{student.studentName}</strong>
              <span className="text-xs md:text-sm font-mono mt-1 px-2.5 py-1 bg-slate-100 rounded inline-block text-gray-700 font-semibold">{student.matricNumber}</span>
            </div>

            <div className="my-10 text-xs md:text-sm italic leading-relaxed text-gray-600 max-w-md mx-auto">
              A Research Thesis Submitted in Partial Fulfillment of the Requirements for the Award of the Degree of {student.degreeType} in Mechanical Engineering.
            </div>

            <div className="text-sm md:text-base font-bold uppercase text-slate-800 tracking-wider">
              BENIN CITY, NIGERIA<br />
              NOVEMBER, {student.submissionYear}
            </div>
          </div>
        </div>

        {/* PAGE 2: CERTIFICATION */}
        <div className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in] flex flex-col justify-between">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10 flex flex-col justify-between h-full flex-1">
            <div>
              <h2 className="text-center text-lg md:text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-10 tracking-widest">Certification</h2>
              <p className="text-justify text-sm md:text-base leading-relaxed text-gray-800 indent-12">
                This is to certify that this engineering research work titled <strong>"Energy Audit and Analysis of Mechanical Engineering Laboratory"</strong> was carried out by <strong>{student.studentName}</strong> (Matric No: <strong>{student.matricNumber}</strong>) under the supervision and guidance of the Department of Mechanical Engineering, {student.university || "the university"}.
              </p>
            </div>

            {/* Supervisor signatures */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
                <div className="w-full md:w-56 text-center">
                  <div className="border-t border-slate-800 pt-2 text-xs md:text-sm font-bold text-slate-800">
                    {student.supervisorName}
                  </div>
                  <div className="text-[11px] text-gray-500 font-sans mt-0.5 uppercase">Project Supervisor</div>
                </div>
                
                <div className="w-full md:w-56 text-center">
                  <div className="border-t border-slate-800 pt-2 text-xs md:text-sm font-bold text-slate-800">
                    {student.headOfDepartment}
                  </div>
                  <div className="text-[11px] text-gray-500 font-sans mt-0.5 uppercase">Head of Department</div>
                </div>
              </div>

              <div className="flex justify-center items-center mt-6">
                <div className="w-64 text-center">
                  <div className="border-t border-slate-800 pt-2 text-xs md:text-sm font-bold text-slate-800">
                    {student.externalExaminer}
                  </div>
                  <div className="text-[11px] text-gray-500 font-sans mt-0.5 uppercase">External Examiner</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 3: DEDICATION */}
        <div className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in] flex flex-col justify-center">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <h2 className="text-center text-lg md:text-xl font-bold uppercase mb-16 tracking-widest">Dedication</h2>
            <div className="text-center italic text-slate-700 space-y-6 text-sm md:text-base leading-loose max-w-lg mx-auto">
              <p>I dedicate this humble piece of engineering research work to Almighty God, the source of all intellect, grace, and life.</p>
              <p>To my beloved parents, whose prayers, infinite sacrifices, and unwavering commitment to standard qualitative education provided the foundation for my academic endeavors.</p>
              <p>And to my teachers, facilitators, and friends, who sparked the love for thermodynamics, electrical analytics, and mechanical machine systems.</p>
            </div>
          </div>
        </div>

        {/* PAGE 4: ACKNOWLEDGEMENTS */}
        <div className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in] flex flex-col justify-between">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10 flex flex-col justify-between h-full flex-1">
            <div>
              <h2 className="text-center text-lg md:text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-10 tracking-widest">Acknowledgements</h2>
              <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed text-gray-800">
                <p className="indent-12">
                  First and absolute gratitude goes to Almighty God for His enduring grace, protection, good health, and wisdom sustained throughout the duration of this engineering degree program and this project run.
                </p>
                <p className="indent-12">
                  I wish to express my deepest professional appreciation to my project supervisor, <strong>{student.supervisorName}</strong>, whose scientific rigor, systematic instruction, and meticulous attention to analytical detail guided this dissertation. His passion for modern industrial energy efficiency continues to serve as an academic inspiration.
                </p>
                <p className="indent-12">
                  I also acknowledge the Head of Department, <strong>{student.headOfDepartment}</strong>, and all the academic and technical staff of the Faculty of Engineering, {student.university || "the university"}. Special thanks go to the lab superintendents and technical officers under whose kind assistance I carried out the active clamp-current diagnostic readings of the lathe motors and welding transformers.
                </p>
                <p className="indent-12">
                  Finally, a deep depth of love and gratitude is reserved for my parents and siblings for their investments, structural support, and belief in my technological journey.
                </p>
              </div>
            </div>
            <div className="text-right text-xs md:text-sm font-semibold text-slate-800">
              {student.studentName}<br />
              Benin City, 2026
            </div>
          </div>
        </div>

        {/* PAGE 5: ABSTRACT */}
        <div className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in]">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <h2 className="text-center text-lg md:text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-10 tracking-widest">Abstract</h2>
            <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed text-gray-800">
              <p className="font-semibold block mb-4">
                This project conducts a comprehensive Level-2 energy audit and electrical diagnostic analysis of the Department of Mechanical Engineering Laboratory workshops at {student.university ? `${student.university}` : "the university workshops"}.
              </p>
              <p>
                With rising grid tariffs under NERC billing bands and high fuel price fluctuations for diesel baseline generation, tertiary engineering labs suffer severe operational expenditure strains. This audit constructed a detailed electrical inventory of 15 major systems, logging active power, power factor, active-idle times, and peak capacities. Diagnostic metering recorded a severely depressed average laboratory power factor of <b>{totals.pf.toFixed(2)} lagging</b>, caused by the concurrent operations of heavily inductive, lightly loaded legacy induction motors (such as lathe shafts, cooling pumps, and welding sets). Cumulative energy consumption reached <b>{Math.round(totals.kwh).toLocaleString()} kWh per annum</b>, translating to a massive grid bill of <b>NGN {Math.round(totals.costNGN).toLocaleString()} annually</b> at ₦{params.tariffRate.toFixed(2)} / kWh.
              </p>
              <p>
                Three major Energy Conservation Measures (ECMs) were designed and modeled: ECM 1 involved the deployment of centralized power factor correction (PFC) capacitor banks to raise the laboratory power factor to <b>{params.powerFactorCorrectionTarget.toFixed(2)}</b>; ECM 2 replaced the legacy magnetic-ballasted T8 fluorescents and incandescent spots with energy-efficient LED tubes; ECM 3 implemented Variable Frequency Drives (VFDs) on the reciprocating air compressor's 7.5kW motor.
              </p>
              <p>
                Consolidated numerical modeling proves that implementing the suggested upgrades will reduce annual energy demand by <b>{Math.round(overall.kwhSaved).toLocaleString()} kWh (a decrease of {((overall.kwhSaved / totals.kwh) * 100).toFixed(1)}%)</b>, reducing grid expenses to <b>NGN {Math.round(overall.newCostNGN).toLocaleString()}</b>, and saving <b>NGN {Math.round(overall.savingsNGN).toLocaleString()} per year</b>. The total capital expenditure required is <b>NGN {Math.round(overall.investment).toLocaleString()}</b>, yielding an extremely favorable simple payback of <b>{overall.payback.toFixed(2)} years</b> and avoiding <b>{Math.round(overall.co2ReductionKg).toLocaleString()} kg</b> of environmental carbon offsets annually.
              </p>
            </div>
          </div>
        </div>

        {/* PAGE 6: INDEX / TABLE OF CONTENTS */}
        <div id="toc-section" className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in] flex flex-col justify-between">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10 flex flex-col justify-between h-full flex-1">
            <div>
              <h2 className="text-center text-lg md:text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-10 tracking-widest">Table of Contents</h2>
              <div className="space-y-3 font-sans text-xs md:text-sm text-slate-800">
                
                <a href="#ch1" className="flex justify-between items-baseline group hover:text-emerald-500 transition-colors">
                  <span className="font-bold group-hover:underline">1. Chapter One: Introduction</span>
                  <span className="flex-1 mx-2 border-b border-dotted border-slate-400"></span>
                  <span className="font-mono">Page 1</span>
                </a>

                <a href="#ch2" className="flex justify-between items-baseline group hover:text-emerald-500 transition-colors">
                  <span className="font-bold group-hover:underline">2. Chapter Two: Literature Review</span>
                  <span className="flex-1 mx-2 border-b border-dotted border-slate-400"></span>
                  <span className="font-mono">Page 8</span>
                </a>

                <a href="#ch3" className="flex justify-between items-baseline group hover:text-emerald-500 transition-colors">
                  <span className="font-bold group-hover:underline">3. Chapter Three: Methodology</span>
                  <span className="flex-1 mx-2 border-b border-dotted border-slate-400"></span>
                  <span className="font-mono">Page 16</span>
                </a>

                <a href="#ch4" className="flex justify-between items-baseline group hover:text-emerald-500 transition-colors">
                  <span className="font-bold group-hover:underline">4. Chapter Four: Results and Discussion</span>
                  <span className="flex-1 mx-2 border-b border-dotted border-slate-400"></span>
                  <span className="font-mono">Page 25</span>
                </a>

                <a href="#ch5" className="flex justify-between items-baseline group hover:text-emerald-500 transition-colors">
                  <span className="font-bold group-hover:underline">5. Chapter Five: Conclusions & Recommendations</span>
                  <span className="flex-1 mx-2 border-b border-dotted border-slate-400"></span>
                  <span className="font-mono">Page 38</span>
                </a>

                <a href="#refs" className="flex justify-between items-baseline group hover:text-emerald-500 transition-colors">
                  <span className="font-bold group-hover:underline">6. References</span>
                  <span className="flex-1 mx-2 border-b border-dotted border-slate-400"></span>
                  <span className="font-mono">Page 45</span>
                </a>

              </div>

              <div className="mt-8">
                <h3 className="font-bold text-xs uppercase text-slate-700 tracking-wider mb-3">Prominent Document Figures</h3>
                <div className="space-y-1.5 font-sans text-xs text-gray-600">
                  <div>Figure 1.1: Schematic Layout of Mechanical Engineering Lab workshops</div>
                  <div>Figure 2.1: Single-Line Electrical Grid Feed schematic of the complex</div>
                  <div>Figure 3.1: Logical process auditing deployment methodology</div>
                  <div>Figure 4.1: Hourly diurnal active demand spikes over peak periods</div>
                  <div>Figure 5.1: Levelized Cost comparison between grids and diesel engines</div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-[10px] text-gray-400 font-mono">
              Generated Automatically for Academic Submission
            </div>
          </div>
        </div>

        {/* PAGE 7: CHAPTER ONE */}
        <div id="ch1" className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in]">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Chapter One</h3>
              <h2 className="text-lg md:text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2">Introduction</h2>
            </div>

            <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed text-gray-800">
              <h4 className="font-bold text-slate-800 mt-6 mb-2">1.1 Background of Study</h4>
              <p className="indent-12">{replaceUni(ch.backgroundOfStudy)}</p>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">1.2 Statement of Problem</h4>
              <p className="indent-12">{replaceUni(ch.statementOfProblem)}</p>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">1.3 Aim and Objectives</h4>
              <p className="indent-12">{replaceUni(ch.aimAndObjectives)}</p>

              {/* Embed Figure 1: Schematic Layout */}
              <div className="my-8">
                <FigLabLayout universityName={student.university} />
              </div>

            <h4 className="font-bold text-slate-800 mt-6 mb-2">1.4 Scope of Study</h4>
            <p className="indent-12">{replaceUni(ch.scopeOfStudy)}</p>

            <h4 className="font-bold text-slate-800 mt-6 mb-2">1.5 Significance of Study</h4>
            <p className="indent-12">{replaceUni(ch.significanceOfStudy)}</p>

            <h4 className="font-bold text-slate-800 mt-6 mb-2">1.6 Limitations of Study</h4>
            <p className="indent-12">{replaceUni(ch.limitationsOfStudy)}</p>
          </div>
        </div>
      </div>

      {/* CHAPTER TWO: LITERATURE REVIEW */}
        <div id="ch2" className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in]">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Chapter Two</h3>
              <h2 className="text-lg md:text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2">Literature Review</h2>
            </div>

            <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed text-gray-800">
              <h4 className="font-bold text-slate-800 mt-6 mb-2">2.1 Concept of Energy Audit</h4>
              <p className="indent-12">{replaceUni(ch.reviewConceptOfEnergyAudit)}</p>

              {/* Single Line diagram figure */}
              <div className="my-8">
                <FigSingleLineDiagram />
              </div>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">2.2 Types of Energy Audit</h4>
              <p className="indent-12">{replaceUni(ch.reviewTypesOfEnergyAudit)}</p>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">2.3 Energy Management Systems (EMS) and ISO 50001</h4>
              <p className="indent-12">{replaceUni(ch.reviewEnergyManagementSystems)}</p>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">2.4 Previous Research and Sub-Saharan Audit Case Studies</h4>
              <p className="indent-12">{replaceUni(ch.reviewPreviousResearch)}</p>
            </div>
          </div>
        </div>

        {/* CHAPTER THREE: METHODOLOGY */}
        <div id="ch3" className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in]">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Chapter Three</h3>
              <h2 className="text-lg md:text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2">Methodology</h2>
            </div>

            <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed text-gray-800">
              <h4 className="font-bold text-slate-800 mt-6 mb-2">3.1 Study Area and Physical Boundaries</h4>
              <p className="indent-12">{replaceUni(ch.studyAreaDetails)}</p>

              {/* Audit Process flow visual */}
              <div className="my-8">
                <FigFlowChart />
              </div>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">3.2 Power Quality Formulations and Governing Equations</h4>
              <p className="p-no-indent">
                The electrical parameters are determined via localized instrument readings. Active Power calculation for balanced three-phase mechanical loads operates under Equation 3.1:
              </p>
              
              <ThreePhasePowerFormula />

              <p className="p-no-indent">
                The composite power factor (PF) of the main secondary distribution panel expresses the ratio of true operational active work inside lines to apparent vector sums:
              </p>

              <PowerFactorFormula />

              <p className="p-no-indent">
                Reactive elements responsible for heat dissipation and copper transmission degradation are derived:
              </p>

              <ReactivePowerFormula />

              <p className="p-no-indent">
                To calculate required capacitor sizing in kVAR to achieve targeted savings, the audit utilizes the standard trigonometric phase progression:
              </p>

              <CapacitanceSizingFormula />

              <h4 className="font-bold text-slate-800 mt-6 mb-2">3.3 Field Metrology Instruments</h4>
              <p className="indent-12">{replaceUni(ch.methodologiesFieldAudit)}</p>
            </div>
          </div>
        </div>

        {/* CHAPTER FOUR: RESULTS AND ANALYSIS */}
        <div id="ch4" className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in]">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Chapter Four</h3>
              <h2 className="text-lg md:text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2">Results and Discussion</h2>
            </div>

            <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed text-gray-800">
              <h4 className="font-bold text-slate-800 mt-6 mb-2">4.1 Power Quality Measurements and Load Analysis</h4>
              <p className="indent-12">
                Based on the field diagnostic clamps, the laboratory cumulative baseline demand reached <b>{totals.kw.toFixed(2)} kW</b> active load, with a severely lagging average system power factor of <b>{totals.pf.toFixed(2)}</b>. This confirms heavy magnetic induction current saturation within distribution lines.
              </p>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">4.2 Diurnal Electrical Load Curve Profiling</h4>
              <p className="indent-12">
                The load curve below chronicles the 24-hour cycle of electrical energy drawing in mechanical bay boards. Peak demand periods match active practical classes (10:00 - 12:00) and lab testing workshops (13:00 - 16:00).
              </p>

              <div className="my-8">
                <FigLoadProfile />
              </div>

              <p className="indent-12">
                Implementing localized capacitor banks and energy-efficient lighting upgrades secures a smoother supply profile (indicated by the green curve on Figure 4), eliminating transformer strain and avoiding low power factor penalties.
              </p>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">4.3 Category Energy Allocations</h4>
              <p className="indent-12">
                Heavy induction machinery and HVAC systems constitute the major energy users (SEUs) within the mechanical laboratory complex, consuming over 80% of total electrical energy.
              </p>

              <div className="my-8">
                <FigEnergyAllocation totals={totals} categories={categories} overall={overall} />
              </div>

              <div className="my-8">
                <FigPowerFactorPhasor pf={totals.pf} target={params.powerFactorCorrectionTarget} />
              </div>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">4.4 Financial Feasibility Framework and Environmental Audits</h4>
              <p className="p-no-indent">
                To evaluate the proposed Energy Conservation Measures, simple payback models were constructed:
              </p>

              <SimplePaybackFormula />

              <div className="my-8">
                <FigCostComparison totals={totals} categories={categories} overall={overall} />
              </div>

              <p className="p-no-indent">
                Annual expenditure on grid electricity will decrease from <b>₦{Math.round(totals.costNGN).toLocaleString()}</b> to <b>₦{Math.round(overall.newCostNGN).toLocaleString()}</b>, yielding massive savings of <b>₦{Math.round(overall.savingsNGN).toLocaleString()}</b> every year. This ensures that the collective capital investment has an extremely rapid payback of <b>{overall.payback.toFixed(2)} years</b>.
              </p>

              <div className="my-8">
                <FigCO2Reduction totals={totals} categories={categories} overall={overall} />
              </div>

              <p className="p-no-indent">
                Additionally, the carbon emissions from generator fuel consumption will decrease by <b>{Math.round(overall.co2ReductionKg).toLocaleString()} kg of CO<sub>2</sub></b> per year, helping {student.university || "the university"} meet modern sustainable campus standards.
              </p>

              <div className="my-8">
                <FigLCOEGenerator gridRate={params.tariffRate} />
              </div>

              <div className="my-8">
                <FigPaybackHorizon pfc={pfc.payback} led={led.payback} vfd={vfd.payback} />
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER FIVE: CONCLUSIONS & RECOMMENDATIONS */}
        <div id="ch5" className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in]">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Chapter Five</h3>
              <h2 className="text-lg md:text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2">Conclusions and Recommendations</h2>
            </div>

            <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed text-gray-800">
              <h4 className="font-bold text-slate-800 mt-6 mb-2">5.1 Conclusions</h4>
              <p className="indent-12">
                The energy audit of {student.university ? `${student.university}'s` : "the"} Mechanical Engineering Laboratory workshops successfully isolated major, addressing-ready avenues of energy waste and quality distortions. Uncompensated reactive loading from un-rectified induction motors was identified as the root cause of the severely degraded laboratory power factor of <b>{totals.pf.toFixed(2)} lagging</b>, causing line congestion and local voltage distortions.
              </p>
              <p className="indent-12">
                By implementing the three proposed Energy Conservation Measures—PFC capacitor installation, LED lighting replacement, and compressor VFD modulation—the department can successfully eliminate <b>{Math.round(overall.kwhSaved).toLocaleString()} kWh</b> of wasteful power, equivalent to a <b>{((overall.kwhSaved / totals.kwh) * 100).toFixed(1)}% drop</b> in annual energy expenditure. This saves {student.university ? `${student.university}` : "the department/university"} <b>NGN {Math.round(overall.savingsNGN).toLocaleString()}</b> annually on utility bills, rendering the financial investment completely secure with a simple payback of <b>{overall.payback.toFixed(2)} years</b>.
              </p>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">5.2 Recommendations</h4>
              <p className="indent-12">
                Based on the mechanical engineering findings of this audit, we recommend the following timeline actions to the physical planning department:
              </p>
              <ul className="list-decimal pl-6 space-y-3 font-sans text-xs md:text-sm text-gray-700">
                <li>
                  <strong>Capacitor Banks Setup</strong>: Install a centralized multi-stage automatic capacitor bank rated at <strong>{pfc.kvarRequired.toFixed(1)} kVAR</strong> at the secondary side of the distribution board, raising the baseline power factor to <strong>{params.powerFactorCorrectionTarget.toFixed(2)} lagging</strong>. This will eliminate line over-heating and completely avoid utility low-PF surcharge penalties.
                </li>
                <li>
                  <strong>Solid State LED retroﬁt</strong>: Fully replace the 45 traditional magnetic ballasted fluorescent fittings and 10 high-bay spotlights with energy-efficient T8 LEDs.
                </li>
                <li>
                  <strong>Speed Modulator</strong>: Equip the 7.5kW reciprocating air compressor motor with a variable frequency drive to avoid frequent start-stop electrical peaks.
                </li>
                <li>
                  <strong>Operational Rules</strong>: Impose formal laboratory guidelines requiring technical officers to power down heavy machinery (lathes, shapers) when not actively cutting specimens.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* REFERENCES */}
        <div id="refs" className="relative overflow-hidden bg-white mx-auto shadow-md border border-gray-200 py-16 px-12 md:px-20 max-w-[8.27in] min-h-[11.69in]">
          {student.university && student.university.trim() !== "" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none overflow-hidden z-0">
              <div className="text-[5.5rem] font-bold uppercase tracking-[0.15em] text-slate-900/60 -rotate-[35deg] whitespace-nowrap text-center">
                {student.university}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <h2 className="text-center text-lg md:text-xl font-bold uppercase border-b-2 border-slate-900 pb-2 mb-10 tracking-widest">References</h2>
            
            <div className="space-y-6 text-sm text-gray-800 leading-relaxed text-left font-sans">
              <p className="pl-8 -indent-8">
                Akinyemi, S. O. (2021). Power quality diagnostics and power factor optimization within heavy machinery maintenance shops in South-Western Nigeria. <i>Journal of Nigerian Engineering Research</i>, 14(2), 112–120.
              </p>
              <p className="pl-8 -indent-8">
                ASHRAE. (2021). <i>Procedures for Commercial Building Energy Audits</i> (3rd ed.). Atlanta, GA: American Society of Heating, Refrigerating and Air-Conditioning Agencies.
              </p>
              <p className="pl-8 -indent-8">
                Eseosa, I. G. (2024). Energy savings through Variable Frequency Drive (VFD) controls on fluctuating lab compressors. <i>West African Journal of Applied Energy</i>, 18(1), 54–62.
              </p>
              <p className="pl-8 -indent-8">
                Ighodaro, R. A., & Osifo, E. O. (2022). Lighting and auxiliary services energy auditing in tertiary institutuion centers of South-South Nigeria. <i>International Journal of Energy Economics and Management</i>, 9(4), 88–95.
              </p>
              <p className="pl-8 -indent-8">
                ISO 50001 (2018). <i>Energy Management Systems — Requirements with guidance for use</i>. Geneva: International Organization for Standardization.
              </p>
              <p className="pl-8 -indent-8">
                Ogbemudia, K. P. (2020). Reactive power scheduling issues and powerfactor penalties under deregulated NERC billing bands. <i>Nigerian Journal of Technology Resources</i>, 32(3), 215–222.
              </p>
              <p className="pl-8 -indent-8">
                Uzamere, F. U., Okeke, J. I., & Bello, A. T. (2018). The operational cost allocation and levelized LCOE analyses of educational campuses diesel structures versus national grids. <i>UNIBEN Journal of Engineering Studies</i>, 22(1), 14–23.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
