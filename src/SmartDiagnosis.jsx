import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Thermometer,
    Wind,
    Activity,
    AlertCircle,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Globe,
    Stethoscope,
    Clock,
    ThumbsUp,
    AlertTriangle
} from 'lucide-react';

// --- Data & Content Configuration ---

const languages = {
    th: {
        title: "SmartDiagnosis: ประเมินอาการเบื้องต้น",
        step: "คำถามที่",
        next: "ต่อไป",
        back: "ย้อนกลับ",
        finish: "ดูผลลัพธ์",
        resultTitle: "ผลการวิเคราะห์เบื้องต้น",
        riskLabel: "ระดับความเสี่ยง",
        antibioticLabel: "แนวโน้มการใช้ยาปฏิชีวนะ",
        reasoningLabel: "เหตุผลทางการแพทย์",
        restart: "ประเมินใหม่",

        // Risk Levels
        risk_low: "ความเสี่ยงต่ำ / หายได้เอง",
        risk_med: "ควรเฝ้าระวัง / ปรึกษาเภสัชกร",
        risk_high: "ควรพบแพทย์ทันที",

        // Antibiotic Use
        ab_needed: "มีแนวโน้มต้องใช้",
        ab_not_needed: "ไม่จำเป็น",
        ab_consult: "ปรึกษาแพทย์ก่อนใช้",

        questions: [
            {
                id: 'temperature',
                text: "อุณหภูมิร่างกายของคุณเป็นอย่างไร?",
                options: [
                    { value: 'normal', label: "ปกติ (ไม่มีไข้)" },
                    { value: 'low_grade', label: "มีไข้ต่ำๆ (ตัวอุ่นๆ)" },
                    { value: 'high', label: "ไข้สูง (> 38°C)" },
                ]
            },
            {
                id: 'cough',
                text: "ลักษณะการไอของคุณ?",
                options: [
                    { value: 'none', label: "ไม่มีอาการไอ" },
                    { value: 'dry', label: "ไอแห้งๆ" },
                    { value: 'phlegm', label: "ไอมีเสมหะ" },
                ]
            },
            {
                id: 'sore_throat',
                text: "อาการเจ็บคอ?",
                options: [
                    { value: 'none', label: "ไม่เจ็บ" },
                    { value: 'mild', label: "ระคายคอ / เจ็บเล็กน้อย" },
                    { value: 'severe', label: "เจ็บมาก / กลืนน้ำลายลำบาก" },
                ]
            },
            {
                id: 'tonsils',
                text: "ลักษณะของต่อมทอนซิล (ส่องกระจกดูในคอ)?",
                note: "(หากดูไม่ได้ให้ข้าม หรือเลือกข้อแรก)",
                options: [
                    { value: 'normal', label: "ปกติ / แดงเล็กน้อย" },
                    { value: 'red_swollen', label: "แดงจัดและบวม" },
                    { value: 'white_spots', label: "มีจุดหนองสีขาว / บวมแดงมาก" },
                ]
            },
            {
                id: 'runny_nose',
                text: "น้ำมูกของคุณ?",
                options: [
                    { value: 'none', label: "ไม่มี" },
                    { value: 'clear', label: "ใส / ไหลเป็นน้ำ" },
                    { value: 'thick_color', label: "ข้น / สีเหลืองหรือเขียว" },
                ]
            },
            {
                id: 'body_aches',
                text: "อาการปวดเมื่อยตามตัว?",
                options: [
                    { value: 'none', label: "ไม่มี" },
                    { value: 'mild', label: "เมื่อยล้าเล็กน้อย" },
                    { value: 'severe', label: "ปวดร้าวไปทั้งตัว / ขยับตัวลำบาก" },
                ]
            },
            {
                id: 'facial_pain',
                text: "ปวดบริเวณใบหน้าหรือไซนัส (โหนกแก้ม, หน้าผาก)?",
                options: [
                    { value: 'no', label: "ไม่ปวด" },
                    { value: 'yes', label: "ปวดตื้อๆ / ก้มหน้าแล้วปวด" },
                ]
            },
            {
                id: 'breathing',
                text: "การหายใจ?",
                options: [
                    { value: 'normal', label: "ปกติ" },
                    { value: 'wheezing', label: "มีเสียงวี้ด" },
                    { value: 'shortness', label: "หายใจลำบาก / เหนื่อยหอบ" },
                ]
            },
            {
                id: 'duration',
                text: "เป็นมานานเท่าไหร่แล้ว?",
                options: [
                    { value: 'short', label: "น้อยกว่า 3 วัน" },
                    { value: 'medium', label: "3 - 7 วัน" },
                    { value: 'long', label: "มากกว่า 7-10 วัน" },
                ]
            },
            {
                id: 'lymph_nodes',
                text: "ต่อมน้ำเหลืองที่คอ?",
                options: [
                    { value: 'normal', label: "ปกติ คลำไม่เจอ" },
                    { value: 'swollen', label: "บวม / กดเจ็บ" },
                ]
            }
        ]
    },
    en: {
        title: "SmartDiagnosis: Symptom Assessment",
        step: "Question",
        next: "Next",
        back: "Back",
        finish: "See Result",
        resultTitle: "Assessment Result",
        riskLabel: "Risk Level",
        antibioticLabel: "Antibiotic Gauge",
        reasoningLabel: "Medical Reasoning",
        restart: "Start Over",

        // Risk Levels
        risk_low: "Low Risk / Self-Limiting",
        risk_med: "Monitor / Consult Pharmacist",
        risk_high: "Consult Doctor Immediately",

        // Antibiotic Use
        ab_needed: "Likely Needed",
        ab_not_needed: "Not Needed",
        ab_consult: "Consult Doctor",

        questions: [
            {
                id: 'temperature',
                text: "How involves is your body temperature?",
                options: [
                    { value: 'normal', label: "Normal (No Fever)" },
                    { value: 'low_grade', label: "Low Grade (Warm)" },
                    { value: 'high', label: "High Fever (> 38°C)" },
                ]
            },
            {
                id: 'cough',
                text: "Describe your cough:",
                options: [
                    { value: 'none', label: "No Cough" },
                    { value: 'dry', label: "Dry Cough" },
                    { value: 'phlegm', label: "Wet / Phlegm" },
                ]
            },
            {
                id: 'sore_throat',
                text: "Do you have a sore throat?",
                options: [
                    { value: 'none', label: "No" },
                    { value: 'mild', label: "Mild / Scratchy" },
                    { value: 'severe', label: "Severe / Painful Swallowing" },
                ]
            },
            {
                id: 'tonsils',
                text: "Condition of Tonsils (Check mirror if possible):",
                note: "(Skip or select first if unsure)",
                options: [
                    { value: 'normal', label: "Normal / Slightly Red" },
                    { value: 'red_swollen', label: "Very Red & Swollen" },
                    { value: 'white_spots', label: "White Spots / Pus" },
                ]
            },
            {
                id: 'runny_nose',
                text: "Nasal Discharge?",
                options: [
                    { value: 'none', label: "None" },
                    { value: 'clear', label: "Clear / Watery" },
                    { value: 'thick_color', label: "Thick / Yellow or Green" },
                ]
            },
            {
                id: 'body_aches',
                text: "Body Aches?",
                options: [
                    { value: 'none', label: "None" },
                    { value: 'mild', label: "Mild Fatigue" },
                    { value: 'severe', label: "Severe / Whole Body Pain" },
                ]
            },
            {
                id: 'facial_pain',
                text: "Facial or Sinus Pain (Cheeks/Forehead)?",
                options: [
                    { value: 'no', label: "No" },
                    { value: 'yes', label: "Yes / Pain when bending down" },
                ]
            },
            {
                id: 'breathing',
                text: "Breathing Condition?",
                options: [
                    { value: 'normal', label: "Normal" },
                    { value: 'wheezing', label: "Wheezing Sound" },
                    { value: 'shortness', label: "Shortness of Breath" },
                ]
            },
            {
                id: 'duration',
                text: "Duration of Symptoms?",
                options: [
                    { value: 'short', label: "Less than 3 days" },
                    { value: 'medium', label: "3 - 7 days" },
                    { value: 'long', label: "More than 7-10 days" },
                ]
            },
            {
                id: 'lymph_nodes',
                text: "Neck Lymph Nodes?",
                options: [
                    { value: 'normal', label: "Normal" },
                    { value: 'swollen', label: "Swollen / Tender" },
                ]
            }
        ]
    }
};

