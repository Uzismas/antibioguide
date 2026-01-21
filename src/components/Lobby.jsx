import { Activity, ArrowRight } from 'lucide-react';

export default function Lobby({ translations, onStartAssessment }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                backgroundImage: 'url(/antibioguide/medical-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* White overlay with 85% opacity */}
            <div className="absolute inset-0 bg-white/85"></div>

            {/* Center Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
                {/* Logo Placeholder */}
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                        <Activity size={48} className="text-white" strokeWidth={2.5} />
                    </div>
                </div>

                {/* App Title */}
                <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                    {translations.appTitle}
                </h1>

                {/* Subtitle */}
                <p className="text-2xl text-gray-600 mb-12 font-light">
                    {translations.appSubtitle}
                </p>

                {/* Start Assessment Button */}
                <button
                    onClick={onStartAssessment}
                    className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800"
                >
                    <span>{translations.startAssessment}</span>
                    <ArrowRight
                        size={24}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </button>

                {/* Decorative Elements */}
                <div className="mt-16 flex justify-center gap-8 text-gray-500">
                    <div className="text-center">
                        <div className="text-3xl font-bold flex items-center justify-center">
                            <span className="text-pink-400">S</span>
                            <span className="text-blue-400">K</span>
                            <span className="text-pink-400">P</span>
                            <span className="text-blue-400">3</span>
                            <span className="text-pink-400">0</span>
                        </div>
                        <div className="text-sm mt-1">Powered</div>
                    </div>
                    <div className="w-px bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm mt-1">Available</div>
                    </div>
                    <div className="w-px bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">100%</div>
                        <div className="text-sm mt-1">Easy to use</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
