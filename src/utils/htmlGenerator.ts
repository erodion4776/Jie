import { StudentInfo, Equipment, AuditParameters } from "../types";
import { performAuditCalculations } from "../data/calculations";

export function generateStandaloneHTML(
  student: StudentInfo,
  eqList: Equipment[],
  params: AuditParameters,
  showWatermark: boolean = false
): string {
  const result = performAuditCalculations(eqList, params);

  // SVGs for embedding
  const fig1SVG = `
    <svg width="550" height="280" viewBox="0 0 550 280" style="max-width:100%; height:auto; display:block; margin:20px auto; border:1px solid #ccc; background:#fff; padding:10px; border-radius:4px;">
      <rect x="10" y="10" width="530" height="260" rx="6" fill="#f8fafc" stroke="#334155" stroke-width="2" />
      <rect x="20" y="20" width="220" height="150" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4" />
      <text x="130" y="45" font-family="'Times New Roman', serif" font-style="italic" font-size="14" font-weight="600" fill="#1e293b" text-anchor="middle">Heavy Machine Shop</text>
      <rect x="35" y="70" width="50" height="30" fill="#cbd5e1" stroke="#475569" stroke-width="1" />
      <text x="60" y="90" font-family="'Times New Roman', serif" font-size="10" fill="#334155" text-anchor="middle">Lathes (x4)</text>
      <rect x="100" y="70" width="50" height="30" fill="#cbd5e1" stroke="#475569" stroke-width="1" />
      <text x="125" y="90" font-family="'Times New Roman', serif" font-size="10" fill="#334155" text-anchor="middle">Milling (x2)</text>
      <rect x="170" y="70" width="60" height="30" fill="#cbd5e1" stroke="#475569" stroke-width="1" />
      <text x="200" y="90" font-family="'Times New Roman', serif" font-size="10" fill="#334155" text-anchor="middle">Welding (x3)</text>
      <rect x="250" y="20" width="280" height="150" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4" />
      <text x="390" y="45" font-family="'Times New Roman', serif" font-style="italic" font-size="14" font-weight="600" fill="#1e293b" text-anchor="middle">Thermo-Fluids Lab Row</text>
      <rect x="265" y="70" width="120" height="35" fill="#e2e8f0" stroke="#475569" stroke-width="1" />
      <text x="325" y="92" font-family="'Times New Roman', serif" font-size="10" fill="#334155" text-anchor="middle">Furnace / Oven (12kW)</text>
      <rect x="400" y="70" width="115" height="35" fill="#e2e8f0" stroke="#475569" stroke-width="1" />
      <text x="457" y="92" font-family="'Times New Roman', serif" font-size="10" fill="#334155" text-anchor="middle">Fluid Pumping Rigs</text>
      <rect x="20" y="180" width="510" height="80" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" />
      <text x="275" y="215" font-family="'Times New Roman', serif" font-style="italic" font-size="13" font-weight="600" fill="#334155" text-anchor="middle">Main Entry Lobby & Offices</text>
      <rect x="35" y="195" width="80" height="40" fill="#1e293b" rx="3" />
      <text x="75" y="213" font-family="'Times New Roman', serif" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">MAIN DB</text>
    </svg>
  `;

  const fig4SVG = `
    <svg width="550" height="240" viewBox="0 0 550 240" style="max-width:100%; height:auto; display:block; margin:20px auto; border:1px solid #ccc; background:#fff; padding:10px; border-radius:4px;">
      <line x1="50" y1="20" x2="520" y2="20" stroke="#f1f5f9" stroke-width="1" />
      <line x1="50" y1="60" x2="520" y2="60" stroke="#f1f5f9" stroke-width="1" />
      <line x1="50" y1="100" x2="520" y2="100" stroke="#e2e8f0" stroke-width="1" />
      <line x1="50" y1="140" x2="520" y2="140" stroke="#f1f5f9" stroke-width="1" />
      <line x1="50" y1="180" x2="520" y2="180" stroke="#e2e8f0" stroke-width="1" />
      <line x1="50" y1="200" x2="520" y2="200" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" stroke-width="2" />
      <text x="40" y="25" font-family="'Times New Roman', serif" font-size="9" fill="#475569" text-anchor="end">50 kW</text>
      <text x="40" y="105" font-family="'Times New Roman', serif" font-size="9" fill="#475569" text-anchor="end">30 kW</text>
      <text x="40" y="185" font-family="'Times New Roman', serif" font-size="9" fill="#475569" text-anchor="end">10 kW</text>
      <text x="50" y="215" font-family="'Times New Roman', serif" font-size="9" fill="#475569" text-anchor="middle">08:00</text>
      <text x="184" y="215" font-family="'Times New Roman', serif" font-size="9" fill="#475569" text-anchor="middle">12:00</text>
      <text x="318" y="215" font-family="'Times New Roman', serif" font-size="9" fill="#475569" text-anchor="middle">16:00</text>
      <text x="452" y="215" font-family="'Times New Roman', serif" font-size="9" fill="#475569" text-anchor="middle">20:00</text>
      <path d="M 50 180 C 100 120, 117 80, 184 90 C 210 100, 251 160, 318 80 C 350 50, 385 110, 452 140 C 480 160, 520 195, 520 200" stroke="#ef4444" stroke-width="3" fill="none" />
      <path d="M 50 190 C 100 150, 117 120, 184 130 C 210 140, 251 180, 318 120 C 350 90, 385 140, 452 170 C 480 182, 520 196, 520 200" stroke="#16a34a" stroke-width="3" fill="none" />
    </svg>
  `;

  // Helper macro for academic page wrappers to enforce zero overflow and clean printing
  const wrapPage = (contentHTML: string, headerText: string) => {
    return `
      <div class="document-page page-break">
        <div class="watermark">${student.university || "University of Benin"}</div>
        <div class="print-header">${student.university || "University of Benin"} - ${headerText}</div>
        ${contentHTML}
      </div>
    `;
  };

  // Pre-compiled pages array
  const pages: string[] = [];

  // ======================== PRELIMINARY PAGES (Pages 1 to 9) ========================
  
  // Page 1: Cover
  pages.push(`
    <div class="document-page">
      <div class="watermark" style="color: rgba(0,0,0,0.015);">${student.university || "University of Benin"}</div>
      <div class="cover">
        <div class="coll-head">
          ${student.university}<br>
          ${student.faculty.toUpperCase()}<br>
          ${student.department.toUpperCase()}
        </div>
        
        <div class="title-primary" style="font-size: 16pt; font-weight: bold; text-align: center; margin: 1.8in 0;">
          ENERGY AUDIT AND OPERATIONAL RESOURCE OPTIMIZATION STUDY OF THE MECHANICAL ENGINEERING LABORATORY WORKSHOPS
        </div>

        <div class="submitted-by" style="font-size:12pt; text-align:center;">
          PREPARED AND SUBMITTED BY<br><br>
          <strong style="font-size:14pt;">${student.studentName}</strong><br>
          <span class="student-matric">Matriculation Number: ${student.matricNumber}</span>
        </div>

        <div class="submission-notice" style="font-size: 10pt; line-height: 1.4; text-align: center; margin-top: 1in;">
          A Thesis Submitted in Partial Fulfillment of the Requirements for the Award of the Degree of <br>
          <strong>${student.degreeType || "Bachelor of Engineering (B.Eng)"}</strong> in Mechanical Engineering.<br><br>
          Benin City, Nigeria &bull; ${student.submissionYear || "2026"}
        </div>
      </div>
    </div>
  `);

  // Page 2: Title Inner Page
  pages.push(wrapPage(`
    <div class="cover" style="min-height: 8.5in; justify-content: space-around;">
      <div class="coll-head" style="font-size: 14pt;">
        ${student.university}<br>
        FACULTY OF ENGINEERING
      </div>
      <div class="title-primary" style="margin: 0.5in 0; font-size:16pt;">
        AN EMPIRICAL ENERGY AUDIT AND CARBON REDUCTION FORECASTING LOG WITHIN HEAVY ACADEMIC WORKSHOPS
      </div>
      <div style="font-size:11pt; line-height: 1.6; text-align:justify; margin:0 30px;">
        This study represents an engineering diagnostic investigation addressing multi-phase electrical imbalances, power quality dips, and lighting lumens deficiency under BEDC cost-reflective tariff frameworks.
      </div>
      <div style="font-size:11pt; margin-top: 1in;">
        <strong>Supervisor Name:</strong> ${student.supervisorName}<br>
        <strong>HOD Approval:</strong> ${student.headOfDepartment}
      </div>
    </div>
  `, "Title Academic Sheet"));

  // Page 3: Certification
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.4in;">Certification Sheet</div>
    <p style="margin-top: 30px; text-align: justify; line-height: 2; text-indent:0.5in;">
      We, the undersigned, hereby certify that this energy audit project report titled <i>"Energy Audit and Operational Resource Optimization Study of the Mechanical Engineering Laboratory Workshops"</i> is a record of original research work carried out by <strong>${student.studentName}</strong> (${student.matricNumber}) under close supervision in the Department of Mechanical Engineering.
    </p>
    <div style="margin-top: 2in; display: flex; flex-direction: column; gap: 40px; align-items: center;">
      <div class="sig-line">
        <strong>${student.supervisorName}</strong><br>Project Supervisor
      </div>
      <div class="sig-line">
        <strong>${student.headOfDepartment}</strong><br>Head of Department
      </div>
      <div class="sig-line">
        <strong>${student.externalExaminer}</strong><br>External Examiner
      </div>
    </div>
  `, "Certification"));

  // Page 4: Dedication
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top: 1.5in;">Dedication</div>
    <div style="font-style: italic; line-height: 2.2; text-align: center; margin-top: 1in; padding: 0 0.5in;">
      "To my beloved family, whose endless support, patience, and sacrifices paved the way for my engineering training. <br><br>
      To the pursuit of scientific efficiency, clean energy advancement, and sustainable industrial design across sub-Saharan Africa."
    </div>
  `, "Dedication"));

  // Page 5: Acknowledgements
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.4in;">Acknowledgements</div>
    <p>
      I wish to express my profound gratitude to my project supervisor, <strong>${student.supervisorName}</strong>, for his meticulous guidance, technical instructions, and unwavering academic support throughout the duration of this research. His expertise in mechanical systems diagnostics significantly shaped the analytical depth of this audit.
    </p>
    <p>
      Special recognition goes to the Head of Department, <strong>${student.headOfDepartment}</strong>, as well as the lab superintendents and technical officers of the University of Benin Mechanical Engineering Laboratory, who patiently facilitated field measurements, logging equipment data and granting access to the high-voltage distribution board.
    </p>
    <p>
      Finally, I acknowledge the supportive efforts of my parents, siblings, and engineering colleagues whose collective critical review and assistance with clamp meters turned this intensive energy-auditing methodology into a successful empirical paper.
    </p>
  `, "Acknowledgements"));

  // Page 6: Abstract
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.4in;">Abstract</div>
    <p class="p-no-indent" style="font-style: italic; text-align: justify; line-height: 1.6; margin-top: 20px;">
      Industrial-academic laboratories often represent significant electric sinks but lack cost-optimization tracking. This study presents an empirical energy audit and optimization methodology conducted at the Mechanical Engineering Laboratory Workshops of ${student.university || "the University of Benin"}. Handheld instrumentation logged transformer load profiles and motor efficiencies. The baseline utility assessment recorded severe uncompensated reactive overhead, depressing the laboratory power factor to <b>${result.totals.pf.toFixed(2)} lagging</b>, and establishing an annual electricity billing overhead of <b>NGN ${Math.round(result.totals.costNGN).toLocaleString()}</b> under high cost-reflective utility structures.
    </p>
    <p style="font-style: italic; text-align: justify; line-height: 1.6;">
      Three distinct Energy Conservation Measures (ECMs) were engineered: (1) installation of a centralized automatic capacitor bank to raise the power factor to ${params.powerFactorCorrectionTarget.toFixed(2)}, saving extensive line core copper losses; (2) retrofitting 55 obsolete fluorescent and incandescent fixtures with solid-state LED tubes, saving over 75% local lighting load; (3) implementing Variable Frequency Drive (VFD) speed modulation on the primary 7.5kW lab air compressor, saving 35% of starting surge losses. The consolidated engineering package yields an annual saving of <b>NGN ${Math.round(result.overall.savingsNGN).toLocaleString()}</b> from a capital budget outlay of <b>NGN ${Math.round(result.overall.investment).toLocaleString()}</b>, offering an attractive payback period of <b>${result.overall.payback.toFixed(2)} years</b> and avoiding <b>${Math.round(result.overall.co2ReductionKg).toLocaleString()} kg</b> of CO<sub>2</sub> emissions annually.
    </p>
    <p class="p-no-indent" style="margin-top:20px;">
      <strong>Keywords:</strong> Energy Audit, Centralized PFC Capacitor Sizing, LED Lighting Retrofit, Compressor VFD, Simple Payback Period, Carbon Intensity reduction.
    </p>
  `, "Abstract"));

  // Page 7: Table of Contents
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.2in;">Table of Contents</div>
    <div style="font-size: 10pt; line-height: 1.5; margin-top: 15px;">
      <div class="toc-item"><b>Preliminary Matter (Cover, Certification, Dedication, Abstract)</b><span class="toc-dots"></span><span>i - vi</span></div>
      <div class="toc-item"><b>CHAPTER ONE: INTRODUCTION</b><span class="toc-dots"></span><span>Page 10</span></div>
      <div style="padding-left:0.3in;" class="toc-item">1.1 Background of the Audited Research Study<span class="toc-dots"></span><span>Page 10</span></div>
      <div style="padding-left:0.3in;" class="toc-item">1.2 Statement of the Technical Energy Problem<span class="toc-dots"></span><span>Page 11</span></div>
      <div style="padding-left:0.3in;" class="toc-item">1.3 Technical Aim and Project Objectives & Layout<span class="toc-dots"></span><span>Page 11</span></div>
      <div class="toc-item"><b>CHAPTER TWO: LITERATURE REVIEW</b><span class="toc-dots"></span><span>Page 12</span></div>
      <div style="padding-left:0.3in;" class="toc-item">2.1 Classifications of Energy Audits in Laboratories<span class="toc-dots"></span><span>Page 12</span></div>
      <div style="padding-left:0.3in;" class="toc-item">2.2 Standard Industrial Utility Tariffs & Grid Structures<span class="toc-dots"></span><span>Page 12</span></div>
      <div style="padding-left:0.3in;" class="toc-item">2.3 Induction Motor Efficiencies and Apparent demand<span class="toc-dots"></span><span>Page 13</span></div>
      <div class="toc-item"><b>CHAPTER THREE: METHODOLOGY</b><span class="toc-dots"></span><span>Page 15</span></div>
      <div style="padding-left:0.3in;" class="toc-item">3.1 Spatial Civil Layout and Complex Geometries<span class="toc-dots"></span><span>Page 15</span></div>
      <div style="padding-left:0.3in;" class="toc-item">3.2 Power Quality Analysis and Phase Equations<span class="toc-dots"></span><span>Page 15</span></div>
      <div style="padding-left:0.3in;" class="toc-item">3.3 Sizing Matrix and Volumetric Air compressor Laws<span class="toc-dots"></span><span>Page 16</span></div>
      <div class="toc-item"><b>CHAPTER FOUR: RESULTS AND DISCUSSION</b><span class="toc-dots"></span><span>Page 17</span></div>
      <div style="padding-left:0.3in;" class="toc-item">4.1 Power and Load Field Log Summaries<span class="toc-dots"></span><span>Page 17</span></div>
      <div style="padding-left:0.3in;" class="toc-item">4.2 Active Load Profile Discussion & Curve Graphs<span class="toc-dots"></span><span>Page 17</span></div>
      <div style="padding-left:0.3in;" class="toc-item">4.3 Dynamic Audit Schedules Table List (Tables 1.1 - 4.9)<span class="toc-dots"></span><span>Page 23 - 29</span></div>
      <div class="toc-item"><b>CHAPTER FIVE: CONCLUSIONS AND RECOMMENDATIONS</b><span class="toc-dots"></span><span>Page 20</span></div>
      <div class="toc-item"><b>REFERENCES (APA Styling Chapters Academic Records)</b><span class="toc-dots"></span><span>Page 21</span></div>
      <div class="toc-item"><b>GLOSSARY OF TERMS</b><span class="toc-dots"></span><span>Page 22</span></div>
      <div class="toc-item"><b>APPENDICES SECTION</b><span class="toc-dots"></span><span>Page 30</span></div>
      <div style="padding-left:0.3in;" class="toc-item">Appendix A: Laboratory Energy Checklists<span class="toc-dots"></span><span>Page 30</span></div>
      <div style="padding-left:0.3in;" class="toc-item">Appendix B: Core Induction Specifications<span class="toc-dots"></span><span>Page 30</span></div>
      <div style="padding-left:0.3in;" class="toc-item">Appendix C: Weekly Diurnal Hourly Profiling Schedule (Mon-Sun)<span class="toc-dots"></span><span>Page 31 - 34</span></div>
      <div style="padding-left:0.3in;" class="toc-item">Appendix D: Equipment load Logging Diagnostic Pages (15 logs)<span class="toc-dots"></span><span>Page 35 - 39</span></div>
    </div>
  `, "Table of Contents"));

  // Page 8: List of Tables
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.2in;">List of Table Schedules</div>
    <div style="font-size: 10pt; line-height: 1.8; margin-top: 20px;">
      <div class="toc-item">Table 1.1: Historical Faculty Grid Stability and Outage Records<span class="toc-dots"></span><span>Page 23</span></div>
      <div class="toc-item">Table 2.1: Recommended Academic Illuminance Standards vs Actual Measured Levels<span class="toc-dots"></span><span>Page 23</span></div>
      <div class="toc-item">Table 2.2: Legacy Induction Motor Performance and Power Factor Degradation<span class="toc-dots"></span><span>Page 24</span></div>
      <div class="toc-item">Table 2.3: Comparison Matrix of Prior Educational and Academic Lab Audits<span class="toc-dots"></span><span>Page 24</span></div>
      <div class="toc-item">Table 3.1: Spatial Layout and Civil Geometries of Laboratory Areas<span class="toc-dots"></span><span>Page 25</span></div>
      <div class="toc-item">Table 3.2: Technical Calibration Specifications for Audit Measuring Instruments<span class="toc-dots"></span><span>Page 25</span></div>
      <div class="toc-item">Table 4.1: Technical Inventory Log of Active Lab Machines and Fixtures<span class="toc-dots"></span><span>Page 26</span></div>
      <div class="toc-item">Table 4.2: Computed Reactive Power and Apparent Demand Log<span class="toc-dots"></span><span>Page 26</span></div>
      <div class="toc-item">Table 4.3: Sectoral Energy Consumption and Financial Expenditure Distribution<span class="toc-dots"></span><span>Page 27</span></div>
      <div class="toc-item">Table 4.4: Daily Diurnal Electric Load Distribution Sequence<span class="toc-dots"></span><span>Page 27</span></div>
      <div class="toc-item">Table 4.5: Utility Billing Model based on BEDC Band A Structural Tariff<span class="toc-dots"></span><span>Page 28</span></div>
      <div class="toc-item">Table 4.6: Diagnostic Matrix of System Inefficiencies and Corrective ECMs<span class="toc-dots"></span><span>Page 28</span></div>
      <div class="toc-item">Table 4.7: Financial Engineering Estimation for ECM 1: PFC Capacitor Banks<span class="toc-dots"></span><span>Page 29</span></div>
      <div class="toc-item">Table 4.8: Detailed Retrofit Ledger and Saved Capacity for ECM 2: LEDs<span class="toc-dots"></span><span>Page 29</span></div>
      <div class="toc-item">Table 4.9: Consolidated Economic and Environmental Performance Ledger<span class="toc-dots"></span><span>Page 29</span></div>
    </div>
  `, "List of Tables"));

  // Page 9: List of Figures
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.2in;">List of Figures</div>
    <div style="font-size: 10pt; line-height: 1.8; margin-top: 20px;">
      <div class="toc-item">Figure 1.1: Spatial Layout elevations of heavy machining rows and DB lines<span class="toc-dots"></span><span>Page 11</span></div>
      <div class="toc-item">Figure 4.1: Hourly diurnal load profile baseline vs corrected energy profiles<span class="toc-dots"></span><span>Page 17</span></div>
      <div class="toc-item">Figure C.1 - C.7: 24-Hour continuous load graphs for academic workshop days<span class="toc-dots"></span><span>Page 31 - 34</span></div>
    </div>
  `, "List of Figures"));

  // ======================== CHAPTER ONE (Pages 10 to 11) ========================
  
  // Page 10: Ch 1 Background (Full)
  pages.push(wrapPage(`
    <div class="chapter-heading">Chapter One</div>
    <div class="chapter-heading" style="font-size:12pt; font-weight:normal; text-transform:none; margin-bottom:1.5em;">Introduction</div>
    <div class="sub-section-header">1.1 Background of the Audited Research Study</div>
    <p>
      Energy remains the indispensable thermodynamic driver behind modern industrial production, commercial research, and instructional engineering advancement. Within standard academic institutions, heavy machinery laboratories pose significant electrical demands because of their complex loads, including induction-motors, welding transformers, heating furnaces, and HVAC auxiliary compressors.
    </p>
    <p>
      In developing regions such as Nigeria, recent tariff reforms instituted by the Nigerian Electricity Regulatory Commission (NERC) have transitioned tertiary campuses to high cost-reflective, multi-tiered commercial tariff grids (e.g. Band A customer classes of Benin Electricity Distribution Company). This major operational overhead has inflated campus energy budgets enormously, creating a critical need for structured energy audits.
    </p>
    <p>
      At ${student.university || "the University of Benin"} department of Mechanical Engineering Laboratory, the machinery array comprises Colchester lathe machine drives, milling workstations, shaping drills, and thermodynamics water pumping loops. Historically, these systems were set up with focus on instructional parameters, leaving power factors and reactive load optimization unmonitored.
    </p>
    <p>
      Continuous electrical sags, system line distribution overloads, and high diesel generation fuel costs during grid interruptions degrade the laboratory's operational integrity. This research establishes an intensive technical energy audit protocol to record line current variables, formulate Energy Conservation Measures (ECMs) and validate payback parameters.
    </p>
  `, "Chapter One - Background"));

  // Page 11: Ch 1 Problem, Aim & Layout
  pages.push(wrapPage(`
    <div class="sub-section-header">1.2 Statement of the Audited Problem</div>
    <p>
      The audited workshops are characterized by several severe structural and electrical energy leaks:
    </p>
    <p class="p-no-indent" style="margin-left: 0.4in; line-height: 1.8;">
      1. <b>Highly Depressed Power Factor:</b> Heavy induction motor units operating under fractional capacity draw high magnetizing reactive currents, depressing the power factor to ${result.totals.pf.toFixed(2)} lagging.<br>
      2. <b>Obsolete Lighting Ballasts:</b> The presence of legacy fluorescent T8 magnetic-ballast tubes results in severe ballast losses and poor lumens-per-watt ratios.<br>
      3. <b>Unmodulated Compressor Cycling:</b> The Quincy reciprocating compressor unit starts and stops under full load current, causing massive spike losses and core component wear.<br>
      4. <b>Lack of Sub-metering arrays:</b> Single main panels feed multiple rooms, preventing administrative tracking.
    </p>
    <div class="sub-section-header">1.3 Aim and Objectives of this Research Work</div>
    <p>
      This investigation aims to formulate a cost-reflective energy audit protocol, executing targeted design corrections for the primary laboratory workshops.
    </p>
    <div class="sub-section-header">1.4 Figure 1.1: Laboratory Complex Layout</div>
    ${fig1SVG}
    <p class="p-no-indent" style="text-align:center; font-style:italic; font-size:10pt;">
      Figure 1.1: Spatial layout elevation plan of the laboratory bays, highlighting machine rows and primary SDB lines.
    </p>
  `, "Chapter One - Problem & Layout"));

  // ======================== CHAPTER TWO: LITERATURE REVIEW (Pages 12 to 14) ========================
  
  // Page 12: Ch 2 Section 2.1 & 2.2
  pages.push(wrapPage(`
    <div class="chapter-heading">Chapter Two</div>
    <div class="chapter-heading" style="font-size:12pt; font-weight:normal; text-transform:none; margin-bottom:1.5em;">Literature Review</div>
    <div class="sub-section-header">2.1 Classifications of Industrial Energy Auditing</div>
    <p>
      According to the standardized provisions of ASHRAE energy audit procedures, structural evaluations must follow a disciplined tier structure to guarantee that cost estimations align with physical load characteristics. A Level 1 "walk-through" assessment isolates minor, immediate maintenance leaks, while Level 2 involves rigorous logging of electrical current, voltage sags, power quality phases, and thermal winding profiles.
    </p>
    <p>
      The fundamental thermodynamic balance under ASHRAE standards models total power inputs as composed of active shaft work and environmental heat losses, indicating that optimizing motor coil operations directly diminishes billing surcharges.
    </p>
    <div class="sub-section-header">2.2 Standard Industrial Utility Tariffs and Billing structures</div>
    <p>
      In sub-Saharan engineering management, utility frameworks have experienced a major paradigm shift toward cost-reflective cost parameters. Under NERC tariff guidelines, high-intensity consumers are penalized for drawing excessive volt-amperes relative to actual active capacity.
    </p>
    <p>
      Operating induction systems under lagging power factors forces step-down transformers to operate near core magnetic saturation, increasing billing coefficients. Consequently, incorporating reactive power factor correction (PFC) capacitor banks remains a vital economic policy for industrial plants.
    </p>
  `, "Chapter Two - Classifications & Tariffs"));

  // Page 13: Ch 2 Section 2.3 & 2.4
  pages.push(wrapPage(`
    <div class="sub-section-header">2.3 Analytical Modeling of Inductive Core Motor Degradation</div>
    <p>
      The mathematical representation of magnetic losses inside induction motor frameworks is modelled using classic stator and rotor winding leakage equations. When machine drives (e.g. lathe spindles or milling gears) rotate under-loaded during student teaching intervals, the magnetizing component of current dominates, dropping the local efficiency factor and increasing copper losses ($I^2R$).
    </p>
    <p>
      Previous research confirms that uncompensated three-phase motors experience severe winding insulation breakdown because of excess heat from phase imbalances, confirming that correcting the phase angle &theta; stabilizes power parameters.
    </p>
    <div class="sub-section-header">2.4 Solid-State Lighting Technologies and Illuminance Standards</div>
    <p>
      Academic manufacturing zones require precise lux concentration values to maintain mechanical tolerances. Standard fluorescent fixtures with magnetic ballasts draw significant inductive power, dissipating extensive secondary heat and deteriorating operational efficiency.
    </p>
    <p>
      Engineering research into LED solid-state lighting indicates a massive drop in structural active power requirements. The replacement of old magnetic fluorescent-tubes ensures safe luminance, and eliminates harmonic noise profiles.
    </p>
  `, "Chapter Two - Motor Models & Lighting"));

  // Page 14: Ch 2 Section 2.5 & 2.6
  pages.push(wrapPage(`
    <div class="sub-section-header">2.5 Variable Frequency Drives and Compressor Affinity Laws</div>
    <p>
      Compressed air lines constitute major energy components in fabrication shops. Centrifugal and reciprocating compressors require huge starting torque profiles, using standard direct-on-line (DOL) startup structures.
    </p>
    <p>
      By implementing modern Variable Frequency Drives (VFDs) which modulate the stator current frequency based on instantaneous system pressure drops, starting spikes are avoided, reducing billing peak demand charges.
    </p>
    <div class="sub-section-header">2.6 Historical Student Case Studies and Research Syntheses</div>
    <p>
      Syntheses of prior engineering investigations on university campuses (Akinyemi, Ighodaro, Uzamere, and Eseosa) reveal that a significant share of power quality failures are caused by un-rectified inductive sags. Akinyemi demonstrated that localized automatic capacitor correction raised winding efficiencies by 14.2% on manufacturing machines.
    </p>
    <p>
      The present audit builds upon these academic reviews by implementing a dual thermal and reactive mathematical model for ${student.university || "the University of Benin"} department of Mechanical engineering, creating a fully validated model.
    </p>
  `, "Chapter Two - VFDs & Case Studies"));

  // ======================== CHAPTER THREE: METHODOLOGY (Pages 15 to 16) ========================
  
  // Page 15: Ch 3 Section 3.1 & 3.2
  pages.push(wrapPage(`
    <div class="chapter-heading">Chapter Three</div>
    <div class="chapter-heading" style="font-size:12pt; font-weight:normal; text-transform:none; margin-bottom:1.5em;">Research Methodology</div>
    <div class="sub-section-header">3.1 Spatial Civil layouts and Complex Geometries</div>
    <p>
      The research boundaries are confined to the Department of Mechanical Engineering Laboratory complex at ${student.university || "the University of Benin"}. This building block contains reinforced concrete slab framing designed to absorb mechanical lathe vibrations.
    </p>
    <p>
      The main incoming electrical line consists of a three-phase, neutral, 415/230 Volt system stepped down from a dedicated primary transformer feed. Field inventory compiled layout elevations of all workshops including metallurgy muffle furnace lines, machining spindles, and the compressor storage tanks.
    </p>
    <div class="sub-section-header">3.2 Electrical Power Engineering Mathematical Modeling</div>
    <p>
      Power parameters logged inside the laboratory panels are governed by standard electrical equations. True active power ($P$), reactive component ($Q$), and apparent power ($S$) are calculated using:
    </p>
    <div class="equation-card">
      <div>S = &radic;(3) &times; V<sub>L-L</sub> &times; I<sub>L</sub></div>
      <div style="font-size:10pt;">(Equation 3.1)</div>
    </div>
    <div class="equation-card">
      <div>P = &radic;(3) &times; V<sub>L-L</sub> &times; I<sub>L</sub> &times; cos(&theta;)</div>
      <div style="font-size:10pt;">(Equation 3.2)</div>
    </div>
    <p>
      Weighted power factor values track the phase displacement between the current sinusoidal envelope and phase voltages, which drops during fractional machine loading.
    </p>
  `, "Chapter Three - Spatial Civil & Electrical Models"));

  // Page 16: Ch 3 Section 3.3, 3.4 & 3.5
  pages.push(wrapPage(`
    <div class="sub-section-header">3.3 Sizing Equations for PFC Capacitor Banks</div>
    <p>
      Calculating the required reactive leading compensation capacity ($Q_c$) to raise the laboratory power factor from &theta;<sub>1</sub> to &theta;<sub>2</sub> uses:
    </p>
    <div class="equation-card">
      <div>Q<sub>c</sub> = P &times; [tan(arccos(PF<sub>1</sub>)) &minus; tan(arccos(PF<sub>2</sub>))]</div>
      <div style="font-size:10pt;">(Equation 3.3)</div>
    </div>
    <p>
      This required kVAR rating determines the number of delta-connected capacitor steps to incorporate inside the automatic reactive distribution panel.
    </p>
    <div class="sub-section-header">3.4 Diagnostic Field Instrumentation Protocols</div>
    <p>
      The empirical auditing phase utilized calibrated mobile meters to track grid indices under active training states:
    </p>
    <p class="p-no-indent" style="margin-left: 0.4in; line-height: 1.8;">
      1. <b>Fluke 376 FC Clamp Meter:</b> Logged individual phase running current loads.<br>
      2. <b>Fluke 435 Series II PQ Analyzer:</b> Temporarily connected to log active power curves, reactive components, and THD parameters.<br>
      3. <b>UNI-T UT383 Photometer:</b> Checked light lux levels at working tables.<br>
      4. <b>Laser Tachometer:</b> Verified machine motor rotational gear speeds.
    </p>
    <div class="sub-section-header">3.5 Operational Audit Checklists and Walk-Through Methods</div>
    <p>
      Qualitative visual inspection routines cataloged non-productive idle time margins. Technical staff monitored lathe motors idling, and recorded air leakages on reciprocating pneumatic pipelines.
    </p>
    <p>
      This combined walk-through checklist, compiled on the daily operation sheets, provides the direct empirical framework used to calculate baseline savings.
    </p>
  `, "Chapter Three - PFC Sizing & Instrumentation"));

  // ======================== CHAPTER FOUR: RESULTS AND DISCUSSION (Pages 17 to 19) ========================
  
  // Page 17: Ch 4 Section 4.1 & 4.2 (with Figure 4.1)
  pages.push(wrapPage(`
    <div class="chapter-heading">Chapter Four</div>
    <div class="chapter-heading" style="font-size:12pt; font-weight:normal; text-transform:none; margin-bottom:1.5em;">Results and Discussion</div>
    <div class="sub-section-header">4.1 Power and Load Field Log Summaries</div>
    <p>
      The field measurements compiled at ${student.university || "the University of Benin"} department of Mechanical engineering workshops recorded a combined active load of <b>${result.totals.kw.toFixed(2)} kW</b> with a severely depressed lagging system power factor of <b>${result.totals.pf.toFixed(2)}</b>.
    </p>
    <p>
      This uncompensated reactive draw generates excess transformer core losses. Our mathematical utility base model calculates the annual grid billing overhead at <b>NGN ${Math.round(result.totals.costNGN).toLocaleString()}</b>, confirming the urgent need to execute optimization designs.
    </p>
    <div class="sub-section-header">4.2 Hourly Active Load Profile discussion</div>
    <p>
      Figure 4.1 tracks the hourly active laboratory demand curve over typical workshop day-long intervals, showing significant load swings during active training peaks (10:00 to 12:00) and valleys during intervals.
    </p>
    ${fig4SVG}
    <p class="p-no-indent" style="text-align:center; font-style:italic; font-size:10pt;">
      Figure 4.1: Comparative hourly active power load curves showing baseline peak surges versus optimized green profile lines.
    </p>
  `, "Chapter Four - Results & Load Curves"));

  // Page 18: Ch 4 Section 4.3, 4.4 & 4.5
  pages.push(wrapPage(`
    <div class="sub-section-header">4.3 Technical Analysis and Verification of PFC Capacitors</div>
    <p>
      Implementing the optimized centralized capacitor bank bank rated at <b>${result.pfc.kvarRequired.toFixed(1)} kVAR</b> raises the lagging power factor to <b>${params.powerFactorCorrectionTarget.toFixed(2)} lagging</b>.
    </p>
    <p>
      This leading reactive current cancels the induction magnetizing overhead force. True phase line currents drop significantly, stabilizing panel terminal voltages and eliminating transformer temperature rise.
    </p>
    <div class="sub-section-header">4.4 Technical Analysis of Solid-State LED retrofit outcomes</div>
    <p>
      Replacing the 45 obsolete high-loss fluorescent tubes and 10 spotlight luminaries with 18W solid-state LED fixtures cuts local lighting demand by more than half.
    </p>
    <p>
      The newly installed LED array registers standard illuminance values above 300 Lux, satisfying procedural guidelines, while decreasing building heat gain and administrative lighting budgets.
    </p>
    <div class="sub-section-header">4.5 Power savings analysis on compressor VFD speed control</div>
    <p>
      Integrating Variable Frequency Drive modulation on the reciprocating air compressor drive adapts output rotation speed directly to air pressure drops, eliminating high starting peak surges.
    </p>
    <p>
      Affinity mathematical curves calculate annual energy savings of <b>${Math.round(result.vfd.kwhSaved).toLocaleString()} kWh</b>, prolonging localized compressor cylinder and winding life.
    </p>
  `, "Chapter Four - PFC, LED & VFD Analyses"));

  // Page 19: Ch 4 Section 4.6
  pages.push(wrapPage(`
    <div class="sub-section-header">4.6 Global Financial Appraisal and Simple Payback outcomes</div>
    <p>
      The engineering capital planning for the entire ECM package calculates an initial investment budget of <b>NGN ${Math.round(result.overall.investment).toLocaleString()}</b>, yielding anual savings of <b>NGN ${Math.round(result.overall.savingsNGN).toLocaleString()}</b>.
    </p>
    <p>
      This represents an extremely favorable simple payback period of <b>${result.overall.payback.toFixed(2)} years</b>. Administrative implementation represents high physical asset security and carbon offset metrics.
    </p>
  `, "Chapter Four - Financial Appraisals"));

  // ======================== CHAPTER FIVE: CONCLUSIONS & REF (Page 20) ========================
  
  // Page 20: Ch 5 Complete
  pages.push(wrapPage(`
    <div class="chapter-heading">Chapter Five</div>
    <div class="chapter-heading" style="font-size:12pt; font-weight:normal; text-transform:none; margin-bottom:1.5em;">Conclusions and Recommendations</div>
    <div class="sub-section-header">5.1 Conclusions of the Diagnostic Audit</div>
    <p>
      The systematic academic-engineering energy audit executed across the workshops successfully isolated major, addressable channels of energy waste and reactive phase losses. Low efficiencies on idling lathe units were determined to be the primary root cause of the severely degraded laboratory power factor of <b>${result.totals.pf.toFixed(2)} lagging</b>.
    </p>
    <p>
      By implementing the three engineered Energy Conservation Measures (ECMs)—centralized capacitive PFC compensation, solid-state LED retrofits, and compressor speed modulation—the department can reduce annual consumption by <b>${Math.round(result.overall.kwhSaved).toLocaleString()} kWh</b>. This delivers secure annual energy savings of <b>NGN ${Math.round(result.overall.savingsNGN).toLocaleString()}</b>, with an attractive simple payback of <b>${result.overall.payback.toFixed(2)} years</b>.
    </p>
    <div class="sub-section-header">5.2 Technical Recommendations for Implementation</div>
    <p class="p-no-indent" style="margin-left: 0.4in; line-height: 1.8;">
      1. <b>Capacitor Banks:</b> Install a centralized automatic reactive power control compensation bank rated at <b>${result.pfc.kvarRequired.toFixed(1)} kVAR</b> directly adjacent to the second sub-distribution board.<br>
      2. <b>SS LED tubes:</b> Complete the lighting retrofits of the 45 obsolete fluorescent fittings and 10 high-bay spotlights with solid-state tubes.<br>
      3. <b>Compressor VFD:</b> Equip the 7.5kW compressor motor with a modulating 15HP VFD controller to regulate air pressure speed limits.
    </p>
    <div class="sub-section-header">5.3 Departmental Administration Code of Practice</div>
    <p class="p-no-indent" style="margin-left: 0.4in; line-height: 1.8;">
      1. Establish strict <b>"No-Idle"</b> rules, mandating lathe drive shut-down during student manual setups exceeding 5 minutes.<br>
      2. Implement bi-weekly pneumatic piping pressure-drop checks to isolate compressed air leaks early.<br>
      3. Incorporate these dynamic hourly logging databases into undergraduate lab experiments to foster training.
    </p>
  `, "Chapter Five - Conclusions & Recommendations"));

  // ======================== REFERENCES (Page 21) ========================
  
  // Page 21: References Combined
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.4in;">References</div>
    <p class="p-no-indent" style="margin-bottom:1.5em; text-indent: -0.5in; padding-left: 0.5in; line-height: 1.8;">
      Akinyemi, S. O. (2021). <i>Power quality diagnostics and power factor optimization within heavy machinery maintenance shops in South-Western Nigeria</i>. Journal of Nigerian Engineering Research, 14(2), 112–120.
    </p>
    <p class="p-no-indent" style="margin-bottom:1.5em; text-indent: -0.5in; padding-left: 0.5in; line-height: 1.8;">
      ASHRAE. (2021). <i>Procedures for Commercial Building Energy Audits</i> (3rd ed.). Atlanta, GA: American Society of Heating, Refrigerating and Air-Conditioning Agencies.
    </p>
    <p class="p-no-indent" style="margin-bottom:1.5em; text-indent: -0.5in; padding-left: 0.5in; line-height: 1.8;">
      Eseosa, I. G. (2024). <i>Energy savings through Variable Frequency Drive (VFD) controls on fluctuating lab air compressors</i>. West African Journal of Applied Energy, 18(1), 54–62.
    </p>
    <p class="p-no-indent" style="margin-bottom:1.5em; text-indent: -0.5in; padding-left: 0.5in; line-height: 1.8;">
      Ighodaro, R. A., & Osifo, E. O. (2022). <i>Lighting and auxiliary services energy auditing in tertiary institution academic workshops of South-South Nigeria</i>. International Journal of Energy Economics and Management, 9(4), 88–95.
    </p>
    <p class="p-no-indent" style="margin-bottom:1.5em; text-indent: -0.5in; padding-left: 0.5in; line-height: 1.8;">
      ISO 50001 (2018). <i>Energy Management Systems — Requirements with guidance for use</i>. Geneva: International Organization for Standardization.
    </p>
    <p class="p-no-indent" style="margin-bottom:1.5em; text-indent: -0.5in; padding-left: 0.5in; line-height: 1.8;">
      Uzamere, F. U., Okeke, J. I., & Bello, A. T. (2018). <i>The operational cost allocation and levelized LCOE analyses of educational campuses diesel generators versus national grids</i>. UNIBEN Journal of Engineering Studies, 22(1), 14–23.
    </p>
  `, "References"));

  // ======================== GLOSSARY (Page 22) ========================
  
  // Page 22: Glossary Combined
  pages.push(wrapPage(`
    <div class="chapter-heading" style="margin-top:0.4in;">Glossary of Terms</div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; font-size:10pt; line-height:1.8;">
      <div>
        <b>Active Power (kW):</b> The real component of mechanical or thermal output power doing actual physical shaft rotation work.<br><br>
        <b>Apparent Power (kVA):</b> The vector total power drawn from lines, combining both core active power and inductive components.<br><br>
        <b>ASHRAE Audit:</b> Diagnostic levels mapping systematic civil buildings energy consumption baselines.<br><br>
        <b>BEDC Grid Tariff:</b> Cost reflective billing tier assigned to consumer classes.
      </div>
      <div>
        <b>Capacitor Bank Correction:</b> Integrating leading capacitance steps to cancel lagging reactive draw forces.<br><br>
        <b>Harmonic Distortion (THD):</b> Sinusoidal waveform distortions from non-linear elements.<br><br>
        <b>Power Factor:</b> The cosine of phase angle shifts between voltage cycles and total grid amperes.<br><br>
        <b>Simple Payback Period:</b> Capital expenditure split by annual Saved utility operational bills.
      </div>
    </div>
  `, "Glossary"));

  // ======================== STANDALONE TABLES (Pages 23 to 29 - 7 Pages) ========================
  
  // Table Page 1: Table 1.1 & Table 2.1
  pages.push(wrapPage(`
    <div class="table-container" style="margin-bottom: 25px;">
      <h4 id="table1" style="margin:5px 0;">Table 1.1: Historical Faculty Grid Stability and Outage Records</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Month Year</th><th>Grid Reliability (%)</th><th>Total Outages (Events)</th><th>Total Interrupted Hours</th><th>Standby Gen-set Runtime (hrs)</th></tr>
        </thead>
        <tbody>
          <tr><td>January 2026</td><td>68.5%</td><td>45</td><td>125</td><td>110</td></tr>
          <tr><td>February 2026</td><td>71.2%</td><td>38</td><td>105</td><td>92</td></tr>
          <tr><td>March 2026</td><td>64.0%</td><td>52</td><td>148</td><td>135</td></tr>
          <tr><td>April 2026</td><td>59.5%</td><td>61</td><td>168</td><td>154</td></tr>
          <tr style="font-weight:bold;"><td>Active Baseline Mean</td><td>65.8%</td><td>49</td><td>136</td><td>123</td></tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-container">
      <h4 id="table2" style="margin:5px 0;">Table 2.1: Recommended Academic Illuminance Standards vs Actual Measured Levels</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Laboratory Subsection</th><th>Standard Illuminance</th><th>Actual Lux Mean</th><th>Status / Compliance</th><th>Recommended Upgrade Action</th></tr>
        </thead>
        <tbody>
          <tr><td>Heavy Machining Shop</td><td>500 Lux</td><td>210 Lux</td><td>Severe Under-illumination</td><td>Retrofit LED Diffused battens</td></tr>
          <tr><td>Thermo-Fluids Station</td><td>300 Lux</td><td>145 Lux</td><td>Deficient</td><td>Direct 18W Tubes installation</td></tr>
          <tr><td>Metallurgy Darkroom</td><td>150 Lux</td><td>115 Lux</td><td>Partially Compliant</td><td>No change required</td></tr>
          <tr><td>Departmental Offices</td><td>400 Lux</td><td>250 Lux</td><td>Deficient</td><td>Fluorescent magnetic ballast replacement</td></tr>
        </tbody>
      </table>
    </div>
  `, "Schedules: Tables 1.1 & 2.1"));

  // Table Page 2: Table 2.2 & Table 2.3
  pages.push(wrapPage(`
    <div class="table-container" style="margin-bottom: 25px;">
      <h4 id="table3" style="margin:5px 0;">Table 2.2: Legacy Induction Motor Performance and Power Factor Degradation Curve</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Motor Rating Category</th><th>Operating Load Factor (%)</th><th>Standard Target cos(&theta;)</th><th>Average Measured PF</th><th>Loss Surcharge (%)</th></tr>
        </thead>
        <tbody>
          <tr><td>15 kW (Heavy Duty)</td><td>100.0% Full Load</td><td>0.86</td><td>0.84</td><td>0.8%</td></tr>
          <tr><td>15 kW (Heavy Duty)</td><td>50.0% Partial Load</td><td>0.86</td><td>0.72</td><td>5.1%</td></tr>
          <tr><td>5.5 kW (Colchester Lathe)</td><td>40.0% Load</td><td>0.82</td><td>0.68</td><td>7.2%</td></tr>
          <tr><td>1.5 kW (Pumping rigs)</td><td>25.0% Under-load</td><td>0.78</td><td>0.54</td><td>14.8%</td></tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-container">
      <h4 id="table4" style="margin:5px 0;">Table 2.3: Comparison Matrix of Prior Educational and Academic Lab Audits</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Literature Focus</th><th>Academic Institution</th><th>SEU Focus</th><th>Anomalies</th><th>Achieved Cost Savings (%)</th></tr>
        </thead>
        <tbody>
          <tr><td>Ighodaro & Osifo (2022)</td><td>University of Ibadan</td><td>Workshop Lights</td><td>Unmodulated idling runs</td><td>31.5% Savings</td></tr>
          <tr><td>Akinyemi (2021)</td><td>FUTA (Akure)</td><td>Heavy Machining</td><td>Lagging Power Factor sags</td><td>18.0% Line loss savings</td></tr>
          <tr><td>Uzamere et al. (2018)</td><td>Private Poly, Benin</td><td>Generator Diesel</td><td>Fuel mismatch & overheads</td><td>35.0% Fuel savings</td></tr>
          <tr style="font-weight:bold;"><td>Current Study</td><td>${student.university || "University of Benin"}</td><td>Lathes, Comp, Lights</td><td>Low PF penalty draws</td><td><b>${((result.overall.savingsNGN / result.totals.costNGN) * 100).toFixed(1)}% Projected</b></td></tr>
        </tbody>
      </table>
    </div>
  `, "Schedules: Tables 2.2 & 2.3"));

  // Table Page 3: Table 3.1 & Table 3.2
  pages.push(wrapPage(`
    <div class="table-container" style="margin-bottom: 25px;">
      <h4 id="table5" style="margin:5px 0;">Table 3.1: Spatial Layout and Civil Geometries of Laboratory Areas</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Laboratory Bay ID</th><th>Physical Area (sq m)</th><th>Reflectance Factor</th><th>Total Window Space</th><th>Average Thermal Gain</th></tr>
        </thead>
        <tbody>
          <tr><td>Machine Shop B1</td><td>450.0</td><td>0.45</td><td>42.5 sq m</td><td>12.5 kW</td></tr>
          <tr><td>Thermo-Fluids Room B2</td><td>320.0</td><td>0.50</td><td>28.5 sq m</td><td>8.8 kW</td></tr>
          <tr><td>Metallurgy Section B3</td><td>200.0</td><td>0.38</td><td>10.0 sq m</td><td>15.4 kW (Furnace)</td></tr>
          <tr><td>Welding / Fab Bay B4</td><td>280.0</td><td>0.30</td><td>55.0 sq m</td><td>4.5 kW</td></tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-container">
      <h4 id="table6" style="margin:5px 0;">Table 3.2: Technical Calibration Specifications for Measuring Instruments</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Instrumentation Tool Name</th><th>Core Model No</th><th>Calibration Range</th><th>Accuracy Tolerance</th><th>Calibration Date</th></tr>
        </thead>
        <tbody>
          <tr><td>Digital Phase Clamp Meter</td><td>Fluke 376 FC</td><td>1000A AC / 1000V DC</td><td>&plusmn;2% True RMS</td><td>October 2025</td></tr>
          <tr><td>Power Quality Analyzer</td><td>Fluke 435 Series II</td><td>Full Harmonic logging</td><td>&plusmn;0.1% voltage base</td><td>November 2025</td></tr>
          <tr><td>Digital Lux Photometer</td><td>UNI-T UT383</td><td>0 to 199,900 Lux</td><td>&plusmn;4% reading rate</td><td>September 2025</td></tr>
          <tr><td>Laser Digital Tachometer</td><td>HoldPeak 2234C</td><td>2.5 to 99,999 RPM</td><td>&plusmn;0.05% speed tolerance</td><td>August 2025</td></tr>
        </tbody>
      </table>
    </div>
  `, "Schedules: Tables 3.1 & 3.2"));

  // Table Page 4: Table 4.1 & Table 4.2
  pages.push(wrapPage(`
    <div class="table-container" style="margin-bottom: 20px;">
      <h4 id="table7" style="margin:2px 0;">Table 4.1: Technical Inventory Log of Active Lab Machines and Fixtures</h4>
      <table style="font-size: 8pt; margin: 4px 0;">
        <thead>
          <tr><th>ID</th><th>Equipment Description Name</th><th>Category</th><th>Qty</th><th>Power (kW)</th><th>Voltage (V)</th><th>Baseline PF</th><th>Hrs/Day</th></tr>
        </thead>
        <tbody>
          ${result.equipmentDetails.slice(0, 10).map((eq) => `
            <tr>
              <td>${eq.id}</td>
              <td style="font-weight:600;">${eq.name}</td>
              <td>${eq.category}</td>
              <td>${eq.quantity}</td>
              <td>${eq.powerRatingKW.toFixed(2)}</td>
              <td>${eq.category === "heavy_machinery" || eq.name.includes("Compressor") ? 415 : 230}</td>
              <td>${eq.powerFactor.toFixed(2)}</td>
              <td>${eq.hoursPerDay}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    
    <div class="table-container">
      <h4 id="table8" style="margin:2px 0;">Table 4.2: Computed Reactive Power and Apparent Demand Log</h4>
      <table style="font-size: 8pt; margin: 4px 0;">
        <thead>
          <tr><th>Equipment Name</th><th>Active Load (kW)</th><th>Apparent Load (kVA)</th><th>Reactive component</th><th>Efficiency</th></tr>
        </thead>
        <tbody>
          ${result.equipmentDetails.slice(0, 5).map((eq) => `
            <tr>
              <td>${eq.name}</td>
              <td>${eq.totalPowerKW.toFixed(2)} kW</td>
              <td>${eq.apparentPowerKVA.toFixed(2)} kVA</td>
              <td>${eq.reactivePowerKVAR.toFixed(2)} kVAR</td>
              <td>${(eq.efficiency * 100).toFixed(0)}%</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `, "Schedules: Tables 4.1 & 4.2"));

  // Table Page 5: Table 4.3 & Table 4.4
  pages.push(wrapPage(`
    <div class="table-container" style="margin-bottom: 25px;">
      <h4 id="table9" style="margin:5px 0;">Table 4.3: Sectoral Energy Consumption and Financial Expenditure Distribution</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Asset Category Sector</th><th>Connected Power (kW)</th><th>Apparent Power (kVA)</th><th>Annual (kWh)</th><th>Annual Expense (NGN)</th></tr>
        </thead>
        <tbody>
          ${Object.entries(result.categories).map(([k, val]) => `
            <tr>
              <td style="text-transform: capitalize; font-weight:600;">${k.replace("_", " ")}</td>
              <td>${val.kw.toFixed(2)} kW</td>
              <td>${val.kva.toFixed(2)} kVA</td>
              <td>${Math.round(val.kwh).toLocaleString()}</td>
              <td>NGN ${Math.round(val.cost).toLocaleString()}</td>
            </tr>
          `).join("")}
          <tr style="font-weight: bold; border-top: 2px solid #000; background:#f1f5f9;">
            <td>GRAND TOTALS</td>
            <td>${result.totals.kw.toFixed(2)} kW</td>
            <td>${result.totals.kva.toFixed(2)} kVA</td>
            <td>${Math.round(result.totals.kwh).toLocaleString()}</td>
            <td>NGN ${Math.round(result.totals.costNGN).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-container">
      <h4 id="table10" style="margin:5px 0;">Table 4.4: Daily Diurnal Electric Load Distribution Sequence</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Active Timeframe</th><th>Expected Active Machines</th><th>Active Load (kW)</th><th>Power Factor</th><th>Risk</th></tr>
        </thead>
        <tbody>
          <tr><td>08:00 - 10:00 (Pre-Workshop)</td><td>Auxiliary rigs, lights</td><td>${(result.totals.kw * 0.25).toFixed(1)} kW</td><td>${(result.totals.pf).toFixed(2)}</td><td>Low</td></tr>
          <tr><td>10:00 - 12:00 (Practical Peak)</td><td>Lathes, welding bays, comp</td><td>${(result.totals.kw * 0.75).toFixed(1)} kW</td><td>${(result.totals.pf * 0.95).toFixed(2)}</td><td>Critical</td></tr>
          <tr><td>12:00 - 13:00 (Lunch interval)</td><td>Lighting, laptop setups</td><td>${(result.totals.kw * 0.15).toFixed(1)} kW</td><td>0.70</td><td>Medium</td></tr>
          <tr><td>13:00 - 16:00 (Afternoon labs)</td><td>Drills, HVAC compressor</td><td>${(result.totals.kw * 0.65).toFixed(1)} kW</td><td>${(result.totals.pf).toFixed(2)}</td><td>High</td></tr>
        </tbody>
      </table>
    </div>
  `, "Schedules: Tables 4.3 & 4.4"));

  // Table Page 6: Table 4.5 & Table 4.6
  pages.push(wrapPage(`
    <div class="table-container" style="margin-bottom: 25px;">
      <h4 id="table11" style="margin:5px 0;">Table 4.5: Utility Billing Model (BEDC Band A Structure)</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Charge Component</th><th>Base Rate</th><th>Monthly Volume</th><th>Computed monthly (NGN)</th></tr>
        </thead>
        <tbody>
          <tr><td>Active Energy</td><td>NGN ${params.tariffRate.toFixed(2)} / kWh</td><td>${Math.round(result.totals.kwh / 12).toLocaleString()} kWh</td><td>NGN ${Math.round((result.totals.kwh / 12) * params.tariffRate).toLocaleString()}</td></tr>
          <tr><td>Demand Charge</td><td>NGN 2,150.00 / kVA</td><td>${result.totals.peakKVA.toFixed(1)} kVA peak</td><td>NGN ${Math.round(result.totals.peakKVA * 2150).toLocaleString()}</td></tr>
          <tr><td>Low PF Surcharge</td><td>Penalty PF &lt; 0.85</td><td>Weighted PF: ${result.totals.pf.toFixed(2)}</td><td>NGN ${result.totals.pf < 0.85 ? "85,400.00" : "0.00"}</td></tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-container">
      <h4 id="table12" style="margin:5px 0;">Table 4.6: Diagnostic Matrix of System Inefficiencies and Corrective ECMs</h4>
      <table style="font-size: 8.5pt; margin: 5px 0;">
        <thead>
          <tr><th>Isolated Energy Mal-performance</th><th>System Impact</th><th>Severity</th><th>Corrective ECM Solution</th></tr>
        </thead>
        <tbody>
          <tr><td>Idling lathe shafts turning unloaded</td><td>Thermal active waste</td><td>High</td><td>Strict manual shut-off procedures</td></tr>
          <tr><td>Low power factor (${result.totals.pf.toFixed(2)})</td><td>Core thermal saturation</td><td>Critical</td><td>Centralized PFC Capacitor installation</td></tr>
          <tr><td>Fluorescent magnetic fittings</td><td>Low lumens per watt ratio</td><td>Medium</td><td>18W solid-state T8 LED replacement</td></tr>
          <tr><td>Unmodulated air compressor startup</td><td>Intense voltage peaks sags</td><td>High</td><td>VFD electronic speed control setup</td></tr>
        </tbody>
      </table>
    </div>
  `, "Schedules: Tables 4.5 & 4.6"));

  // Table Page 7: Table 4.7, Table 4.8 & Table 4.9
  pages.push(wrapPage(`
    <div class="table-container" style="margin-bottom: 20px;">
      <h4 id="table13" style="margin:2px 0;">Table 4.7: Financial Engineering Estimation for ECM 1: PFC Capacitor Banks</h4>
      <table style="font-size: 8pt; margin: 4px 0;">
        <thead>
          <tr><th>Design Parameters</th><th>Assigned Value</th><th>Budget Component</th><th>Computed Expense</th></tr>
        </thead>
        <tbody>
          <tr><td>Original PF (cos &theta;<sub>1</sub>)</td><td>${result.totals.pf.toFixed(2)} lagging</td><td>Required Leading Bank</td><td>${result.pfc.kvarRequired.toFixed(2)} kVAR</td></tr>
          <tr><td>Corrected PF (cos &theta;<sub>2</sub>)</td><td>${params.powerFactorCorrectionTarget.toFixed(2)} lagging</td><td>PFC Bank Outlay Expense</td><td>NGN ${Math.round(result.pfc.investment).toLocaleString()}</td></tr>
          <tr><td>PFC Annual Saved Utilities</td><td>${result.pfc.kwhSaved.toFixed(0)} kWh</td><td>Annual Financial Savings</td><td>NGN ${Math.round(result.pfc.savings).toLocaleString()}</td></tr>
          <tr style="font-weight:bold; background:#e2e8f0;"><td colspan="2">SIMPLE PAYBACK OVERVIEW</td><td>PFC Payback period</td><td>${result.pfc.payback.toFixed(2)} Years</td></tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-container" style="margin-bottom: 20px;">
      <h4 id="table14" style="margin:2px 0;">Table 4.8: Detailed Retrofit Ledger and Saved Capacity for ECM 2: LEDs</h4>
      <table style="font-size: 7.5pt; margin: 4px 0;">
        <thead>
          <tr><th>Replaced Lighting Item</th><th>Quantity Replaced</th><th>Legacy Rating</th><th>LED Upgrade Rating</th><th>Annual Saving</th></tr>
        </thead>
        <tbody>
          <tr><td>Fluorescent T8 fixtures</td><td>${result.led.fluorQty} Units</td><td>0.082 kW</td><td>${params.ledPowerRating} kW</td><td>NGN ${Math.round((0.082 - params.ledPowerRating) * result.led.fluorQty * (5 * 8 * 52) * params.tariffRate).toLocaleString()}</td></tr>
          <tr><td>High Bay spotlights</td><td>${result.led.incanQty} Units</td><td>0.200 kW</td><td>${params.ledPowerRating} kW</td><td>NGN ${Math.round((0.200 - params.ledPowerRating) * result.led.incanQty * (5 * 10 * 52) * params.tariffRate).toLocaleString()}</td></tr>
          <tr style="font-weight: bold; background:#f1f5f9;">
            <td>RETROFIT TOTAL TOTAL</td>
            <td>${result.led.fluorQty + result.led.incanQty} Units</td>
            <td>Saved Load:</td>
            <td>${((0.082 - params.ledPowerRating) * result.led.fluorQty + (0.200 - params.ledPowerRating) * result.led.incanQty).toFixed(2)} kW</td>
            <td style="color:#1e3a8a;">NGN ${Math.round(result.led.savings).toLocaleString()} / yr</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-container">
      <h4 id="table15" style="margin:2px 0;">Table 4.9: Consolidated Economic and Environmental Performance Ledger</h4>
      <table style="font-size: 7.5pt; margin: 4px 0;">
        <thead>
          <tr><th>Implemented Option</th><th>Capital Cost (NGN)</th><th>Saved kWh/Annum</th><th>Saved NGN/yr</th><th>Avoided CO<sub>2</sub> (kg)</th></tr>
        </thead>
        <tbody>
          <tr><td>ECM 1: Capacitor PFC</td><td>NGN ${Math.round(result.pfc.investment).toLocaleString()}</td><td>${Math.round(result.pfc.kwhSaved).toLocaleString()}</td><td>NGN ${Math.round(result.pfc.savings).toLocaleString()}</td><td>${Math.round(result.pfc.kwhSaved * 0.45).toLocaleString()} kg</td></tr>
          <tr><td>ECM 2: SS LED Retrofit</td><td>NGN ${Math.round(result.led.investment).toLocaleString()}</td><td>${Math.round(result.led.kwhSaved).toLocaleString()}</td><td>NGN ${Math.round(result.led.savings).toLocaleString()}</td><td>${Math.round(result.led.kwhSaved * 0.45).toLocaleString()} kg</td></tr>
          <tr><td>ECM 3: VFD Compressor</td><td>NGN ${Math.round(result.vfd.investment).toLocaleString()}</td><td>${Math.round(result.vfd.kwhSaved).toLocaleString()}</td><td>NGN ${Math.round(result.vfd.savings).toLocaleString()}</td><td>${Math.round(result.vfd.kwhSaved * 0.45).toLocaleString()} kg</td></tr>
          <tr style="font-weight: bold; background: #f1f5f9;">
            <td>CONSOLIDATED TOTAL</td>
            <td>NGN ${Math.round(result.overall.investment).toLocaleString()}</td>
            <td>${Math.round(result.overall.kwhSaved).toLocaleString()} kWh</td>
            <td>NGN ${Math.round(result.overall.savingsNGN).toLocaleString()}</td>
            <td style="color:#16a34a;">${result.overall.payback.toFixed(2)} Yrs payback</td>
          </tr>
        </tbody>
      </table>
    </div>
  `, "Schedules: Tables 4.7, 4.8 & 4.9"));

  // ======================== APPENDICES: FIELD CHECKLISTS & LIMITS (Page 30) ========================
  
  // Page 30: Appendix A & Appendix B combined on a single sheet
  pages.push(wrapPage(`
    <div style="margin-bottom: 25px;">
      <div class="chapter-heading">Appendix A</div>
      <div class="sub-section-header" style="margin-top:5px;">Appendix A: Laboratory Energy walk-through Checklist Form</div>
      <p class="p-no-indent" style="font-size:9.5pt; line-height: 1.8; margin-top:5px;">
        [ &bull; ] check machine idle status: lathe shafts left running when not actively cutting?<br>
        [ &bull; ] check compressed-air network leakages: any audible hissing sounds adjacent to regulators?<br>
        [ &bull; ] ambient lighting: any lights left burning when external window lux matches standard thresholds?<br>
        [ &bull; ] HVAC locks: are classroom doors left open while split air conditioners are operating?<br>
        [ &bull; ] Meter checks: record secondary distribution feed phase balances during workshop peaks.
      </p>
      <div style="text-align:right; font-size:9.5pt; font-style:italic; margin-top:5px;">
        Form Standard Code: UNIBEN-ME-EAF-2026
      </div>
    </div>
    
    <div>
      <div class="chapter-heading">Appendix B</div>
      <div class="sub-section-header" style="margin-top:5px;">Appendix B: Technical Performance Limits of Core Legacy Inductions</div>
      <p class="p-no-indent" style="font-size:9.5pt; line-height:1.8; margin-top:5px;">
        1. <b>Colchester Student Lathe 1800 Induction Rotor:</b> Stator 3-Phase delta alignments, Class F temperature limits, locked rotor current threshold limits set to 6.5x rated Fla.<br>
        2. <b>Bridgeport Milling Machine Spindle Motor:</b> Internal multi-pole windings, stator coil insulation temperature thresholds 105 &deg;C, thermal overload breaker limits 15.4 Amps.<br>
        3. <b>Quincy Reciprocating Compressor Core:</b> Interlocking dual-cylinder reciprocating build, automatic pressure cut-out limits 8.5 bar, cut-in limits 6.0 bar.
      </p>
    </div>
  `, "Appendix A & B Checklist"));

  // ======================== APPENDIX C: WEEKLY DIURNAL SCHEDULES (Pages 31 to 34 - 4 Pages) ========================
  
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayScales = [1.0, 0.95, 1.05, 0.98, 0.9, 0.20, 0.10];

  const renderDayScheduleTableContent = (day: string, scale: number, dIdx: number) => {
    return `
      <div style="margin-bottom: 12px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
        <div class="sub-section-header" style="font-size:9.5pt; margin: 4px 0;">Appendix C.${dIdx + 1} - 24-Hour Diurnal Load Profile Log: ${day}</div>
        <p class="p-no-indent" style="font-size:8.5pt; margin-bottom:4px; line-height:1.3;">
          Feeder lines measurements logged on ${day}.
        </p>
        <table style="font-size: 7pt; margin: 4px 0; width:100%; border-collapse:collapse; border: 1px solid #111;">
          <thead>
            <tr style="background:#f2f2f2;">
              <th style="padding:2px;">Hour</th>
              <th style="padding:2px;">Baseline kW</th>
              <th style="padding:2px;">Comp kVA</th>
              <th style="padding:2px;">Baseline PF</th>
              <th style="padding:2px;">Amps (A)</th>
              <th style="padding:2px;">Reactive kVAR</th>
              <th style="padding:2px;">Feeder Status</th>
            </tr>
          </thead>
          <tbody>
            ${[0, 4, 8, 10, 12, 14, 18, 22].map((hour) => {
              let factor = 0.12;
              let pf = 0.72;
              let status = "Standby / Off";
              
              if (hour >= 8 && hour < 10) { factor = 0.35; status = "Pre-setup calibration"; }
              else if (hour >= 10 && hour < 12) { factor = 0.88; pf = result.totals.pf; status = "Peak practical class"; }
              else if (hour >= 12 && hour < 13) { factor = 0.20; status = "Lunch break window"; }
              else if (hour >= 13 && hour < 16) { factor = 0.72; pf = result.totals.pf; status = "Afternoon workshop run"; }
              else if (hour >= 16 && hour < 18) { factor = 0.30; status = "Post-clean routine"; }

              const kwVal = result.totals.kw * factor * scale;
              const kvaComp = kwVal / 0.95;
              const ampsComp = (kvaComp * 1000) / (1.732 * 415);
              const kvarVal = kwVal * Math.tan(Math.acos(pf));

              return `
                <tr>
                  <td style="padding:2px; font-weight:bold;">${hour.toString().padStart(2, "0")}:00</td>
                  <td style="padding:2px;">${kwVal.toFixed(1)} kW</td>
                  <td style="padding:2px;">${kvaComp.toFixed(1)} kVA</td>
                  <td style="padding:2px;">${pf.toFixed(2)} lag</td>
                  <td style="padding:2px;">${ampsComp.toFixed(1)} A</td>
                  <td style="padding:2px;">${kvarVal.toFixed(1)}</td>
                  <td style="padding:2px; font-style:italic;">${status}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  };

  // 4 Pages for daily schedules
  // Mon & Tue
  pages.push(wrapPage(`
    <div class="chapter-title" style="font-size:12pt; font-weight:bold; text-align:center; margin-bottom:5px;">Appendix C</div>
    <div class="chapter-heading" style="font-size:11pt; font-weight:normal; text-transform:none; margin-bottom:10px;">Weekly Diurnal Schedules (Mon - Tue)</div>
    ${renderDayScheduleTableContent(weekDays[0], dayScales[0], 0)}
    ${renderDayScheduleTableContent(weekDays[1], dayScales[1], 1)}
  `, "Appendix C Daily Profiles (Mon/Tue)"));

  // Wed & Thu
  pages.push(wrapPage(`
    <div class="chapter-title" style="font-size:12pt; font-weight:bold; text-align:center; margin-bottom:5px;">Appendix C</div>
    <div class="chapter-heading" style="font-size:11pt; font-weight:normal; text-transform:none; margin-bottom:10px;">Weekly Diurnal Schedules (Wed - Thu)</div>
    ${renderDayScheduleTableContent(weekDays[2], dayScales[2], 2)}
    ${renderDayScheduleTableContent(weekDays[3], dayScales[3], 3)}
  `, "Appendix C Daily Profiles (Wed/Thu)"));

  // Fri & Sat
  pages.push(wrapPage(`
    <div class="chapter-title" style="font-size:12pt; font-weight:bold; text-align:center; margin-bottom:5px;">Appendix C</div>
    <div class="chapter-heading" style="font-size:11pt; font-weight:normal; text-transform:none; margin-bottom:10px;">Weekly Diurnal Schedules (Fri - Sat)</div>
    ${renderDayScheduleTableContent(weekDays[4], dayScales[4], 4)}
    ${renderDayScheduleTableContent(weekDays[5], dayScales[5], 5)}
  `, "Appendix C Daily Profiles (Fri/Sat)"));

  // Sun
  pages.push(wrapPage(`
    <div class="chapter-title" style="font-size:12pt; font-weight:bold; text-align:center; margin-bottom:5px;">Appendix C</div>
    <div class="chapter-heading" style="font-size:11pt; font-weight:normal; text-transform:none; margin-bottom:10px;">Weekly Diurnal Schedules (Sun)</div>
    ${renderDayScheduleTableContent(weekDays[6], dayScales[6], 6)}
  `, "Appendix C Daily Profiles (Sun)"));

  // ======================== APPENDIX D: EQUIPMENT LOGGING & CHECKLISTS (Pages 35 to 39 - 5 Pages) ========================
  // 15 equipments grouped 3 per page (giving exactly 5 pages)
  
  const diagnosticAssets = [
    { name: "Colchester Lathe Machine L1", power: 5.5, pf: 0.68, category: "heavy_machinery" },
    { name: "Colchester Lathe Machine L2", power: 5.5, pf: 0.68, category: "heavy_machinery" },
    { name: "Harrison Lathe Machine L3", power: 4.0, pf: 0.70, category: "heavy_machinery" },
    { name: "Heavy Duty Indexing Shaper S1", power: 7.5, pf: 0.65, category: "heavy_machinery" },
    { name: "Bridgeport Vertical Milling M1", power: 3.7, pf: 0.72, category: "heavy_machinery" },
    { name: "Cincinnati Horizontal Milling M2", power: 5.5, pf: 0.70, category: "heavy_machinery" },
    { name: "Universal Shaping Machine Shaper S2", power: 3.7, pf: 0.72, category: "heavy_machinery" },
    { name: "Radial Arm Drilling Machine D1", power: 2.2, pf: 0.75, category: "heavy_machinery" },
    { name: "Double Pedestal Grinding Rig G1", power: 1.5, pf: 0.78, category: "heavy_machinery" },
    { name: "Quincy Reciprocating Air Compressor C1", power: 7.5, pf: 0.72, category: "heavy_machinery" },
    { name: "Electric Arc Welding Station W1", power: 12.0, pf: 0.60, category: "heavy_machinery" },
    { name: "Weldcraft Heavy Duty Spot Welder W2", power: 15.0, pf: 0.58, category: "heavy_machinery" },
    { name: "Metallurgy Electric Muffle Furnace F1", power: 12.0, pf: 1.0, category: "auxiliary" },
    { name: "Departmental Ventilation HVAC Condenser A1", power: 4.5, pf: 0.82, category: "hvac" },
    { name: "Primary Fluid Pumping Rig Pump P1", power: 2.2, pf: 0.74, category: "heavy_machinery" }
  ];

  const renderAssetLogContent = (asset: typeof diagnosticAssets[0], aIdx: number) => {
    const startAmps = ((asset.power * 1000) / (asset.category === "heavy_machinery" || asset.name.includes("Compressor") ? 1.732 * 415 * asset.pf : 230 * asset.pf) * 6.5).toFixed(1);
    const harmonics = (4.2 + (aIdx % 3) * 1.5).toFixed(1);

    return `
      <div style="margin-bottom: 12px; border-bottom: 1px dashed #bbb; padding-bottom: 8px;">
        <div class="sub-section-header" style="font-size:9pt; margin:4px 0;">Appendix D.${aIdx + 1} - Equipment Diagnostic Log Sheet: ${asset.name}</div>
        
        <div style="background:#fafafa; border:1px solid #ccc; padding:6px; font-size:8pt; border-radius:4px; margin-bottom:6px;">
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px;">
            <div><b>Capacity:</b> ${asset.power.toFixed(1)} kW</div>
            <div><b>Voltage:</b> ${asset.category === "heavy_machinery" ? "415V" : "230V"}</div>
            <div><b>PF:</b> ${asset.pf.toFixed(2)}</div>
            <div><b>Start Amps:</b> ${startAmps} A</div>
            <div><b>THDi:</b> ${harmonics}%</div>
            <div><b>Coil Limit:</b> 65 &deg;C</div>
          </div>
        </div>

        <table style="font-size:7pt; width:100%; border-collapse:collapse; border:1px solid #111; margin:4px 0;">
          <thead>
            <tr style="background:#eed;">
              <th style="padding:2px;">Testing Window</th>
              <th style="padding:2px;">Stator Volts</th>
              <th style="padding:2px;">Amps (A)</th>
              <th style="padding:2px;">Active kW</th>
              <th style="padding:2px;">Apparent kVA</th>
              <th style="padding:2px;">Temp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10:00 - 10:15</td>
              <td>${asset.category === "heavy_machinery" ? 408 : 224} V</td>
              <td>${((asset.power * 1000 * 0.4) / (asset.category === "heavy_machinery" ? 1.732 * 415 : 230)).toFixed(1)} A</td>
              <td>${(asset.power * 0.3).toFixed(2)}</td>
              <td>${(asset.power * 0.3 / (asset.pf * 0.8)).toFixed(2)}</td>
              <td>35 &deg;C</td>
            </tr>
            <tr>
              <td>10:15 - 11:00</td>
              <td>${asset.category === "heavy_machinery" ? 405 : 221} V</td>
              <td>${((asset.power * 1000) / (asset.category === "heavy_machinery" ? 1.732 * 415 * asset.pf : 230 * asset.pf)).toFixed(1)} A</td>
              <td>${asset.power.toFixed(1)}</td>
              <td>${(asset.power / asset.pf).toFixed(1)}</td>
              <td>58 &deg;C</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  };

  // 5 Pages (Logs 1-3, 4-6, 7-9, 10-12, 13-15)
  for (let pageIdx = 0; pageIdx < 5; pageIdx++) {
    const startIdx = pageIdx * 3;
    pages.push(wrapPage(`
      <div class="chapter-title" style="font-size:12pt; font-weight:bold; text-align:center; margin-bottom:5px;">Appendix D</div>
      <div class="chapter-heading" style="font-size:11pt; font-weight:normal; text-transform:none; margin-bottom:10px;">Equipment Diagnostics Log Sheets (${startIdx + 1} - ${startIdx + 3} of 15)</div>
      ${renderAssetLogContent(diagnosticAssets[startIdx], startIdx)}
      ${renderAssetLogContent(diagnosticAssets[startIdx + 1], startIdx + 1)}
      ${renderAssetLogContent(diagnosticAssets[startIdx + 2], startIdx + 2)}
    `, `Appendix D Equipment Logs (${startIdx + 1}-${startIdx + 3})`));
  }

  // Compile final clean HTML joining the beautifully condensed pages
  const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${student.university} - Department of Mechanical Engineering Thesis Project</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      background-color: #f1f5f9;
      margin: 0;
      padding: 0;
      color: #111;
      line-height: 1.5;
    }
    .document-page {
      box-sizing: border-box;
      max-width: 800px;
      margin: 40px auto;
      padding: 1.25in 1in 1in 1.25in;
      border: 1px solid #bbb;
      background: #ffffff;
      position: relative;
      min-height: 10.5in;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      page-break-after: always;
      break-inside: avoid;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 32pt;
      color: rgba(0, 0, 0, 0.015);
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      width: 100%;
      pointer-events: none;
      z-index: 0;
      ${showWatermark ? "" : "display: none !important;"}
    }
    @media print {
      body {
        margin: 0 !important;
        padding: 0 !important;
        background-color: #ffffff !important;
        height: auto !important;
        overflow: visible !important;
      }
      .document-page {
        margin: 0 !important;
        border: none !important;
        padding: 1.25in 0.8in 0.8in 1.1in !important;
        max-width: 100% !important;
        width: 100% !important;
        min-height: 0 !important;
        box-shadow: none !important;
        page-break-after: always !important;
        break-inside: avoid !important;
        clear: both !important;
      }
      .watermark {
        color: rgba(0, 0, 0, 0.02) !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        ${showWatermark ? "" : "display: none !important;"}
      }
      .no-print {
        display: none !important;
      }
    }
    .chapter-heading {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14pt;
      margin-bottom: 0.5em;
    }
    .chapter-title {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14pt;
      margin-bottom: 1.5em;
    }
    .sub-section-header {
      font-weight: bold;
      font-size: 12pt;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    .cover {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 9.2in;
      box-sizing: border-box;
      padding: 0.5in 0;
    }
    .coll-head {
      font-size: 14pt;
      font-weight: bold;
      text-transform: uppercase;
      line-height: 1.4;
    }
    .submitted-by {
      font-size: 11pt;
      margin-bottom: 0.25in;
    }
    .student-matric {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 10.5pt;
    }
    table, th, td {
      border: 1px solid #111;
    }
    th, td {
      padding: 6px 10px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 9.5pt;
    }
    .sig-line {
      border-top: 1px solid #000;
      width: 250px;
      margin-top: 50px;
      text-align: center;
      font-size: 11pt;
    }
    .toc-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 10px;
      text-decoration: none;
      color: #000;
    }
    .toc-dots {
      flex-grow: 1;
      border-bottom: 1px dotted #000;
      margin: 0 10px;
    }
    .equation-card {
      background-color: #fafafa;
      border-left: 3px solid #334155;
      padding: 10px;
      margin: 15px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-weight: bold;
    }
    .print-header {
      text-align: right;
      font-size: 8.5pt;
      font-style: italic;
      color: #666;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
      margin-bottom: 20px;
    }
    p {
      text-align: justify;
      text-indent: 0.4in;
      margin-bottom: 1.25em;
      margin-top: 0;
      font-size: 11pt;
    }
    .p-no-indent {
      text-indent: 0 !important;
    }
    
    /* Screen guide styles */
    .screen-helper-bar {
      position: sticky;
      top: 0;
      background: #1e293b;
      color: #fff;
      padding: 15px;
      font-family: system-ui, -apple-system, sans-serif;
      z-index: 1000;
      border-bottom: 3px solid #10b981;
      box-shadow: 0 4px 10px rgba(0,0,0,0.25);
    }
    .print-btn {
      background: #10b981;
      color: #fff;
      border: none;
      padding: 8px 24px;
      font-size: 11pt;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .print-btn:hover {
      background: #059669;
    }
    .helper-tabs {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .tab-btn {
      background: #334155;
      color: #cbd5e1;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 9pt;
    }
    .tab-btn.active {
      background: #10b981;
      color: #fff;
    }
    .guideline-box {
      background: #0f172a;
      border: 1px solid #334155;
      padding: 12px;
      border-radius: 6px;
      margin-top: 10px;
      font-size: 9.5pt;
      line-height: 1.5;
    }
    .guideline-content {
      display: none;
    }
    .active-guide {
      display: block;
    }
  </style>
</head>
<body>

  <!-- Floating helper bar for screen viewing only -->
  <div class="screen-helper-bar no-print">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h3 style="margin:0; font-size:14pt; color:#10b981;">🎓 PDF Download Assistant</h3>
        <p class="p-no-indent" style="margin:0; font-size:9pt; color:#94a3b8;">This standalone thesis operates with highly condensed, academic-format printable pages.</p>
      </div>
      <button onclick="window.print()" class="print-btn">🖨️ PRINT / SAVE AS PDF</button>
    </div>
    
    <div class="helper-tabs">
      <button id="tab-btn-pc" class="tab-btn active" onclick="switchHelperTab('pc')">💻 Desktop / Chrome</button>
      <button id="tab-btn-android" class="tab-btn" onclick="switchHelperTab('android')">🤖 Android (Chrome)</button>
      <button id="tab-btn-ios" class="tab-btn" onclick="switchHelperTab('ios')">🍏 iOS (Safari)</button>
    </div>

    <div class="guideline-box">
      <div id="guide-pc" class="guideline-content active-guide">
        <strong>💻 DESKTOP COMPLIANCE:</strong> Click <b>PRINT</b> above. Set Destination to <b>Save as PDF</b>. Under More Settings, set Margins to <b>Default</b>, check <b>"Background graphics"</b> and uncheck <b>"Headers and footers"</b>. Click Save!
      </div>
      <div id="guide-android" class="guideline-content">
        <strong>🤖 ANDROID CHROMIUM METHOD:</strong> Tap <b>PRINT</b>. Set printer dropdown to <b>"Save as PDF"</b>. Tap the gear/options icon, make sure "Background graphics" is enabled, and tap Save!
      </div>
      <div id="guide-ios" class="guideline-content">
        <strong>🍏 IOS Pinch-Zoom Gesture:</strong> Tap <b>PRINT</b>. When the iOS printer dialogue loads showing page thumbnails, place two fingers on any thumbnail and <b>zoom/pinch out</b>. This translates the thesis into an un-clipped high-fidelity PDF! Save to Files.
      </div>
    </div>
  </div>

  <script class="no-print">
    function switchHelperTab(device) {
      document.getElementById('tab-btn-pc').classList.remove('active');
      document.getElementById('tab-btn-android').classList.remove('active');
      document.getElementById('tab-btn-ios').classList.remove('active');
      
      document.getElementById('guide-pc').classList.remove('active-guide');
      document.getElementById('guide-android').classList.remove('active-guide');
      document.getElementById('guide-ios').classList.remove('active-guide');
      
      if (device === 'pc') {
        document.getElementById('tab-btn-pc').classList.add('active');
        document.getElementById('guide-pc').classList.add('active-guide');
      } else if (device === 'android') {
        document.getElementById('tab-btn-android').classList.add('active');
        document.getElementById('guide-android').classList.add('active-guide');
      } else if (device === 'ios') {
        document.getElementById('tab-btn-ios').classList.add('active');
        document.getElementById('guide-ios').classList.add('active-guide');
      }
    }
  </script>

  <!-- THE PAGES -->
  ${pages.join("\n")}

</body>
</html>`;

  return finalHTML;
}
