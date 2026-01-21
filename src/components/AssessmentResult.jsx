import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    TrendingUp,
    Shield,
    Activity,
    FileText,
    Home
} from 'lucide-react';

export default function AssessmentResult({ patientData, translations, language, onBackToLobby, onNewAssessment }) {
    // Assessment Algorithm
    const calculateAssessment = () => {
        let riskScore = 0;
        let maxScore = 100;
        let recommendation = 'no'; // 'yes' or 'no'
        let riskLevel = 'low'; // 'low', 'moderate', 'high'
        let reasons = [];

        // 1. Symptom Severity Assessment (30 points)
        if (patientData.primarySymptom && patientData.primarySymptom.length > 0) {
            const symptoms = Array.isArray(patientData.primarySymptom) ? patientData.primarySymptom : [patientData.primarySymptom];
            const highRiskSymptoms = ['difficultyBreathing', 'urinarySymptoms', 'skinInfection'];
            const moderateRiskSymptoms = ['fever', 'cough', 'sorethroat'];

            const hasHighRisk = symptoms.some(s => highRiskSymptoms.includes(s));
            const hasModerateRisk = symptoms.some(s => moderateRiskSymptoms.includes(s));

            if (hasHighRisk) {
                riskScore += 20;
                reasons.push(language === 'TH' ? 'มีอาการที่มีความเสี่ยงสูง' : 'High-risk symptoms present');
            } else if (hasModerateRisk) {
                riskScore += 10;
                reasons.push(language === 'TH' ? 'มีอาการที่มีความเสี่ยงปานกลาง' : 'Moderate-risk symptoms present');
            }

            // Add points for multiple symptoms
            if (symptoms.length > 1) {
                riskScore += 5 * (symptoms.length - 1); // +5 points per additional symptom
                reasons.push(language === 'TH' ? `มีหลายอาการพร้อมกัน (${symptoms.length} อาการ)` : `Multiple symptoms present (${symptoms.length} symptoms)`);
            }

            // Severity multiplier
            if (patientData.symptomSeverity === 'severe') {
                riskScore += 15;
                reasons.push(language === 'TH' ? 'อาการรุนแรง' : 'Severe symptoms');
            } else if (patientData.symptomSeverity === 'moderate') {
                riskScore += 8;
            }

            // Duration factor
            const duration = parseInt(patientData.symptomDuration) || 0;
            if (duration > 7) {
                riskScore += 10;
                reasons.push(language === 'TH' ? 'อาการนานเกิน 7 วัน' : 'Symptoms lasting over 7 days');
            } else if (duration > 3) {
                riskScore += 5;
            }
        }

        // 2. Patient Risk Factors (25 points)
        if (patientData.underlyingDiseases && patientData.underlyingDiseases.length > 0) {
            const highRiskDiseases = ['diabetes', 'immunocompromised', 'cancer', 'kidneyDisease'];
            const hasHighRisk = patientData.underlyingDiseases.some(d => highRiskDiseases.includes(d));

            if (hasHighRisk) {
                riskScore += 15;
                reasons.push(language === 'TH' ? 'มีโรคประจำตัวที่เพิ่มความเสี่ยง' : 'High-risk underlying conditions');
            } else if (!patientData.underlyingDiseases.includes('none')) {
                riskScore += 8;
                reasons.push(language === 'TH' ? 'มีโรคประจำตัว' : 'Underlying conditions present');
            }
        }

        // 3. Organ Function (20 points)
        if (patientData.renalFunction === 'severeImpairment' || patientData.liverFunction === 'severeImpairment') {
            riskScore += 15;
            reasons.push(language === 'TH' ? 'การทำงานของอวัยวะบกพร่องรุนแรง' : 'Severe organ impairment');
        } else if (patientData.renalFunction === 'moderateImpairment' || patientData.liverFunction === 'moderateImpairment') {
            riskScore += 10;
            reasons.push(language === 'TH' ? 'การทำงานของอวัยวะบกพร่องปานกลาง' : 'Moderate organ impairment');
        } else if (patientData.renalFunction === 'mildImpairment' || patientData.liverFunction === 'mildImpairment') {
            riskScore += 5;
        } else if (patientData.renalFunction === 'unknown' || patientData.liverFunction === 'unknown') {
            riskScore += 8;
            reasons.push(language === 'TH' ? 'ไม่ทราบสถานะการทำงานของอวัยวะ (ควรตรวจสอบ)' : 'Unknown organ function status (should be evaluated)');
        }

        // 4. Recent Antibiotic Use (15 points)
        if (patientData.recentAntibioticUse === 'yes') {
            riskScore += 12;
            reasons.push(language === 'TH' ? 'เคยใช้ยาปฏิชีวนะเมื่อเร็วๆ นี้ (เสี่ยงต่อเชื้อดื้อยา)' : 'Recent antibiotic use (resistance risk)');
        }

        // 5. Hospitalization History (10 points)
        if (patientData.hospitalizationHistory === 'yes') {
            riskScore += 10;
            reasons.push(language === 'TH' ? 'มีประวัติเข้ารักษาในโรงพยาบาล' : 'Recent hospitalization');
        }

        // Determine Risk Level
        if (riskScore >= 60) {
            riskLevel = 'high';
            recommendation = 'yes';
        } else if (riskScore >= 30) {
            riskLevel = 'moderate';
            recommendation = 'yes';
        } else {
            riskLevel = 'low';
            recommendation = 'no';
        }

        // Check for contraindications (override recommendation)
        const hasAllergies = patientData.drugAllergies &&
            patientData.drugAllergies.length > 0 &&
            !patientData.drugAllergies.includes('noKnownAllergies');

        // Special considerations
        if (patientData.pregnancy === 'pregnant' || patientData.pregnancy === 'breastfeeding') {
            reasons.push(language === 'TH' ? 'ต้องระมัดระวังในการเลือกยา (ตั้งครรภ์/ให้นมบุตร)' : 'Caution required (pregnancy/breastfeeding)');
        }

        return {
            riskScore: Math.min(riskScore, maxScore),
            riskLevel,
            recommendation,
            reasons,
            hasAllergies
        };
    };

    const result = calculateAssessment();

    // Get risk level styling
    const getRiskStyle = () => {
        switch (result.riskLevel) {
            case 'high':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-500',
                    text: 'text-red-700',
                    gradient: 'from-red-500 to-red-600',
                    label: language === 'TH' ? 'สูง' : 'High'
                };
            case 'moderate':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-500',
                    text: 'text-yellow-700',
                    gradient: 'from-yellow-500 to-yellow-600',
                    label: language === 'TH' ? 'ปานกลาง' : 'Moderate'
                };
            default:
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-500',
                    text: 'text-green-700',
                    gradient: 'from-green-500 to-green-600',
                    label: language === 'TH' ? 'ต่ำ' : 'Low'
                };
        }
    };

    const riskStyle = getRiskStyle();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {language === 'TH' ? 'ผลการประเมิน (เบื้องต้น)' : 'Assessment Result (Preliminary)'}
                    </h1>
                    <p className="text-gray-600">
                        {language === 'TH'
                            ? 'ผลการวิเคราะห์จากข้อมูลที่ท่านให้มา'
                            : 'Analysis based on your provided information'}
                    </p>
                </div>

                {/* Main Result Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    {/* Recommendation Section */}
                    <div className={`${riskStyle.bg} border-l-4 ${riskStyle.border} p-6 rounded-lg mb-6`}>
                        <div className="flex items-start gap-4">
                            {result.recommendation === 'yes' ? (
                                <CheckCircle size={32} className={riskStyle.text} />
                            ) : (
                                <XCircle size={32} className={riskStyle.text} />
                            )}
                            <div className="flex-1">
                                <h2 className={`text-2xl font-bold ${riskStyle.text} mb-2`}>
                                    {result.recommendation === 'yes'
                                        ? (language === 'TH' ? 'ควรใช้ยาปฏิชีวนะ' : 'Antibiotic Recommended')
                                        : (language === 'TH' ? 'ไม่ควรใช้ยาปฏิชีวนะ' : 'Antibiotic Not Recommended')
                                    }
                                </h2>
                                <p className={`${riskStyle.text} text-sm`}>
                                    {result.recommendation === 'yes'
                                        ? (language === 'TH'
                                            ? 'จากการประเมิน พบว่าท่านมีความเสี่ยงต่อการติดเชื้อแบคทีเรีย ควรปรึกษาแพทย์เพื่อรับการรักษาด้วยยาปฏิชีวนะ'
                                            : 'Based on assessment, you have risk of bacterial infection. Please consult a doctor for antibiotic treatment.')
                                        : (language === 'TH'
                                            ? 'จากการประเมิน อาการของท่านอาจไม่จำเป็นต้องใช้ยาปฏิชีวนะ แต่หากอาการไม่ดีขึ้นควรพบแพทย์'
                                            : 'Based on assessment, your symptoms may not require antibiotics. However, consult a doctor if symptoms worsen.')
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Infection Risk Score */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Activity className="text-blue-600" size={24} />
                                <h3 className="text-xl font-bold text-gray-900">
                                    {language === 'TH' ? 'ระดับความเสี่ยงต่อการติดเชื้อ' : 'Infection Risk Level'}
                                </h3>
                            </div>
                            <span className={`px-4 py-2 rounded-full font-bold ${riskStyle.bg} ${riskStyle.text}`}>
                                {riskStyle.label}
                            </span>
                        </div>

                        {/* Risk Score Bar */}
                        <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${riskStyle.gradient} transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
                                    style={{ width: `${result.riskScore}%` }}
                                >
                                    <span className="text-white font-bold text-sm">
                                        {result.riskScore}%
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{language === 'TH' ? 'ต่ำ' : 'Low'}</span>
                                <span>{language === 'TH' ? 'ปานกลาง' : 'Moderate'}</span>
                                <span>{language === 'TH' ? 'สูง' : 'High'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Risk Factors */}
                    {result.reasons.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="text-orange-600" size={24} />
                                <h3 className="text-xl font-bold text-gray-900">
                                    {language === 'TH' ? 'ปัจจัยเสี่ยงที่พบ' : 'Risk Factors Identified'}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {result.reasons.map((reason, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <TrendingUp size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                                        <span>{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Allergy Warning */}
                    {result.hasAllergies && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <Shield size={24} className="text-red-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-red-700 mb-1">
                                        {language === 'TH' ? '⚠️ คำเตือนสำคัญ: มีประวัติแพ้ยา' : '⚠️ Important Warning: Drug Allergies'}
                                    </h4>
                                    <p className="text-red-600 text-sm">
                                        {language === 'TH'
                                            ? 'กรุณาแจ้งแพทย์เกี่ยวกับประวัติการแพ้ยาของท่านก่อนรับยาปฏิชีวนะทุกครั้ง เพื่อป้องกันอาการแพ้ที่อาจเป็นอันตราย'
                                            : 'Please inform your doctor about your drug allergies before receiving any antibiotics to prevent potentially dangerous allergic reactions.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recommendations */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <div className="flex items-start gap-3">
                            <FileText size={24} className="text-blue-600 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-blue-700 mb-2">
                                    {language === 'TH' ? 'คำแนะนำ' : 'Recommendations'}
                                </h4>
                                <ul className="text-blue-600 text-sm space-y-1 list-disc list-inside">
                                    {result.recommendation === 'yes' ? (
                                        <>
                                            <li>{language === 'TH' ? 'ปรึกษาแพทย์โดยเร็วที่สุด' : 'Consult a doctor as soon as possible'}</li>
                                            <li>{language === 'TH' ? 'นำผลการประเมินนี้ไปแสดงแพทย์' : 'Show this assessment to your doctor'}</li>
                                            <li>{language === 'TH' ? 'ไม่ควรซื้อยาปฏิชีวนะใช้เอง' : 'Do not self-medicate with antibiotics'}</li>
                                            <li>{language === 'TH' ? 'ปฏิบัติตามคำแนะนำของแพทย์อย่างเคร่งครัด' : 'Follow doctor\'s instructions strictly'}</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>{language === 'TH' ? 'พักผ่อนให้เพียงพอ' : 'Get adequate rest'}</li>
                                            <li>{language === 'TH' ? 'ดื่มน้ำมากๆ' : 'Drink plenty of water'}</li>
                                            <li>{language === 'TH' ? 'สังเกตอาการ หากไม่ดีขึ้นภายใน 3-5 วัน ควรพบแพทย์' : 'Monitor symptoms; see a doctor if not improving in 3-5 days'}</li>
                                            <li>{language === 'TH' ? 'หากมีไข้สูง หรืออาการแย่ลง ควรรีบพบแพทย์ทันที' : 'Seek immediate medical attention if high fever or worsening symptoms'}</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onNewAssessment}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        <Activity size={20} />
                        {language === 'TH' ? 'ประเมินใหม่' : 'New Assessment'}
                    </button>

                    <button
                        onClick={onBackToLobby}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 border-2 border-gray-300"
                    >
                        <Home size={20} />
                        {language === 'TH' ? 'กลับหน้าหลัก' : 'Back to Home'}
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        {language === 'TH'
                            ? '⚠️ ผลการประเมินนี้เป็นเพียงข้อมูลเบื้องต้นเท่านั้น ไม่สามารถใช้แทนการวินิจฉัยของแพทย์ได้'
                            : '⚠️ This assessment is for informational purposes only and cannot replace professional medical diagnosis'}
                    </p>
                </div>
            </div>
        </div>
    );
}
