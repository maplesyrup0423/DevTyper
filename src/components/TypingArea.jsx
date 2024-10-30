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
  const [isPaused, setIsPaused] = useState(false); // 일시 정지 상태
  const textareaRef = useRef(null); // textarea 참조 추가
  const [selectedPattern, setSelectedPattern] = useState("function"); // 기본값을 "function"으로 설정
  const [isFetching, setIsFetching] = useState(false); // API 요청 중 여부
  const fetchDelay = 2000; // 요청 간격 (2초)
  const [typingRecords, setTypingRecords] = useState([]); //로컬 스토리지에서 기록
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가

  // GitHub API에서 여러 레포지토리의 .js 파일을 가져오는 함수
  const fetchJSFilesFromGithub = async (retryCount = 3) => {
    if (isFetching) return; // 이미 요청 중이라면 중단

    setIsFetching(true); // 요청 시작
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
    const repositories = [
      "lodash/lodash", // Lodash 레포지토리
      "axios/axios", // Axios 레포지토리
      "facebook/react", // React 레포지토리
      "ramda/ramda", // Ramda 레포지토리
      "jquery/jquery", // jQuery 레포지토리
      "mrdoob/three.js", // Three.js 레포지토리
      "d3/d3", // D3.js 레포지토리
      "chartjs/Chart.js", // Chart.js 레포지토리
      "expressjs/express", // Express 레포지토리
      "angular/angular", // Angular 레포지토리
      "vuejs/vue", // Vue.js 레포지토리
      "airbnb/lottie-web", // Lottie-web 레포지토리
      "vercel/next.js", // Next.js 레포지토리
      "socketio/socket.io", // Socket.IO 레포지토리
    ];
    const randomRepo =
      repositories[Math.floor(Math.random() * repositories.length)];
    console.log("randomRepo : ", randomRepo);
    const query = "extension:js"; // .js 파일 검색 쿼리

    try {
      const response = await fetch(
        `https://api.github.com/search/code?q=${query}+repo:${randomRepo}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`, // 토큰을 인증 헤더에 추가
          },
        }
      );
      if (!response.ok) {
        console.log(`${randomRepo}의 GitHub API 요청 실패: ${response.status}`);
        if (response.status === 403) {
          console.error("API 요청이 금지되었습니다. 잠시 후 다시 시도합니다.");
          return; // 403 오류가 발생했을 때 더 이상 요청하지 않음
        }
        return; // 요청 실패 시 함수 종료
      }

      const data = await response.json();
      if (data.items.length > 0) {
        const randomItem =
          data.items[Math.floor(Math.random() * data.items.length)];
        console.log("randomItem : ", randomItem);
        await fetchCodeSnippet(randomItem); // 랜덤 파일의 코드 스니펫 가져오기
      } else {
        console.log(`${randomRepo}에 적합한 파일이 없습니다.`);
        if (retryCount > 0) {
          console.log("재시도 중...");
          await new Promise((resolve) => setTimeout(resolve, fetchDelay)); // 2초 대기 후 재시도
          await fetchJSFilesFromGithub(retryCount - 1);
        }
      }
    } catch (error) {
      console.error("에러 발생:", error.message);
    } finally {
      setIsFetching(false); // 요청 완료 후 상태 리셋
    }
  };
  // GitHub에서 특정 파일의 코드 스니펫을 가져오는 함수
  const fetchCodeSnippet = async (item) => {
    if (isFetching) return; // 이미 요청 중이라면 중단
    setIsFetching(true); // 요청 시작
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
        try {
          const decodedContent = atob(codeData.content); // Base64로 인코딩된 코드를 디코딩

          // 정규 표현식 패턴 정의
          const regexPatterns = {
            function: /function\s+\w+\s*\(.*?\)\s*{[^}]*}/g,
            class: /class\s+\w+\s*{[^}]*}/g,
            arrow: /\w+\s*=\s*\(.*?\)\s*=>\s*{[^}]*}/g,
            async: /async\s+function\s+\w+\s*\(.*?\)\s*{[^}]*}/g,
            loop: /\b(for|while)\s*\(.*?\)\s*{[^}]*}/g,
            conditional: /\b(if|switch)\s*\(.*?\)\s*{[^}]*}/g,
            object: /const\s+\w+\s*=\s*{[^}]*}/g,
          };

          // 모든 패턴에 대해 독립적인 allMatches 배열을 사용
          const allMatches = []; // 여기를 루프 외부에서 정의함

          // 각 패턴에 대해 반복
          for (const [key, pattern] of Object.entries(regexPatterns)) {
            const matches = decodedContent.match(pattern) || [];

            // 각 패턴에 대해 중첩된 블록을 추출
            matches.forEach((match) => {
              const nestedBlocks = extractNestedBlocks(match);
              allMatches.push(...nestedBlocks); // 중첩된 블록을 allMatches에 추가
            });
          }

          if (allMatches.length > 0) {
            console.log("allMatches : ", allMatches);
            // 랜덤으로 하나의 코드 조각 선택
            const randomSnippet =
              allMatches[Math.floor(Math.random() * allMatches.length)];
            setCodeToType(randomSnippet); // 선택한 코드 조각 설정
            setFileLink(item.html_url); // 파일 출처 링크 설정
          } else {
            console.log("파일에 코드 조각이 없습니다. 다시 시도합니다.");
            setTimeout(() => {
              setIsFetching(false); // 요청 완료 후 상태 리셋
              fetchJSFilesFromGithub(); // 코드 조각이 없으면 다시 파일을 가져옵니다.
            }, fetchDelay);
          }
        } catch (decodeError) {
          console.error("Base64 디코딩 에러:", decodeError.message);
          setIsFetching(false); // 요청 완료 후 상태 리셋
        }
      } else {
        console.log("코드 콘텐츠가 없습니다.");
        setIsFetching(false); // 요청 완료 후 상태 리셋
      }
    } catch (error) {
      console.error("코드 스니펫 에러:", error.message);
      setIsFetching(false); // 요청 완료 후 상태 리셋
    }
  };

  // 중첩된 중괄호를 처리하는 함수
  const extractNestedBlocks = (code) => {
    const blocks = []; // 추출된 블록을 저장할 배열
    const stack = []; // 중괄호를 추적할 스택
    let currentBlock = ""; // 현재 블록을 저장할 변수

    for (let char of code) {
      currentBlock += char; // 현재 블록에 문자 추가

      if (char === "{") {
        stack.push(char); // 열린 중괄호를 스택에 추가
      } else if (char === "}") {
        stack.pop(); // 닫힌 중괄호는 스택에서 제거

        // 모든 중괄호가 닫혔다면
        if (stack.length === 0) {
          blocks.push(currentBlock); // 완전한 블록을 배열에 추가
          currentBlock = ""; // 현재 블록 초기화
        }
      }
    }

    return blocks; // 추출된 블록 반환
  };
  //컴포넌트가 마운트될 때 로컬 스토리지에서 기록을 불러옴
  useEffect(() => {
    fetchJSFilesFromGithub(); // 컴포넌트가 처음 렌더링될 때 .js 파일을 가져옵니다.
    const storedRecords =
      JSON.parse(localStorage.getItem("typingRecords")) || [];
    setTypingRecords(storedRecords);
  }, []);
  /******************************************************************** */
  useEffect(() => {
    if (isFinished) {
      const storedRecords =
        JSON.parse(localStorage.getItem("typingRecords")) || [];
      setTypingRecords(storedRecords); // 갱신된 기록 설정
    }
  }, [isFinished]);
  /******************************************************************** */
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);
    if (!startTime) {
      setStartTime(new Date().getTime()); // 첫 입력 시 타이머 시작
    }

    autoResizeTextarea();
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
      const accuracy = (
        (correctChars / cleanedCodeToType.length) *
        100
      ).toFixed(2);
      setAccuracy(accuracy);

      // 총 입력한 글자 수 기준 WPM 계산
      const wpm = (userInput.length / 5 / (timeTaken / 60)).toFixed(2); // 5글자 = 1 단어 기준
      setWpm(wpm);

      // 기록을 로컬 스토리지에 저장
      saveTypingRecord(timeTaken.toFixed(1), accuracy, wpm);

      // 타이핑 완료 시 모달 열기
      setIsModalOpen(true);
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
    if (isPaused) {
      clearInterval(timerRef.current); // 일시 정지 상태일 때 타이머 멈춤
      return; // 아무 것도 하지 않음
    }

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
  }, [startTime, isFinished, isPaused]);
  const togglePause = () => {
    setIsPaused((prev) => !prev); // 일시 정지 상태 토글
  };
  /******************************************************************** */
  const refreshCodeSnippet = () => {
    setUserInput(""); // 텍스트 영역 초기화
    setIsFinished(false); // 타이핑 완료 상태 초기화
    setCurrentTime(0); // 타이머 초기화
    setStartTime(null); // 타이머 시작 시간 초기화
    fetchJSFilesFromGithub(); // 새로고침 시 새로운 코드 스니펫을 가져옴
    autoResizeTextarea();
  };
  /******************************************************************** */
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 콘텐츠 높이에 맞게 조정
    }
  };
  /******************************************************************** */
  const saveTypingRecord = (time, accuracy, wpm) => {
    const completedAt = new Date().toLocaleString(); // 완료된 시간
    const record = { completedAt, time, accuracy, wpm };

    // 기존 기록을 가져와 배열로 저장하거나 빈 배열로 초기화
    const storedRecords =
      JSON.parse(localStorage.getItem("typingRecords")) || [];
    storedRecords.push(record);

    // 로컬 스토리지에 갱신된 기록 저장
    localStorage.setItem("typingRecords", JSON.stringify(storedRecords));
  };
  /******************************************************************** */

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기 함수
  };
  /******************************************************************** */
  return (
    <>
      <div className="typing-area">
        <h2>타자 연습</h2>
        <div className="refreshCodeSnippet">
          {fileLink && (
            <span>
              <a href={fileLink} target="_blank" rel="noopener noreferrer">
                코드 출처
              </a>
            </span>
          )}
          <button onClick={refreshCodeSnippet}>새로고침</button>
        </div>

        <div className="code-container">{renderCode()}</div>
        <textarea
          placeholder="코드를 따라 입력하세요"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off" // 자동 완성 비활성화
          spellCheck="false" // 맞춤법 검사 비활성화
          disabled={isPaused || isFinished}
          ref={textareaRef}
        />
        <div className="footer">
          {!isFinished && currentTime > 0 && (
            <>
              <div>
                <p>소요 시간: {currentTime} 초</p>
              </div>
              <button onClick={togglePause}>
                {isPaused ? "타이머 시작" : "타이머 일시 정지"}
              </button>
            </>
          )}
        </div>
      </div>
      {/* 저장된 기록 표시 */}
      <div className="typing-records">
        <h3>타자 연습 기록</h3>
        {typingRecords.length > 0 ? (
          <div>
            {typingRecords.map((record, index) => (
              <div key={index} className="typingRecords">
                <p>완료 시간: {record.completedAt}</p>
                <span>소요 시간: {record.time} 초</span>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;
                <span>정확도: {record.accuracy}%</span>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;
                <span>속도: {record.wpm} WPM</span>
              </div>
            ))}
          </div>
        ) : (
          <p>기록이 없습니다.</p>
        )}
      </div>
      {/* 타이핑 완료 모달 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>소요 시간: {currentTime} 초</p>
            <p>정확도: {accuracy}%</p>
            <p>속도: {wpm} WPM</p>
            <button
              onClick={() => {
                refreshCodeSnippet();
                closeModal();
              }}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TypingArea;
