import React, { useState } from "react";
import "./TypingArea.css";

function TypingArea() {
  const [codeToType] = useState("const hello = 'Hello, world!';");
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const renderCode = () => {
    return codeToType.split("").map((char, index) => {
      let color;
      let bgColor;
      if (index < userInput.length) {
        if (userInput[index] === char) {
          color = "green";
        } else {
          bgColor = "red"; // 틀린 글자 배경 빨간색
        }
      }
      return (
        <span
          key={index}
          style={{
            backgroundColor: bgColor,
            color: color,
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-area">
      <h2>타자 연습</h2>
      <div className="code-container">{renderCode()}</div>
      <textarea
        placeholder="코드를 따라 입력하세요"
        value={userInput}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default TypingArea;