// --- Diagnosis Algorithm ---

const analyzeResult = (answers, lang) => {
    const t = languages[lang];
    let diagnosis = {
        risk: t.risk_low,
        antibiotic: t.ab_not_needed,
        antibioticColor: 'bg-green-500', // Green
        reason: "",
        diseaseName: "Viral Infection (General)"
    };

    const {
        temperature, cough, sore_throat, tonsils,
        runny_nose, body_aches, facial_pain, duration, lymph_nodes
    } = answers;

    // 1. Bacterial Tonsillitis (Strep Throat)
    // Criteria: High Fever + Severe Sore Throat + No Cough + (White Spots OR Swollen Nodes)
    if (
        temperature === 'high' &&
        sore_throat === 'severe' &&
        cough === 'none' &&
        (tonsils === 'white_spots' || lymph_nodes === 'swollen')
    ) {
        diagnosis = {
            risk: t.risk_high,
            antibiotic: t.ab_needed,
            antibioticColor: 'bg-red-500',
            diseaseName: lang === 'th' ? "ต่อมทอนซิลอักเสบจากแบคทีเรีย" : "Bacterial Tonsillitis",
            reason: lang === 'th'
                ? "มีไข้สูง เจ็บคอมาก ไม่มีไอ ร่วมกับมีจุดหนองหรือต่อมน้ำเหลืองโต เป็นสัญญาณของการติดเชื้อแบคทีเรีย"
                : "High fever, severe sore throat, no cough, combined with white spots or swollen nodes suggests bacterial infection."
        };
        return diagnosis;
    }

    // 2. Influenza (Flu)
    // Criteria: High Fever + Severe Body Aches + Dry Cough
    if (temperature === 'high' && body_aches === 'severe' && cough === 'dry') {
        diagnosis = {
            risk: t.risk_med,
            antibiotic: t.ab_not_needed,
            antibioticColor: 'bg-green-500',
            diseaseName: lang === 'th' ? "ไข้หวัดใหญ่ (Influenza)" : "Influenza (Flu)",
            reason: lang === 'th'
                ? "อาการไข้สูง ปวดเมื่อยตัวรุนแรง และไอแห้ง บ่งชี้ถึงการติดเชื้อไวรัสไข้หวัดใหญ่ ยาปฏิชีวนะไม่ช่วยรักษา"
                : "High fever, severe body aches, and dry cough strongly suggest a viral Flu infection. Antibiotics are not effective."
        };
        return diagnosis;
    }

    // 3. Acute Rhinosinusitis (Bacterial)
    // Criteria: Duration > 7-10 days + Yellow/Green Mucus + Facial Pain
    if (duration === 'long' && runny_nose === 'thick_color' && facial_pain === 'yes') {
        diagnosis = {
            risk: t.risk_med,
            antibiotic: t.ab_consult,
            antibioticColor: 'bg-yellow-500',
            diseaseName: lang === 'th' ? "ไซนัสอักเสบเฉียบพลัน" : "Acute Rhinosinusitis",
            reason: lang === 'th'
                ? "อาการที่เป็นนานกว่า 10 วัน ร่วมกับน้ำมูกข้นเขียวและปวดใบหน้า อาจมีการติดเชื้อแบคทีเรียแทรกซ้อน"
                : "Symptoms lasting over 10 days with thick colored mucus and facial pain may indicate bacterial sinusitis."
        };
        return diagnosis;
    }

    // 4. Common Cold (Default fallback for mild symptoms)
    // Criteria: Runny Nose (Clear) + Mild Cough/Sore Throat + No High Fever
    if (runny_nose === 'clear' || (temperature !== 'high' && body_aches !== 'severe')) {
        diagnosis = {
            risk: t.risk_low,
            antibiotic: t.ab_not_needed,
            antibioticColor: 'bg-green-500',
            diseaseName: lang === 'th' ? "ไข้หวัดธรรมดา (Common Cold)" : "Common Cold",
            reason: lang === 'th'
                ? "อาการโดยรวมเหมือนไข้หวัดจากเชื้อไวรัส ซึ่งหายเองได้ การพักผ่อนสำคัญที่สุด"
                : "Symptoms match a viral common cold. Self-care and rest are recommended. Antibiotics are not needed."
        };
    }

    return diagnosis;
};

