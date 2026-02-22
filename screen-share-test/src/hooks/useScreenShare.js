import { useState, useRef, useCallback, useEffect } from "react";

export function useScreenShare() {
  const [status, setStatus] = useState("idle");
  const [errorType, setErrorType] = useState(null);
  const [stream, setStream] = useState(null);
  const [settings, setSettings] = useState(null);

  const videoRef = useRef(null);

  const cleanup = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStream(null);
  }, [stream]);

  const startScreenShare = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setErrorType("unsupported");
      setStatus("error");
      return;
    }

    try {
      setStatus("requesting");

      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      const track = mediaStream.getVideoTracks()[0];
      const trackSettings = track.getSettings();

      track.onended = () => {
        cleanup();
        setStatus("ended");
      };

      setSettings(trackSettings);
      setStream(mediaStream);
      setStatus("active");
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setErrorType("denied");
      } else if (err.name === "AbortError") {
        setErrorType("cancelled");
      } else {
        setErrorType("unknown");
      }
      setStatus("error");
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play().catch(err => {
          console.error("Play error:", err);
        });
      };
    }
  }, [stream]);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    status,
    errorType,
    videoRef,
    settings,
    startScreenShare,
  };
}