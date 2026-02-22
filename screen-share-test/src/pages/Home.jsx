import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setIsSupported(false);
    }
  }, []);

  const handleStart = () => {
    if (!isSupported) return;
    navigate("/screen-test");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 text-center">

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Screen Share Test App
        </h1>

        <p className="text-gray-300 text-sm sm:text-base mb-8 leading-relaxed">
          Test your browser’s screen sharing capability with real-time preview,
          permission handling, and stream lifecycle validation.
        </p>

        {!isSupported && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            Your browser does not support screen sharing.
            Please use the latest version of Chrome or Edge.
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={handleStart}
            disabled={!isSupported}
          >
            Start Screen Test
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          Supported Browsers: Chrome & Edge
        </p>
      </div>
    </div>
  );
}

export default Home;