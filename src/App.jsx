import { useState } from 'react';
import Navbar from './components/Navbar';
import Lobby from './components/Lobby';
import Assessment from './components/Assessment';
import AssessmentResult from './components/AssessmentResult';
import ReferenceData from './components/ReferenceData';
import Instruction from './components/Instruction';
import AboutDeveloper from './components/AboutDeveloper';

// Translation dictionary for bilingual support (TH/EN)
const translations = {
    TH: {
        // Navbar
        referenceData: 'ข้อมูลอ้างอิง',
        instruction: 'วิธีใช้งาน',
        aboutDeveloper: 'ผู้จัดทำ',
        language: 'ภาษา',

        // Lobby
        appTitle: 'AntiBioguide',
        appSubtitle: 'ระบบประเมินการใช้ยาปฏิชีวนะ (เบื้องต้น)',
        startAssessment: 'เริ่มการประเมิน',

        // Assessment
        assessmentTitle: 'การประเมินผู้ป่วย',
        step: 'ขั้นตอนที่',
        of: 'จาก',
        next: 'ถัดไป',
        previous: 'ย้อนกลับ',
        submit: 'ส่งข้อมูล',
        backToLobby: 'กลับหน้าหลัก',

        // Step 1: Patient Profile
        step1Title: 'ข้อมูลผู้ป่วย',
        age: 'อายุ',
        ageYears: 'ปี',
        weight: 'น้ำหนัก',
        weightKg: 'กิโลกรัม',
        pregnancy: 'การตั้งครรภ์',
        notPregnant: 'ไม่ได้ตั้งครรภ์',
        pregnant: 'ตั้งครรภ์',
        breastfeeding: 'ให้นมบุตร',
        renalFunction: 'การทำงานของไต',
        normal: 'ปกติ',
        mildImpairment: 'บกพร่องเล็กน้อย',
        moderateImpairment: 'บกพร่องปานกลาง',
        severeImpairment: 'บกพร่องรุนแรง',
        unknown: 'ไม่ทราบ',
        liverFunction: 'การทำงานของตับ',

        // Step 2: Symptom Deep Dive
        step2Title: 'อาการและความรุนแรง',
        primarySymptom: 'อาการหลัก (เลือกได้หลายอาการ)',
        selectSymptom: 'เลือกอาการ',
        fever: 'ไข้',
        feverLevel: 'ระดับไข้',
        lowFever: 'ไข้ต่ำ (<38.4°C)',
        highFever: 'ไข้สูง (≥38.5°C)',
        cough: 'ไอ',
        sorethroat: 'เจ็บคอ',
        difficultyBreathing: 'หายใจลำบาก',
        urinarySymptoms: 'อาการทางเดินปัสสาวะ',
        skinInfection: 'การติดเชื้อที่ผิวหนัง',
        diarrhea: 'ท้องเสีย',
        other: 'อื่นๆ',
        symptomDuration: 'ระยะเวลาที่มีอาการ',
        days: 'วัน',
        symptomSeverity: 'ความรุนแรงของอาการ',
        mild: 'เล็กน้อย',
        moderate: 'ปานกลาง',
        severe: 'รุนแรง',
        additionalSymptoms: 'อาการเพิ่มเติม (ถ้ามี)',

        // Step 3: Risk Factors & History
        step3Title: 'ปัจจัยเสี่ยงและประวัติ',
        underlyingDiseases: 'โรคประจำตัว',
        diabetes: 'เบาหวาน',
        hypertension: 'ความดันโลหิตสูง',
        heartDisease: 'โรคหัวใจ',
        kidneyDisease: 'โรคไต',
        liverDisease: 'โรคตับ',
        asthma: 'หอบหืด',
        cancer: 'มีประวัติมะเร็ง',
        immunocompromised: 'ภูมิคุ้มกันบกพร่อง',
        none: 'ไม่มี',
        recentAntibioticUse: 'การใช้ยาปฏิชีวนะในช่วง 3 เดือนที่ผ่านมา',
        yes: 'ใช่',
        no: 'ไม่ใช่',
        antibioticName: 'ชื่อยาปฏิชีวนะ (ถ้าจำได้)',
        hospitalizationHistory: 'ประวัติการเข้ารับการรักษาในโรงพยาบาล (ช่วง 6 เดือนที่ผ่านมา)',

        // Step 4: Contraindications
        step4Title: 'ข้อห้ามและการแพ้ยา',
        drugAllergies: 'การแพ้ยา (สำคัญมาก)',
        noKnownAllergies: 'ไม่มีประวัติแพ้ยา',
        penicillinAllergy: 'แพ้ยากลุ่ม Penicillin',
        sulfonamideAllergy: 'แพ้ยากลุ่ม Sulfonamide',
        quinoloneAllergy: 'แพ้ยากลุ่ม Quinolone',
        macrolideAllergy: 'แพ้ยากลุ่ม Macrolide',
        otherAllergies: 'แพ้ยาอื่นๆ (โปรดระบุ)',
        allergyReaction: 'อาการแพ้ที่เคยเกิดขึ้น',
        rash: 'ผื่น',
        anaphylaxis: 'ช็อกจากการแพ้ยา',
        swelling: 'บวม',
        difficultyBreathingAllergy: 'หายใจลำบาก',
        currentMedications: 'ยาที่ใช้ประจำในปัจจุบัน',
        listMedications: 'โปรดระบุรายการยา',
    },
    EN: {
        // Navbar
        referenceData: 'Reference Data',
        instruction: 'Instructions',
        aboutDeveloper: 'About Developer',
        language: 'Language',

        // Lobby
        appTitle: 'AntiBioguide',
        appSubtitle: 'Antibiotic Assessment System (Preliminary)',
        startAssessment: 'Start Assessment',

        // Assessment
        assessmentTitle: 'Patient Assessment',
        step: 'Step',
        of: 'of',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        backToLobby: 'Back to Lobby',

        // Step 1: Patient Profile
        step1Title: 'Patient Profile',
        age: 'Age',
        ageYears: 'years',
        weight: 'Weight',
        weightKg: 'kg',
        pregnancy: 'Pregnancy Status',
        notPregnant: 'Not Pregnant',
        pregnant: 'Pregnant',
        breastfeeding: 'Breastfeeding',
        renalFunction: 'Renal Function',
        normal: 'Normal',
        mildImpairment: 'Mild Impairment',
        moderateImpairment: 'Moderate Impairment',
        severeImpairment: 'Severe Impairment',
        liverFunction: 'Liver Function',

        // Step 2: Symptom Deep Dive
        step2Title: 'Symptom Deep Dive',
        primarySymptom: 'Primary Symptom',
        selectSymptom: 'Select symptom',
        fever: 'Fever',
        cough: 'Cough',
        sorethroat: 'Sore Throat',
        difficultyBreathing: 'Difficulty Breathing',
        urinarySymptoms: 'Urinary Symptoms',
        skinInfection: 'Skin Infection',
        diarrhea: 'Diarrhea',
        other: 'Other',
        symptomDuration: 'Symptom Duration',
        days: 'days',
        symptomSeverity: 'Symptom Severity',
        mild: 'Mild',
        moderate: 'Moderate',
        severe: 'Severe',
        additionalSymptoms: 'Additional Symptoms (if any)',

        // Step 3: Risk Factors & History
        step3Title: 'Risk Factors & Medical History',
        underlyingDiseases: 'Underlying Diseases',
        diabetes: 'Diabetes',
        hypertension: 'Hypertension',
        heartDisease: 'Heart Disease',
        kidneyDisease: 'Kidney Disease',
        liverDisease: 'Liver Disease',
        asthma: 'Asthma',
        cancer: 'Cancer History',
        immunocompromised: 'Immunocompromised',
        none: 'None',
        recentAntibioticUse: 'Recent Antibiotic Use (within 3 months)',
        yes: 'Yes',
        no: 'No',
        antibioticName: 'Antibiotic Name (if remembered)',
        hospitalizationHistory: 'Hospitalization History (within 6 months)',

        // Step 4: Contraindications
        step4Title: 'Contraindications & Drug Allergies',
        drugAllergies: 'Drug Allergies (Critical)',
        noKnownAllergies: 'No Known Allergies',
        penicillinAllergy: 'Penicillin Allergy',
        sulfonamideAllergy: 'Sulfonamide Allergy',
        quinoloneAllergy: 'Quinolone Allergy',
        macrolideAllergy: 'Macrolide Allergy',
        otherAllergies: 'Other Allergies (please specify)',
        allergyReaction: 'Allergic Reaction Experienced',
        rash: 'Rash',
        anaphylaxis: 'Anaphylaxis',
        swelling: 'Swelling',
        difficultyBreathingAllergy: 'Difficulty Breathing',
        currentMedications: 'Current Medications',
        listMedications: 'Please list medications',
    }
};

