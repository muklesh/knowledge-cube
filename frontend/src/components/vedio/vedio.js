import React, { useState, useRef, useEffect } from "react";
import styles from "./vedio.module.css";

const VideoModal = ({ videoUrl, onClose, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Check if the video has ended periodically (e.g., every second)
      const checkVideoEndInterval = setInterval(() => {
        if (videoElement.ended) {
          setIsVideoEnded(true);
          clearInterval(checkVideoEndInterval);
        }
      }, 1000);

      // Clear the interval and call the onVideoEnd callback
      if (isVideoEnded) {
        clearInterval(checkVideoEndInterval);
        onVideoEnd();
      }

      return () => {
        clearInterval(checkVideoEndInterval);
      };
    }
  }, [videoRef, isVideoEnded, onVideoEnd]);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <video ref={videoRef} width="800" height="600" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
