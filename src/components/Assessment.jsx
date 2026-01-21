import { useState } from 'react';
import {
    User,
    Stethoscope,
    AlertCircle,
    ShieldAlert,
    ChevronRight,
    ChevronLeft,
    Home,
    CheckCircle
} from 'lucide-react';

export default function Assessment({ translations, language, onBackToLobby, onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Patient data state
    const [patientData, setPatientData] = useState({
        // Step 1: Patient Profile
        age: '',
        weight: '',
        pregnancy: 'notPregnant',
        renalFunction: 'normal',
        liverFunction: 'normal',

        // Step 2: Symptom Deep Dive
        primarySymptom: [], // Changed to array for multiple selection
        feverLevel: '', // 'lowFever' or 'highFever'
        symptomDuration: '',
        symptomSeverity: 'mild',
        additionalSymptoms: '',

        // Step 3: Risk Factors & History
        underlyingDiseases: [],
        recentAntibioticUse: 'no',
        antibioticName: '',
        hospitalizationHistory: 'no',

        // Step 4: Contraindications
        drugAllergies: [],
        allergyReaction: [],
        currentMedications: '',
    });

    const handleInputChange = (field, value) => {
        setPatientData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field, value) => {
        setPatientData(prev => {
            const currentValues = prev[field];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Assessment Data:', patientData);
        // Pass data to parent component to show results
        if (onComplete) {
            onComplete(patientData);
        }
    };

    const stepIcons = [User, Stethoscope, AlertCircle, ShieldAlert];
    const StepIcon = stepIcons[currentStep - 1];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={onBackToLobby}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
                    >
                        <Home size={20} />
                        <span>{translations.backToLobby}</span>
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {translations.assessmentTitle}
                    </h1>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            {translations.step} {currentStep} {translations.of} {totalSteps}
                        </span>
                        <span className="text-sm text-gray-500">
                            {Math.round((currentStep / totalSteps) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Assessment Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    {/* Step Icon and Title */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                            <StepIcon size={28} className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {currentStep === 1 && translations.step1Title}
                            {currentStep === 2 && translations.step2Title}
                            {currentStep === 3 && translations.step3Title}
                            {currentStep === 4 && translations.step4Title}
                        </h2>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-6">
                        {/* Step 1: Patient Profile */}
                        {currentStep === 1 && (
                            <>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {translations.age} ({translations.ageYears})
                                        </label>
                                        <input
                                            type="number"
                                            value={patientData.age}
                                            onChange={(e) => handleInputChange('age', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="0"
                                            min="0"
                                            max="120"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {translations.weight} ({translations.weightKg})
                                        </label>
                                        <input
                                            type="number"
                                            value={patientData.weight}
                                            onChange={(e) => handleInputChange('weight', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="0"
                                            min="0"
                                            max="300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.pregnancy}
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['notPregnant', 'pregnant', 'breastfeeding'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleInputChange('pregnancy', option)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${patientData.pregnancy === option
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {translations[option]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.renalFunction}
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                        {['normal', 'mildImpairment', 'moderateImpairment', 'severeImpairment', 'unknown'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleInputChange('renalFunction', option)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${patientData.renalFunction === option
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {translations[option]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.liverFunction}
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                        {['normal', 'mildImpairment', 'moderateImpairment', 'severeImpairment', 'unknown'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleInputChange('liverFunction', option)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${patientData.liverFunction === option
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {translations[option]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 2: Symptom Deep Dive */}
                        {currentStep === 2 && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.primarySymptom}
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            { value: 'fever', label: translations.fever },
                                            { value: 'cough', label: translations.cough },
                                            { value: 'sorethroat', label: translations.sorethroat },
                                            { value: 'difficultyBreathing', label: translations.difficultyBreathing },
                                            { value: 'urinarySymptoms', label: translations.urinarySymptoms },
                                            { value: 'skinInfection', label: translations.skinInfection },
                                            { value: 'diarrhea', label: translations.diarrhea },
                                            { value: 'other', label: translations.other }
                                        ].map((symptom) => (
                                            <button
                                                key={symptom.value}
                                                onClick={() => {
                                                    const currentSymptoms = patientData.primarySymptom || [];
                                                    const newSymptoms = currentSymptoms.includes(symptom.value)
                                                        ? currentSymptoms.filter(s => s !== symptom.value)
                                                        : [...currentSymptoms, symptom.value];
                                                    handleInputChange('primarySymptom', newSymptoms);
                                                }}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${(patientData.primarySymptom || []).includes(symptom.value)
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {symptom.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Fever Level Selection - Shows only when fever is selected */}
                                {(patientData.primarySymptom || []).includes('fever') && (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {translations.feverLevel}
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { value: 'lowFever', label: translations.lowFever },
                                                { value: 'highFever', label: translations.highFever }
                                            ].map((level) => (
                                                <button
                                                    key={level.value}
                                                    onClick={() => handleInputChange('feverLevel', level.value)}
                                                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${patientData.feverLevel === level.value
                                                            ? 'border-yellow-600 bg-yellow-100 text-yellow-800'
                                                            : 'border-gray-300 hover:border-yellow-400 text-gray-700'
                                                        }`}
                                                >
                                                    {level.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {translations.symptomDuration} ({translations.days})
                                    </label>
                                    <input
                                        type="number"
                                        value={patientData.symptomDuration}
                                        onChange={(e) => handleInputChange('symptomDuration', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.symptomSeverity}
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['mild', 'moderate', 'severe'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleInputChange('symptomSeverity', option)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${patientData.symptomSeverity === option
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {translations[option]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {translations.additionalSymptoms}
                                    </label>
                                    <textarea
                                        value={patientData.additionalSymptoms}
                                        onChange={(e) => handleInputChange('additionalSymptoms', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        rows="4"
                                        placeholder={language === 'TH' ? 'ระบุอาการเพิ่มเติม...' : 'Describe additional symptoms...'}
                                    />
                                </div>
                            </>
                        )}

                        {/* Step 3: Risk Factors & History */}
                        {currentStep === 3 && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.underlyingDiseases}
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {['diabetes', 'hypertension', 'heartDisease', 'kidneyDisease', 'liverDisease', 'asthma', 'cancer', 'immunocompromised', 'none'].map((disease) => (
                                            <button
                                                key={disease}
                                                onClick={() => handleCheckboxChange('underlyingDiseases', disease)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm flex items-center justify-center gap-2 ${patientData.underlyingDiseases.includes(disease)
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {patientData.underlyingDiseases.includes(disease) && (
                                                    <CheckCircle size={16} />
                                                )}
                                                {translations[disease]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.recentAntibioticUse}
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['yes', 'no'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleInputChange('recentAntibioticUse', option)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${patientData.recentAntibioticUse === option
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {translations[option]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {patientData.recentAntibioticUse === 'yes' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {translations.antibioticName}
                                        </label>
                                        <input
                                            type="text"
                                            value={patientData.antibioticName}
                                            onChange={(e) => handleInputChange('antibioticName', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder={language === 'TH' ? 'ระบุชื่อยา...' : 'Enter antibiotic name...'}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.hospitalizationHistory}
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['yes', 'no'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleInputChange('hospitalizationHistory', option)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${patientData.hospitalizationHistory === option
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300 text-gray-700'
                                                    }`}
                                            >
                                                {translations[option]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 4: Contraindications */}
                        {currentStep === 4 && (
                            <>
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                    <div className="flex items-center gap-2 text-red-700 font-semibold">
                                        <ShieldAlert size={20} />
                                        <span>{translations.drugAllergies}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {translations.drugAllergies}
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {['noKnownAllergies', 'penicillinAllergy', 'sulfonamideAllergy', 'quinoloneAllergy', 'macrolideAllergy'].map((allergy) => (
                                            <button
                                                key={allergy}
                                                onClick={() => handleCheckboxChange('drugAllergies', allergy)}
                                                className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm flex items-center justify-center gap-2 ${patientData.drugAllergies.includes(allergy)
                                                    ? 'border-red-600 bg-red-50 text-red-700'
                                                    : 'border-gray-300 hover:border-red-300 text-gray-700'
                                                    }`}
                                            >
                                                {patientData.drugAllergies.includes(allergy) && (
                                                    <CheckCircle size={16} />
                                                )}
                                                {translations[allergy]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {translations.otherAllergies}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder={language === 'TH' ? 'ระบุการแพ้ยาอื่นๆ...' : 'Specify other allergies...'}
                                    />
                                </div>

                                {patientData.drugAllergies.length > 0 && !patientData.drugAllergies.includes('noKnownAllergies') && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {translations.allergyReaction}
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['rash', 'anaphylaxis', 'swelling', 'difficultyBreathingAllergy'].map((reaction) => (
                                                <button
                                                    key={reaction}
                                                    onClick={() => handleCheckboxChange('allergyReaction', reaction)}
                                                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm flex items-center justify-center gap-2 ${patientData.allergyReaction.includes(reaction)
                                                        ? 'border-red-600 bg-red-50 text-red-700'
                                                        : 'border-gray-300 hover:border-red-300 text-gray-700'
                                                        }`}
                                                >
                                                    {patientData.allergyReaction.includes(reaction) && (
                                                        <CheckCircle size={16} />
                                                    )}
                                                    {translations[reaction]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {translations.currentMedications}
                                    </label>
                                    <textarea
                                        value={patientData.currentMedications}
                                        onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        rows="4"
                                        placeholder={translations.listMedications}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={previousStep}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                            }`}
                    >
                        <ChevronLeft size={20} />
                        {translations.previous}
                    </button>

                    {currentStep < totalSteps ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                        >
                            {translations.next}
                            <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                        >
                            {translations.submit}
                            <CheckCircle size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
