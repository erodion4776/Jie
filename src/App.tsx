import { useState } from "react";
import { StudentInfo, Equipment, AuditParameters } from "./types";
import { Sidebar } from "./components/Sidebar";
import { AcademicDocument } from "./components/AcademicDocument";
import { 
  initialEquipmentList, 
  initialAuditParameters, 
  performAuditCalculations 
} from "./data/calculations";

export default function App() {
  const [student, setStudent] = useState<StudentInfo>({
    studentName: "OBAKPOLOR KINGSLEY OSAS",
    matricNumber: "ENG1802345",
    department: "Department of Mechanical Engineering",
    faculty: "Faculty of Engineering",
    university: "University of Benin",
    supervisorName: "Prof. O. S. OGBEMUDIA",
    headOfDepartment: "Dr. E. O. AKHERE",
    externalExaminer: "Prof. J. A. COKER (UI)",
    submissionYear: "2026",
    degreeType: "Bachelor of Engineering (B.Eng)"
  });

  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipmentList);
  const [params, setParams] = useState<AuditParameters>(initialAuditParameters);
  const [activeSection, setActiveSection] = useState<string>("ch1");
  const [showWatermark, setShowWatermark] = useState<boolean>(false);

  // Perform dynamic load and financial calculations based on state values
  const calculations = performAuditCalculations(equipment, params);

  const handleReset = () => {
    setEquipment(JSON.parse(JSON.stringify(initialEquipmentList)));
    setParams({ ...initialAuditParameters });
    setShowWatermark(false);
    setStudent({
      studentName: "OBAKPOLOR KINGSLEY OSAS",
      matricNumber: "ENG1802345",
      department: "Department of Mechanical Engineering",
      faculty: "Faculty of Engineering",
      university: "University of Benin",
      supervisorName: "Prof. O. S. OGBEMUDIA",
      headOfDepartment: "Dr. E. O. AKHERE",
      externalExaminer: "Prof. J. A. COKER (UI)",
      submissionYear: "2026",
      degreeType: "Bachelor of Engineering (B.Eng)"
    });
  };

  return (
    <div id="main-applet-app" className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      
      {/* Dynamic Left Sidebar Controls */}
      <Sidebar 
        student={student}
        setStudent={setStudent}
        equipment={equipment}
        setEquipment={setEquipment}
        params={params}
        setParams={setParams}
        totals={calculations.totals}
        overall={calculations.overall}
        onReset={handleReset}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        showWatermark={showWatermark}
        setShowWatermark={setShowWatermark}
      />

      {/* Dynamic Right Academic Thesis Document previewer */}
      <AcademicDocument 
        student={student}
        equipment={equipment}
        params={params}
        calculations={calculations}
        showWatermark={showWatermark}
      />

    </div>
  );
}
