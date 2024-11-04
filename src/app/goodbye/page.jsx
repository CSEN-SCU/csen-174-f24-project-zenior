export default function Goodbye() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
        <h1 className="text-4xl font-bold mb-4">Goodbye!</h1>
        <p className="text-lg">You have successfully logged out. We hope to see you again soon!</p>
        <a href="/" className="mt-6 px-4 py-2 bg-[#b30738] text-white rounded hover:bg-[#9e1b32] transition-colors">
          Go to Home
        </a>
      </div>
    );
  }
  