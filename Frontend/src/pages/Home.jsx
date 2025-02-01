import SurpriseTest from "../components/SurpriseTest.jsx";
import QuizSection from "../components/QuizSection.jsx";
import Chatbot from "../components/Chatbot.jsx";
import Tutorial from "../components/Tutorial.jsx"; 

const Home = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Header Section */}
      <header className="text-center text-4xl font-bold text-blue-700 mb-6">
        Welcome to AI Python Tutor! 🐍💡
      </header>

      {/* Description Section */}
      <section className="bg-white p-6 rounded-lg shadow-md text-gray-700 text-lg mb-6">
        <p>
          AI Python Tutor is designed to help children learn Python interactively! 
          Our AI-powered chatbot guides kids through Python concepts with simple explanations, 
          fun quizzes, and surprise tests to make learning engaging and effective. 🚀
        </p>
      </section>

      {/* AI Chatbot Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">👩‍💻 Chat with Your AI Tutor</h2>
        <Chatbot />
      </section>

      {/* Surprise Test Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-3">🎲 Surprise Test</h2>
        <SurpriseTest />
      </section>

      {/* Quiz Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-purple-600 mb-3">📝 Python Quiz</h2>
        <QuizSection />
      </section>

      {/* Tutorial Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-3">🎥 Python Tutorials</h2>
        <Tutorial /> {}
      </section>
    </div>
  );
};

export default Home;
