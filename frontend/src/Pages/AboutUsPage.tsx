
function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center">
            <div className="text-center px-8">
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 animate-pulse">
                    Welcome About
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
                    This is your beautiful AboutUsPage
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105">
                        Get Started
                    </button>
                    <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full text-white font-semibold hover:from-pink-600 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow-lg">
                        Learn More
                    </button>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 mx-auto"></div>
                        <h3 className="text-xl font-semibold text-white mb-2">Fast</h3>
                        <p className="text-blue-100">
                            Lightning fast performance and responsive design
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4 mx-auto"></div>
                        <h3 className="text-xl font-semibold text-white mb-2">Modern</h3>
                        <p className="text-blue-100">
                            Built with the latest technologies and best practices
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-4 mx-auto"></div>
                        <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
                        <p className="text-blue-100">
                            Your data is protected with enterprise-grade security
                        </p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AboutUsPage;