// --- Main Component ---

export default function SmartDiagnosis() {
    const [lang, setLang] = useState('th'); // 'th' | 'en'
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const t = languages[lang];
    const questions = t.questions;
    const isFinished = step === questions.length;

    const handleSelect = (value) => {
        const currentQ = questions[step];
        setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setResult(analyzeResult(answers, lang));
            setStep(prev => prev + 1); // Move to result view
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
            setResult(null); // Reset result if going back
        }
    };

    const currentQ = questions[step];
    const progress = ((step + 1) / questions.length) * 100;

    // Variants for Framer Motion
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <div className="w-full max-w-md mx-auto min-h-[600px] flex flex-col font-sans">

            {/* --- Glassmorphism Card Container --- */}
            <div className="relative flex-1 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden flex flex-col p-6">

                {/* Header: Lang Toggle & Title */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2 text-indigo-600 font-bold">
                        <Stethoscope className="w-6 h-6" />
                        <span className="text-sm tracking-wide">AntiBioguide</span>
                    </div>
                    <button
                        onClick={() => setLang(l => l === 'th' ? 'en' : 'th')}
                        className="flex items-center space-x-1 px-3 py-1 bg-white/50 hover:bg-white/80 rounded-full transition-all text-xs font-semibold text-gray-600 border border-gray-200"
                    >
                        <Globe className="w-3 h-3" />
                        <span>{lang.toUpperCase()}</span>
                    </button>
                </div>

                {/* Progress Bar (Only during quiz) */}
                {!isFinished && (
                    <div className="mb-8">
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                            <span>{t.step} {step + 1} / {questions.length}</span>
                            <span>{Math.round(progress > 100 ? 100 : progress)}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-indigo-500 rounded-full"
                            />
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 relative">
                    <AnimatePresence mode="wait" custom={1}>
                        {!isFinished && currentQ ? (
                            <motion.div
                                key={step}
                                custom={1}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute w-full h-full flex flex-col"
                            >
                                {/* Question */}
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{currentQ.text}</h2>
                                {currentQ.note && <p className="text-sm text-gray-500 mb-6 italic">{currentQ.note}</p>}

                                {/* Options */}
                                <div className="space-y-3">
                                    {currentQ.options.map((opt) => {
                                        const isSelected = answers[currentQ.id] === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleSelect(opt.value)}
                                                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group
                          ${isSelected
                                                        ? 'bg-indigo-50 border-indigo-400 shadow-md transform scale-[1.02]'
                                                        : 'bg-white/40 border-white/60 hover:bg-white/90 hover:shadow-sm'
                                                    }
                        `}
                                            >
                                                <span className={`font-medium ${isSelected ? 'text-indigo-700' : 'text-gray-700'}`}>
                                                    {opt.label}
                                                </span>
                                                {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-500" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ) : (
                            // Result View
                            result && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col h-full space-y-6"
                                >
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-3">
                                            <Activity className="w-8 h-8 text-indigo-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">{result.diseaseName}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{t.resultTitle}</p>
                                    </div>

                                    {/* Antibiotic Gauge */}
                                    <div className="bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.antibioticLabel}</p>
                                        <div className="flex items-center space-x-3">
                                            <div className={`h-4 w-4 rounded-full ${result.antibioticColor} animate-pulse`} />
                                            <span className="font-bold text-gray-700">{result.antibiotic}</span>
                                        </div>
                                    </div>

                                    {/* Medical Reasoning */}
                                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                                        <div className="flex items-start space-x-3">
                                            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">{t.reasoningLabel}</p>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    "{result.reason}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Risk Badge */}
                                    <div className="mt-auto pt-4 flex justify-center">
                                        <span className="px-4 py-2 bg-gray-800 text-white rounded-full text-xs font-bold shadow-lg">
                                            {result.risk}
                                        </span>
                                    </div>

                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                {!isFinished && (
                    <div className="mt-8 flex justify-between pt-4 border-t border-gray-100/50">
                        <button
                            onClick={handleBack}
                            disabled={step === 0}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                ${step === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}
              `}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>{t.back}</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!answers[currentQ?.id]}
                            className={`flex items-center space-x-2 px-6 py-2 rounded-xl text-sm font-bold shadow-lg transition-all transform
                ${!answers[currentQ?.id]
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'
                                }
              `}
                        >
                            <span>{step === questions.length - 1 ? t.finish : t.next}</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Restart Button on Result Screen */}
                {isFinished && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <button
                            onClick={() => {
                                setStep(0);
                                setAnswers({});
                                setResult(null);
                            }}
                            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                        >
                            {t.restart}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
