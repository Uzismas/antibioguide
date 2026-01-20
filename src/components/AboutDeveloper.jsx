import { User, X, Mail, Phone, Briefcase, Users as UsersIcon } from 'lucide-react';

export default function AboutDeveloper({ language, onClose }) {
    const developers = [
        {
            id: 1,
            name: {
                TH: 'นายปภังกร ตราชู',
                EN: 'Mr. Papangkron Trachu'
            },
            phone: '086-315-9211',
            email: 'Papangkron.p6@gmail.com',
            role: {
                TH: 'IT Developer and Design',
                EN: 'IT Developer and Design'
            },
            color: 'blue'
        },
        {
            id: 2,
            name: {
                TH: 'นางสาวมินท์ธิตา ภักดีรัฐโรจน์',
                EN: 'Miss Minthita Phakdeeratrot'
            },
            phone: '092-727-2152',
            email: 'minthita152@gmail.com',
            role: {
                TH: 'Design, Thinking and Research',
                EN: 'Design, Thinking and Research'
            },
            color: 'purple'
        },
        {
            id: 3,
            name: {
                TH: 'นางสาวอัมพิกา เมืองโคตร',
                EN: 'Miss Ampika Muangkot'
            },
            phone: '064-620-1726',
            email: 'ampikamuangkot@gmail.com',
            role: {
                TH: 'Thinking, Recheck and Research',
                EN: 'Thinking, Recheck and Research'
            },
            color: 'pink'
        },
        {
            id: 4,
            name: {
                TH: 'นางสาวศศิทา พรายจิตร์',
                EN: 'Miss Sasita Prayajit'
            },
            phone: '095-307-7043',
            email: 'Chomp7059@gmail.com',
            role: {
                TH: 'Design, Research and Recheck',
                EN: 'Design, Research and Recheck'
            },
            color: 'green'
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: 'from-blue-500 to-blue-600',
                border: 'border-blue-200',
                cardBg: 'to-blue-50',
                iconBg: 'bg-blue-100',
                iconText: 'text-blue-600'
            },
            purple: {
                bg: 'from-purple-500 to-purple-600',
                border: 'border-purple-200',
                cardBg: 'to-purple-50',
                iconBg: 'bg-purple-100',
                iconText: 'text-purple-600'
            },
            pink: {
                bg: 'from-pink-500 to-pink-600',
                border: 'border-pink-200',
                cardBg: 'to-pink-50',
                iconBg: 'bg-pink-100',
                iconText: 'text-pink-600'
            },
            green: {
                bg: 'from-green-500 to-green-600',
                border: 'border-green-200',
                cardBg: 'to-green-50',
                iconBg: 'bg-green-100',
                iconText: 'text-green-600'
            }
        };
        return colors[color];
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <UsersIcon size={32} />
                        <div>
                            <h2 className="text-2xl font-bold">
                                {language === 'TH' ? 'ผู้จัดทำ' : 'Development Team'}
                            </h2>
                            <p className="text-indigo-100 text-sm">
                                {language === 'TH'
                                    ? 'ทีมพัฒนาระบบ AntiBioguide'
                                    : 'AntiBioguide Development Team'}
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
                    {/* Team Introduction */}
                    <div className="mb-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {language === 'TH' ? 'ทีมงานของเรา' : 'Our Team'}
                        </h3>
                        <p className="text-gray-600">
                            {language === 'TH'
                                ? 'ทีมพัฒนาระบบสนับสนุนการตัดสินใจในการใช้ยาปฏิชีวนะ'
                                : 'Development team for Antibiotic Decision Support System'}
                        </p>
                    </div>

                    {/* Developer Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {developers.map((dev) => {
                            const colors = getColorClasses(dev.color);
                            return (
                                <div
                                    key={dev.id}
                                    className={`bg-gradient-to-br from-white ${colors.cardBg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-xl transition-all hover:scale-[1.02] group`}
                                >
                                    {/* Avatar and Name */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0`}>
                                            {dev.id}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {dev.name[language]}
                                            </h3>
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 ${colors.iconBg} rounded-full`}>
                                                <Briefcase size={14} className={colors.iconText} />
                                                <span className={`text-sm font-medium ${colors.iconText}`}>
                                                    {dev.role[language]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="space-y-3 bg-white rounded-lg p-4 border border-gray-100">
                                        {/* Phone */}
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <Phone size={16} className={colors.iconText} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    {language === 'TH' ? 'เบอร์โทรศัพท์' : 'Phone'}
                                                </p>
                                                <a
                                                    href={`tel:${dev.phone.replace(/-/g, '')}`}
                                                    className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                                >
                                                    {dev.phone}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <Mail size={16} className={colors.iconText} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    {language === 'TH' ? 'อีเมล' : 'Email'}
                                                </p>
                                                <a
                                                    href={`mailto:${dev.email}`}
                                                    className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors break-all"
                                                >
                                                    {dev.email}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Role Description */}
                                        <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
                                            <div className={`w-8 h-8 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <User size={16} className={colors.iconText} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    {language === 'TH' ? 'หน้าที่รับผิดชอบ' : 'Responsibilities'}
                                                </p>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {dev.role[language]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Project Information */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl">
                        <h4 className="font-bold text-indigo-900 mb-3 text-lg">
                            {language === 'TH' ? '📋 เกี่ยวกับโครงการ' : '📋 About This Project'}
                        </h4>
                        <p className="text-gray-700 mb-3">
                            {language === 'TH'
                                ? 'AntiBioguide เป็นระบบสนับสนุนการตัดสินใจในการใช้ยาปฏิชีวนะ พัฒนาขึ้นเพื่อช่วยประเมินความจำเป็นในการใช้ยาปฏิชีวนะและลดปัญหาการดื้อยา'
                                : 'AntiBioguide is an Antibiotic Decision Support System developed to help assess the necessity of antibiotic use and reduce antimicrobial resistance'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
                                React + Vite
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
                                Tailwind CSS
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
                                Bilingual (TH/EN)
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
                                Medical AI
                            </span>
                        </div>
                    </div>

                    {/* Thank You Note */}
                    <div className="mt-6 text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg">
                        <p className="text-gray-700 font-medium">
                            {language === 'TH'
                                ? '🙏 ขอบคุณที่ใช้งานระบบ AntiBioguide'
                                : '🙏 Thank you for using AntiBioguide'}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                        {language === 'TH' ? 'ปิด' : 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
}
