import React, { useState, useEffect } from "react";

const TypeWriter = ({ data, typingSpeed = 200, wordDelay = 2000,cursor=true }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(typingSpeed);
  const [cursorVisible, setCursorVisible] = useState(true); // State for cursor visibility

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % data.length;
      const fullTxt = data[i];

      if (isDeleting) {
        setText((prev) => fullTxt.substring(0, prev.length - 1));
        setCurrentSpeed(typingSpeed / 2); // Faster deleting
      } else {
        setText((prev) => fullTxt.substring(0, prev.length + 1));
        setCurrentSpeed(typingSpeed - Math.random() * 50); // Add randomness to typing speed
      }

      if (!isDeleting && text === fullTxt) {
        setCurrentSpeed(wordDelay); // Pause at full word
        setIsDeleting(true);
        setCursorVisible(false); // Hide cursor after word is typed
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setCurrentSpeed(500); // Pause before starting a new word
        setCursorVisible(true); // Show cursor before starting next word
      }
    };

    const timer = setTimeout(handleTyping, currentSpeed);

    // Toggle cursor visibility every 500ms for smoother effect
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorTimer); // Clean up cursor timer
    };
  }, [text, isDeleting, loopNum, data, typingSpeed, wordDelay, currentSpeed]);

  return (
    <span>
      {text}
      {cursor && cursorVisible && "|"} {/* Display cursor at the end of the word */}
    </span>
  );
};

export default TypeWriter;
