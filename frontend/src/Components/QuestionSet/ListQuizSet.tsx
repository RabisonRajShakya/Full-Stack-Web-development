import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/questions/set/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data?.questionSet);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 flex items-center justify-center">
        <p className="text-white text-xl font-semibold bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
          Loading...
        </p>
      </div>
    );
  }
  
  if (questionSets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 flex items-center justify-center">
        <p className="text-white text-xl font-semibold bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
          No question sets found.
        </p>
      </div>
    );
  }

  // Color combinations inspired by the screenshot
  const cardColors = [
    { bg: 'from-orange-400 to-red-500', circle: 'bg-orange-500' },
    { bg: 'from-emerald-400 to-teal-500', circle: 'bg-emerald-500' },
    { bg: 'from-pink-400 to-purple-500', circle: 'bg-pink-500' },
    { bg: 'from-blue-400 to-indigo-500', circle: 'bg-blue-500' },
    { bg: 'from-yellow-400 to-orange-500', circle: 'bg-yellow-500' },
    { bg: 'from-cyan-400 to-blue-500', circle: 'bg-cyan-500' }
  ];

  // Quiz logo image
  const quizLogoUrl = "http://plus.unsplash.com/premium_photo-1669077046862-9283191f4ed7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 text-center mb-16 drop-shadow-2xl">
          ✨ My Question Sets ✨
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {questionSets.map((question, index) => {
            const TakeQuizHandler = () => {
              Navigate(`/questionset/${question._id}/attempt`);
            };
            
            const colorScheme = cardColors[index % cardColors.length];
            
            return (
              <li 
                key={question._id} 
                className="relative bg-white/15 backdrop-blur-xl rounded-3xl border-2 border-white/30 p-8 hover:bg-white/25 transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)] group overflow-hidden"
                style={{ display: "flex", gap: "1rem", flexDirection: "column", alignItems: "center", textAlign: "center" }}
              >
                {/* Sparkle effects */}
                <div className="absolute top-4 right-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</div>
                <div className="absolute bottom-4 left-4 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">💫</div>
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quiz Logo */}
                <div className="relative w-20 h-20 mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src={quizLogoUrl}
                    alt="Quiz Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                </div>
                
                <div className="flex-1 relative z-10">
                  <p className="text-white mb-6">
                    <strong className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 group-hover:from-yellow-100 group-hover:to-pink-100 transition-all duration-500 block mb-3">
                      {question.title}
                    </strong>
                    <span className="text-xl text-white/90 group-hover:text-yellow-200 transition-colors duration-500 font-semibold">
                      — {question.questionCount} questions
                    </span>
                  </p>
                </div>
                
                <button 
                  onClick={TakeQuizHandler}
                  className={`relative overflow-hidden w-full bg-gradient-to-r ${colorScheme.bg} hover:shadow-2xl text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95`}
                >
                  <span className="relative z-10">🚀 Take Quiz</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ListQuestionSet;