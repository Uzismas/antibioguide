import { HelpCircle, X, Play, CheckSquare, FileText, TrendingUp, Home } from 'lucide-react';

export default function Instruction({ language, onClose }) {
    const instructions = [
        {
            id: 1,
            step: 1,
            icon: Home,
            title: {
                TH: 'เริ่มต้นใช้งาน',
                EN: 'Getting Started'
            },
            description: {
                TH: 'เปิดเว็บแอปพลิเคชัน AntiBioguide คุณจะเห็นหน้าหลัก (Lobby) พร้อมปุ่ม "เริ่มการประเมิน"',
                EN: 'Open AntiBioguide web application. You will see the main lobby page with "Start Assessment" button'
            },
            details: {
                TH: [
                    'เลือกภาษาที่ต้องการ (ไทย/อังกฤษ) จากปุ่มมุมขวาบน',
                    'อ่านข้อมูลเบื้องต้นเกี่ยวกับระบบ',
                    'คลิกปุ่ม "เริ่มการประเมิน" เมื่อพร้อม'
                ],
                EN: [
                    'Select your preferred language (Thai/English) from top-right button',
                    'Read basic information about the system',
                    'Click "Start Assessment" button when ready'
                ]
            }
        },
        {
            id: 2,
            step: 2,
            icon: FileText,
            title: {
                TH: 'กรอกข้อมูลผู้ป่วย (ขั้นตอนที่ 1)',
                EN: 'Fill Patient Information (Step 1)'
            },
            description: {
                TH: 'กรอกข้อมูลพื้นฐานของผู้ป่วย เช่น อายุ น้ำหนัก สถานะการตั้งครรภ์ และการทำงานของอวัยวะ',
                EN: 'Fill in basic patient information such as age, weight, pregnancy status, and organ function'
            },
            details: {
                TH: [
                    'ระบุอายุและน้ำหนักของผู้ป่วย',
                    'เลือกสถานะการตั้งครรภ์/ให้นมบุตร (ถ้ามี)',
                    'ประเมินการทำงานของไตและตับ',
                    'คลิก "ถัดไป" เพื่อไปขั้นตอนต่อไป'
                ],
                EN: [
                    'Enter patient age and weight',
                    'Select pregnancy/breastfeeding status (if applicable)',
                    'Assess kidney and liver function',
                    'Click "Next" to proceed to next step'
                ]
            }
        },
        {
            id: 3,
            step: 3,
            icon: CheckSquare,
            title: {
                TH: 'ระบุอาการและประวัติ (ขั้นตอนที่ 2-3)',
                EN: 'Specify Symptoms and History (Steps 2-3)'
            },
            description: {
                TH: 'ให้ข้อมูลเกี่ยวกับอาการที่มี ความรุนแรง ระยะเวลา และประวัติการรักษา',
                EN: 'Provide information about symptoms, severity, duration, and medical history'
            },
            details: {
                TH: [
                    'เลือกอาการหลักจากรายการ (เช่น ไข้, ไอ, เจ็บคอ)',
                    'ระบุระยะเวลาที่มีอาการ (จำนวนวัน)',
                    'ประเมินความรุนแรงของอาการ (เล็กน้อย/ปานกลาง/รุนแรง)',
                    'เลือกโรคประจำตัว (ถ้ามี)',
                    'ระบุประวัติการใช้ยาปฏิชีวนะในช่วง 3 เดือนที่ผ่านมา'
                ],
                EN: [
                    'Select primary symptom from list (e.g., fever, cough, sore throat)',
                    'Specify symptom duration (number of days)',
                    'Assess symptom severity (mild/moderate/severe)',
                    'Select underlying diseases (if any)',
                    'Indicate recent antibiotic use within 3 months'
                ]
            }
        },
        {
            id: 4,
            step: 4,
            icon: TrendingUp,
            title: {
                TH: 'ตรวจสอบการแพ้ยา (ขั้นตอนที่ 4)',
                EN: 'Check Drug Allergies (Step 4)'
            },
            description: {
                TH: 'ระบุประวัติการแพ้ยาปฏิชีวนะ - ขั้นตอนสำคัญมากเพื่อความปลอดภัย',
                EN: 'Specify antibiotic allergy history - critical step for safety'
            },
            details: {
                TH: [
                    '⚠️ ขั้นตอนนี้สำคัญมาก! ระบุการแพ้ยาให้ครบถ้วน',
                    'เลือกกลุ่มยาที่แพ้ (Penicillin, Sulfonamide, ฯลฯ)',
                    'ระบุอาการแพ้ที่เคยเกิดขึ้น (ผื่น, ช็อก, บวม)',
                    'ระบุยาที่ใช้ประจำในปัจจุบัน',
                    'คลิก "ส่งข้อมูล" เพื่อดูผลการประเมิน'
                ],
                EN: [
                    '⚠️ This step is critical! Specify all drug allergies',
                    'Select allergic drug groups (Penicillin, Sulfonamide, etc.)',
                    'Specify allergic reactions experienced (rash, anaphylaxis, swelling)',
                    'List current medications',
                    'Click "Submit" to view assessment results'
                ]
            }
        },
        {
            id: 5,
            step: 5,
            icon: Play,
            title: {
                TH: 'ดูผลการประเมิน',
                EN: 'View Assessment Results'
            },
            description: {
                TH: 'ระบบจะวิเคราะห์ข้อมูลและแสดงคำแนะนำว่าควรหรือไม่ควรใช้ยาปฏิชีวนะ พร้อมระดับความเสี่ยง',
                EN: 'System analyzes data and shows recommendation on antibiotic use with risk level'
            },
            details: {
                TH: [
                    'อ่านคำแนะนำ "ควรใช้" หรือ "ไม่ควรใช้" ยาปฏิชีวนะ',
                    'ดูระดับความเสี่ยงต่อการติดเชื้อ (ต่ำ/ปานกลาง/สูง)',
                    'อ่านปัจจัยเสี่ยงที่พบจากการประเมิน',
                    'ปฏิบัติตามคำแนะนำที่ระบบให้',
                    '⚠️ ผลการประเมินเป็นเพียงข้อมูลเบื้องต้น ควรปรึกษาแพทย์'
                ],
                EN: [
                    'Read recommendation: "Should Use" or "Should Not Use" antibiotics',
                    'View infection risk level (low/moderate/high)',
                    'Review identified risk factors from assessment',
                    'Follow system recommendations',
                    '⚠️ Results are preliminary - consult a doctor'
                ]
            }
        },
        {
            id: 6,
            step: 6,
            icon: HelpCircle,
            title: {
                TH: 'เมนูเพิ่มเติม',
                EN: 'Additional Menu'
            },
            description: {
                TH: 'ใช้เมนูด้านบนขวาเพื่อเข้าถึงข้อมูลเพิ่มเติม',
                EN: 'Use top-right menu to access additional information'
            },
            details: {
                TH: [
                    '📚 ข้อมูลอ้างอิง - ดูแหล่งข้อมูลทางการแพทย์ที่ใช้อ้างอิง',
                    '❓ วิธีใช้งาน - คู่มือการใช้งานนี้',
                    '👤 ผู้จัดทำ - ข้อมูลเกี่ยวกับผู้พัฒนาระบบ',
                    '🌐 เปลี่ยนภาษา - สลับระหว่างไทย/อังกฤษ'
                ],
                EN: [
                    '📚 Reference Data - View medical reference sources',
                    '❓ Instructions - This user guide',
                    '👤 About Developer - Information about system developers',
                    '🌐 Language - Switch between Thai/English'
                ]
            }
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <HelpCircle size={32} />
                        <div>
                            <h2 className="text-2xl font-bold">
                                {language === 'TH' ? 'วิธีใช้งาน' : 'User Guide'}
                            </h2>
                            <p className="text-green-100 text-sm">
                                {language === 'TH'
                                    ? 'คู่มือการใช้งานระบบ AntiBioguide'
                                    : 'AntiBioguide System User Guide'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {instructions.map((instruction) => {
                            const Icon = instruction.icon;
                            return (
                                <div
                                    key={instruction.id}
                                    className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-[1.02] group"
                                >
                                    {/* Step Number Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                {instruction.step}
                                            </div>
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Icon size={24} className="text-green-600" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        {instruction.title[language]}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                        {instruction.description[language]}
                                    </p>

                                    {/* Details List */}
                                    <div className="bg-white rounded-lg p-4 border border-green-100">
                                        <ul className="space-y-2">
                                            {instruction.details[language].map((detail, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="text-green-600 font-bold mt-0.5">•</span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Important Notes */}
                    <div className="mt-8 space-y-4">
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                            <h4 className="font-bold text-blue-900 mb-2">
                                {language === 'TH' ? '💡 เคล็ดลับการใช้งาน' : '💡 Usage Tips'}
                            </h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• {language === 'TH'
                                    ? 'กรอกข้อมูลให้ครบถ้วนและถูกต้องเพื่อผลการประเมินที่แม่นยำ'
                                    : 'Fill in complete and accurate information for precise assessment'}</li>
                                <li>• {language === 'TH'
                                    ? 'สามารถย้อนกลับแก้ไขข้อมูลในแต่ละขั้นตอนได้'
                                    : 'You can go back to edit information in each step'}</li>
                                <li>• {language === 'TH'
                                    ? 'เปลี่ยนภาษาได้ตลอดเวลาโดยไม่สูญเสียข้อมูล'
                                    : 'Change language anytime without losing data'}</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                            <h4 className="font-bold text-red-900 mb-2">
                                {language === 'TH' ? '⚠️ ข้อควรระวัง' : '⚠️ Important Warning'}
                            </h4>
                            <p className="text-sm text-red-800">
                                {language === 'TH'
                                    ? 'ระบบนี้เป็นเครื่องมือช่วยประเมินเบื้องต้นเท่านั้น ไม่สามารถใช้แทนการวินิจฉัยและรักษาของแพทย์ผู้เชี่ยวชาญได้ หากมีอาการป่วยควรพบแพทย์โดยเร็วที่สุด'
                                    : 'This system is a preliminary assessment tool only. It cannot replace professional medical diagnosis and treatment. If you have symptoms, please consult a doctor as soon as possible'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                        {language === 'TH' ? 'ปิด' : 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
}
