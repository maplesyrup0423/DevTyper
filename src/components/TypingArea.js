import React, { useState, useEffect, useRef } from "react";
import "./TypingArea.css";

function TypingArea() {
  const [userInput, setUserInput] = useState("");
  const [fileLink, setFileLink] = useState(""); // 파일 출처 링크
  const [codeToType, setCodeToType] = useState(""); // 따라칠 텍스트
  const [isFinished, setIsFinished] = useState(false); // 타이핑 완료 여부
  const [currentTime, setCurrentTime] = useState(0); // 현재 타이머 값
  const [startTime, setStartTime] = useState(null); // 타이머 시작 시간
  const timerRef = useRef(null); // useRef로 타이머 변수 선언
  const [accuracy, setAccuracy] = useState(0); // 정확도
  const [wpm, setWpm] = useState(0); // WPM (타자 속도)

  // GitHub API에서 lodash 레포지토리의 .js 파일을 가져오는 함수
  const fetchJSFilesFromGithub = async () => {
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    try {
      const repo = "lodash/lodash"; // 특정 레포지토리
      const query = "extension:js"; // .js 파일 검색 쿼리
      const response = await fetch(
        `https://api.github.com/search/code?q=${query}+repo:${repo}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`, // 토큰을 인증 헤더에 추가
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      if (data.items.length > 0) {
        const randomItem =
          data.items[Math.floor(Math.random() * data.items.length)];
        fetchCodeSnippet(randomItem); // 랜덤 파일의 코드 스니펫 가져오기
      } else {
        console.log("크기가 적합한 파일이 없습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error.message);
    }
  };

  // GitHub에서 특정 파일의 코드 스니펫을 가져오는 함수
  const fetchCodeSnippet = async (item) => {
    try {
      const response = await fetch(item.url, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`, // 토큰을 인증 헤더에 추가
        },
      });

      if (!response.ok) {
        throw new Error(`코드 스니펫 요청 실패: ${response.status}`);
      }

      const codeData = await response.json();

      // Base64로 인코딩된 코드가 있는지 확인
      if (codeData.content) {
        // Base64 디코딩을 시도합니다.
        try {
          const decodedContent = atob(codeData.content); // Base64로 인코딩된 코드를 디코딩

          // 함수만 필터링하는 로직
          const functionRegex = /function\s+\w+\s*\(.*?\)\s*{[^}]*}/g; // 함수 정의를 찾는 정규 표현식
          const functions = decodedContent.match(functionRegex) || []; // 일치하는 함수들을 배열로 가져옴

          if (functions.length > 0) {
            // 랜덤으로 하나의 함수 선택
            const randomFunction =
              functions[Math.floor(Math.random() * functions.length)];
            setCodeToType(randomFunction); // 선택한 함수 설정
            setFileLink(item.html_url); // 파일 출처 링크 설정
          } else {
            console.log("파일에 함수가 없습니다. 다시 시도합니다.");
            fetchJSFilesFromGithub(); // 함수가 없으면 다시 파일을 가져옵니다.
          }
        } catch (decodeError) {
          console.error("Base64 디코딩 에러:", decodeError.message);
        }
      } else {
        console.log("코드 콘텐츠가 없습니다.");
      }
    } catch (error) {
      console.error("코드 스니펫 에러:", error.message);
    }
  };
  useEffect(() => {
    fetchJSFilesFromGithub(); // 컴포넌트가 처음 렌더링될 때 .js 파일을 가져옵니다.
  }, []);
  /******************************************************************** */
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);
    if (!startTime) {
      setStartTime(new Date().getTime()); // 첫 입력 시 타이머 시작
    }
  };

  // 타이핑 완료 및 정확도, WPM 계산
  useEffect(() => {
    const cleanedCodeToType = codeToType.replace(/\s+/g, " ").trim();

    if (userInput.length >= cleanedCodeToType.length && userInput.length > 0) {
      const endTime = new Date().getTime();
      setIsFinished(true);

      const timeTaken = (endTime - startTime) / 1000 / 60; // 분 단위 시간
      const correctChars = userInput
        .split("")
        .filter((char, index) => char === cleanedCodeToType[index]).length;

      // 정확도 계산
      setAccuracy(((correctChars / cleanedCodeToType.length) * 100).toFixed(2));

      // 총 입력한 글자 수 기준 WPM 계산
      setWpm((userInput.length / 5 / timeTaken).toFixed(2)); // 5글자 = 1 단어 기준
    }
  }, [userInput, codeToType, startTime]);
  /******************************************************************** */
  const renderCode = () => {
    const cleanedCodeToType = codeToType.replace(/\s+/g, " ");

    return [...cleanedCodeToType].map((char, index) => {
      let bgColor;
      let color;

      if (index < userInput.length) {
        if (userInput[index] === char) {
          color = "green";
        } else {
          bgColor = "red";
        }
      }

      if (index === userInput.length) {
        bgColor = "gray";
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
  /******************************************************************** */
  const handleKeyDown = (e) => {
    // Tab 키 입력 시 공백 추가
    if (e.key === "Tab") {
      e.preventDefault();
      setUserInput((prevInput) => prevInput + " ");
    }

    // Enter 키 입력 시 공백 추가
    if (e.key === "Enter") {
      e.preventDefault();
      setUserInput((prevInput) => prevInput + " ");
    }
  };

  /******************************************************************** */
  useEffect(() => {
    // 타이머가 작동 중일 때
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const updatedTime = (parseFloat(prevTime) || 0) + 0.1; // prevTime이 숫자가 아닐 경우 기본값 0
          return updatedTime.toFixed(1); // 소수점 한 자리까지 표시
        });
      }, 100); // 0.1초마다 업데이트
    }

    return () => clearInterval(timerRef.current);
  }, [startTime, isFinished]);
  /******************************************************************** */

  return (
    <div className="typing-area">
      <h2>타자 연습</h2>
      <div className="code-container">{renderCode()}</div>
      <textarea
        placeholder="코드를 따라 입력하세요"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete="off" // 자동 완성 비활성화
        spellCheck="false" // 맞춤법 검사 비활성화
        disabled={isFinished}
      />
      <div>
        <p>소요 시간: {currentTime} 초</p>
        {isFinished && (
          <>
            <p>타이핑 완료!</p> <p>정확도: {accuracy}%</p>
            <p>속도: {wpm} WPM</p>
          </>
        )}
      </div>
    </div>
  );
}

export default TypingArea;