function App() {
    const [language, setLanguage] = useState('TH'); // Default language is Thai
    const [currentView, setCurrentView] = useState('lobby'); // 'lobby', 'assessment', or 'result'
    const [patientData, setPatientData] = useState(null); // Store assessment data
    const [showReferenceData, setShowReferenceData] = useState(false); // Reference modal state
    const [showInstruction, setShowInstruction] = useState(false); // Instruction modal state
    const [showAboutDeveloper, setShowAboutDeveloper] = useState(false); // About Developer modal state

    const t = translations[language]; // Translation helper

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'TH' ? 'EN' : 'TH');
    };

    const startAssessment = () => {
        setCurrentView('assessment');
    };

    const backToLobby = () => {
        setCurrentView('lobby');
        setPatientData(null);
    };

    const handleAssessmentComplete = (data) => {
        setPatientData(data);
        setCurrentView('result');
    };

    const startNewAssessment = () => {
        setPatientData(null);
        setCurrentView('assessment');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                language={language}
                toggleLanguage={toggleLanguage}
                translations={t}
                onOpenReference={() => setShowReferenceData(true)}
                onOpenInstruction={() => setShowInstruction(true)}
                onOpenAbout={() => setShowAboutDeveloper(true)}
            />

            {/* Reference Data Modal */}
            {showReferenceData && (
                <ReferenceData
                    language={language}
                    onClose={() => setShowReferenceData(false)}
                />
            )}

            {/* Instruction Modal */}
            {showInstruction && (
                <Instruction
                    language={language}
                    onClose={() => setShowInstruction(false)}
                />
            )}

            {/* About Developer Modal */}
            {showAboutDeveloper && (
                <AboutDeveloper
                    language={language}
                    onClose={() => setShowAboutDeveloper(false)}
                />
            )}

            {currentView === 'lobby' ? (
                <Lobby
                    translations={t}
                    onStartAssessment={startAssessment}
                />
            ) : currentView === 'assessment' ? (
                <Assessment
                    translations={t}
                    language={language}
                    onBackToLobby={backToLobby}
                    onComplete={handleAssessmentComplete}
                />
            ) : (
                <AssessmentResult
                    patientData={patientData}
                    translations={t}
                    language={language}
                    onBackToLobby={backToLobby}
                    onNewAssessment={startNewAssessment}
                />
            )}
        </div>
    );
}

export default App;
