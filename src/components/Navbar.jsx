import { BookOpen, HelpCircle, User, Globe } from 'lucide-react';

export default function Navbar({ language, toggleLanguage, translations, onOpenReference, onOpenInstruction, onOpenAbout }) {
    const navItems = [
        { icon: BookOpen, label: translations.referenceData, key: 'reference', onClick: onOpenReference },
        { icon: HelpCircle, label: translations.instruction, key: 'instruction', onClick: onOpenInstruction },
        { icon: User, label: translations.aboutDeveloper, key: 'about', onClick: onOpenAbout },
    ];

    return (
        <nav className="fixed top-0 right-0 z-50 p-6">
            <div className="flex items-center gap-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.key}
                            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
                            onClick={item.onClick}
                        >
                            <Icon size={20} />
                            <span className="font-medium hidden md:inline">{item.label}</span>
                        </button>
                    );
                })}

                {/* Language Switcher */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
                >
                    <Globe size={20} />
                    <span className="font-medium">{language}</span>
                </button>
            </div>
        </nav>
    );
}
