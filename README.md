# 타자 연습 웹 애플리케이션

이 프로젝트는 사용자가 코드를 따라 입력하며 타자 연습을 할 수 있는 웹 애플리케이션입니다.
GitHub에서 랜덤으로 선택한 JavaScript 함수 코드를 가져와 사용자에게 보여주고, 입력한 내용을 비교하여 정확도 및 WPM(분당 타자 수)을 계산합니다.

## 주요 기능

- **코드 가져오기**: GitHub의 `lodash` 레포지토리에서 랜덤으로 JavaScript 함수를 가져옵니다.
- **타이핑 연습**: 사용자가 코드를 따라 입력할 수 있는 텍스트 영역을 제공합니다.
- **정확도 및 WPM 계산**: 사용자가 입력한 코드와 가져온 코드의 정확도를 계산하고, WPM을 제공합니다.
- **타이머**: 사용자의 타이핑 시간을 측정합니다.
- **타이머 일시 정지**: 사용자가 원하는 경우 타이머를 일시 정지하고 다시 시작할 수 있습니다.
- **자동 크기 조정 텍스트 영역**: 사용자가 입력하는 내용에 따라 텍스트 영역의 크기가 자동으로 조정됩니다.
- **코드 출처 링크**: 사용자에게 코드의 출처를 표시하여 참조할 수 있게 합니다.

## 기술 스택

- React
- CSS
- GitHub API

## 설치 방법

1. 이 리포지토리를 클론합니다:

   ```bash
   git clone https://github.com/maplesyrup0423/DevTyper.git
   cd repository-name
   ```

2. 필요한 패키지를 설치합니다:

   ```bash
   npm install
   ```

3. `.env` 파일을 생성하고, GitHub API 토큰을 설정합니다:

   ```plaintext
   REACT_APP_GITHUB_TOKEN=your_github_token
   ```

4. 애플리케이션을 실행합니다:
   ```bash
   npm start
   ```

## 사용 방법

1. 텍스트 영역에 나타나는 코드를 따라 입력하세요.
2. 입력을 시작하면 타이머가 시작됩니다.
3. 입력이 완료되면 정확도와 WPM이 계산되어 표시됩니다.
4. 필요할 경우 "새로고침" 버튼을 클릭하여 새로운 코드를 가져올 수 있습니다.

## 연락처

프로젝트에 대한 문의 사항은 [이메일](maplesyrup0423@naver.com)로 연락해 주세요.
