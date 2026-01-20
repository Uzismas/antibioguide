import { BookOpen, ExternalLink, Calendar, Users, FileText, X } from 'lucide-react';

export default function ReferenceData({ language, onClose }) {
    const references = [
        {
            id: 1,
            title: {
                TH: 'แนวทางการใช้ยาต้านจุลชีพอย่างสมเหตุผล กระทรวงสาธารณสุข',
                EN: 'Rational Use of Antimicrobials Guidelines - Ministry of Public Health'
            },
            organization: {
                TH: 'กระทรวงสาธารณสุข ประเทศไทย',
                EN: 'Ministry of Public Health, Thailand'
            },
            year: '2023',
            type: {
                TH: 'แนวทางปฏิบัติ',
                EN: 'Clinical Guidelines'
            },
            url: 'https://dmsic.moph.go.th',
            description: {
                TH: 'แนวทางการใช้ยาปฏิชีวนะอย่างสมเหตุผลในโรงพยาบาลและคลินิก เพื่อป้องกันปัญหาเชื้อดื้อยา',
                EN: 'Guidelines for rational antibiotic use in hospitals and clinics to prevent antimicrobial resistance'
            }
        },
        {
            id: 2,
            title: {
                TH: 'WHO Guidelines on Antimicrobial Resistance',
                EN: 'WHO Guidelines on Antimicrobial Resistance'
            },
            organization: {
                TH: 'องค์การอนามัยโลก (WHO)',
                EN: 'World Health Organization (WHO)'
            },
            year: '2024',
            type: {
                TH: 'มาตรฐานสากล',
                EN: 'International Standards'
            },
            url: 'https://www.who.int/health-topics/antimicrobial-resistance',
            description: {
                TH: 'แนวทางสากลในการป้องกันและควบคุมปัญหาเชื้อดื้อยาจากองค์การอนามัยโลก',
                EN: 'International guidelines for prevention and control of antimicrobial resistance from WHO'
            }
        },
        {
            id: 3,
            title: {
                TH: 'คู่มือการวินิจฉัยและรักษาโรคติดเชื้อ สำหรับแพทย์เวชปฏิบัติทั่วไป',
                EN: 'Infectious Disease Diagnosis and Treatment Manual for General Practitioners'
            },
            organization: {
                TH: 'ราชวิทยาลัยอายุรแพทย์แห่งประเทศไทย',
                EN: 'Royal College of Physicians of Thailand'
            },
            year: '2023',
            type: {
                TH: 'คู่มือทางการแพทย์',
                EN: 'Medical Manual'
            },
            url: 'https://www.rcpt.org',
            description: {
                TH: 'คู่มือมาตรฐานสำหรับแพทย์ในการวินิจฉัยและเลือกใช้ยาปฏิชีวนะที่เหมาะสม',
                EN: 'Standard manual for physicians in diagnosing and selecting appropriate antibiotics'
            }
        },
        {
            id: 4,
            title: {
                TH: 'Sanford Guide to Antimicrobial Therapy',
                EN: 'Sanford Guide to Antimicrobial Therapy'
            },
            organization: {
                TH: 'Antimicrobial Therapy, Inc.',
                EN: 'Antimicrobial Therapy, Inc.'
            },
            year: '2024',
            type: {
                TH: 'คู่มืออ้างอิง',
                EN: 'Reference Guide'
            },
            url: 'https://www.sanfordguide.com',
            description: {
                TH: 'คู่มืออ้างอิงมาตรฐานระดับโลกสำหรับการเลือกใช้ยาต้านจุลชีพ',
                EN: 'Global standard reference guide for antimicrobial selection'
            }
        },
        {
            id: 5,
            title: {
                TH: 'แนวทางเฝ้าระวังและป้องกันการดื้อยาต้านจุลชีพในประเทศไทย',
                EN: 'AMR Surveillance and Prevention Guidelines in Thailand'
            },
            organization: {
                TH: 'สำนักระบาดวิทยา กรมควบคุมโรค',
                EN: 'Bureau of Epidemiology, Department of Disease Control'
            },
            year: '2023',
            type: {
                TH: 'แนวทางเฝ้าระวัง',
                EN: 'Surveillance Guidelines'
            },
            url: 'https://ddc.moph.go.th',
            description: {
                TH: 'ระบบเฝ้าระวังและแนวทางป้องกันปัญหาเชื้อดื้อยาในระดับประเทศ',
                EN: 'National surveillance system and prevention guidelines for antimicrobial resistance'
            }
        },
        {
            id: 6,
            title: {
                TH: 'Clinical Practice Guidelines: Community-Acquired Pneumonia',
                EN: 'Clinical Practice Guidelines: Community-Acquired Pneumonia'
            },
            organization: {
                TH: 'American Thoracic Society / IDSA',
                EN: 'American Thoracic Society / IDSA'
            },
            year: '2023',
            type: {
                TH: 'แนวทางเฉพาะโรค',
                EN: 'Disease-Specific Guidelines'
            },
            url: 'https://www.thoracic.org',
            description: {
                TH: 'แนวทางการรักษาโรคปอดบวมจากเชื้อในชุมชน รวมถึงการเลือกใช้ยาปฏิชีวนะ',
                EN: 'Guidelines for treating community-acquired pneumonia including antibiotic selection'
            }
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BookOpen size={32} />
                        <div>
                            <h2 className="text-2xl font-bold">
                                {language === 'TH' ? 'ข้อมูลอ้างอิง' : 'Reference Data'}
                            </h2>
                            <p className="text-blue-100 text-sm">
                                {language === 'TH'
                                    ? 'แหล่งข้อมูลและแนวทางทางการแพทย์ที่ใช้อ้างอิง'
                                    : 'Medical references and guidelines used in this system'}
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
                        {references.map((ref) => (
                            <div
                                key={ref.id}
                                className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-[1.02] group"
                            >
                                {/* Type Badge */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                                        {ref.type[language]}
                                    </span>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <Calendar size={14} />
                                        <span>{ref.year}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                    {ref.title[language]}
                                </h3>

                                {/* Organization */}
                                <div className="flex items-start gap-2 text-gray-600 mb-3">
                                    <Users size={16} className="mt-1 flex-shrink-0" />
                                    <span className="text-sm">{ref.organization[language]}</span>
                                </div>

                                {/* Description */}
                                <div className="flex items-start gap-2 text-gray-700 mb-4">
                                    <FileText size={16} className="mt-1 flex-shrink-0" />
                                    <p className="text-sm line-clamp-3">{ref.description[language]}</p>
                                </div>

                                {/* Link */}
                                <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all"
                                >
                                    <span>{language === 'TH' ? 'เยี่ยมชมเว็บไซต์' : 'Visit Website'}</span>
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            {language === 'TH'
                                ? '⚠️ หมายเหตุ: ข้อมูลอ้างอิงเหล่านี้ใช้เป็นแนวทางในการพัฒนาระบบ ผู้ใช้งานควรปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อการวินิจฉัยและรักษาที่ถูกต้อง'
                                : '⚠️ Note: These references are used as guidelines for system development. Users should consult qualified physicians for proper diagnosis and treatment'}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                        {language === 'TH' ? 'ปิด' : 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
}
