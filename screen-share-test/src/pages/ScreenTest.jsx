import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useScreenShare } from "../hooks/useScreenShare";

function ScreenTest() {
  const navigate = useNavigate();
  const {
    status,
    errorType,
    videoRef,
    settings,
    startScreenShare,
  } = useScreenShare();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10">

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 text-center">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Screen Sharing Test
        </h2>

        {status === "idle" && (
          <div className="space-y-6">
            <p className="text-gray-300">
              Start a screen sharing session to preview your display.
            </p>

            <Button onClick={startScreenShare}>
              Start Screen Sharing
            </Button>
          </div>
        )}

        {status === "requesting" && (
          <div className="space-y-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-yellow-400 font-medium">
              Waiting for screen selection...
            </p>
            <p className="text-gray-400 text-sm">
              Please select a screen, window, or tab to continue.
            </p>
          </div>
        )}

        {status === "active" && (
          <div className="space-y-6">

            <div className="inline-block px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
              Screen Stream Active
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-h-[500px] object-contain bg-black"
              />
            </div>

            {settings && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300 mt-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">Resolution</p>
                  <p className="font-semibold">
                    {settings.width} × {settings.height}
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">Frame Rate</p>
                  <p className="font-semibold">
                    {settings.frameRate || "N/A"} fps
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">Display Surface</p>
                  <p className="font-semibold capitalize">
                    {settings.displaySurface || "Unknown"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
              {errorType === "denied" && "Permission denied by user."}
              {errorType === "cancelled" && "Screen selection was cancelled."}
              {errorType === "unsupported" && "Screen sharing not supported in this browser."}
              {errorType === "unknown" && "An unexpected error occurred."}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={startScreenShare}>
                Try Again
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}

        {status === "ended" && (
          <div className="space-y-6">
            <div className="px-4 py-2 rounded-full bg-gray-500/20 text-gray-300 inline-block">
              Screen Sharing Stopped
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={startScreenShare}>
                Retry Screen Test
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScreenTest;