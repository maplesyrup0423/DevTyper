# 타자 연습 웹 애플리케이션
![devtyper-1028](https://github.com/user-attachments/assets/6f0b19e9-61b5-4902-b03b-f0c03260e782)


![image](https://github.com/user-attachments/assets/f855bbca-2ddc-4c8d-b27f-3b3a73ce09f4)


이 프로젝트는 사용자가 코드를 따라 입력하며 타자 연습을 할 수 있는 웹 애플리케이션입니다.
GitHub에서 랜덤으로 선택한 JavaScript 코드를 가져와 사용자에게 보여주고, 입력한 내용을 비교하여 정확도 및 WPM(분당 타자 수)을 계산합니다.

## 주요 기능

- **코드 가져오기**: GitHub의 레포지토리에서 랜덤으로 JavaScript 코드를 가져옵니다.
- **타이핑 연습**: 사용자가 코드를 따라 입력할 수 있는 텍스트 영역을 제공합니다.
- **정확도 및 WPM 계산**: 사용자가 입력한 코드와 가져온 코드의 정확도를 계산하고, WPM을 제공합니다.
- **타이머**: 사용자의 타이핑 시간을 측정합니다.
- **타이머 일시 정지**: 사용자가 원하는 경우 타이머를 일시 정지하고 다시 시작할 수 있습니다.
- **자동 크기 조정 텍스트 영역**: 사용자가 입력하는 내용에 따라 텍스트 영역의 크기가 자동으로 조정됩니다.
- **코드 출처 링크**: 사용자에게 코드의 출처를 표시하여 참조할 수 있게 합니다.
- **타자 연습 기록**: 사용자가 타자 연습을 완료한 후 정확도 및 WPM 기록을 로컬 스토리지에 저장하고, 이전 기록을 조회할 수 있는 기능을 제공합니다.

  
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
5. 타자 연습이 끝난 후, 입력 기록은 로컬 스토리지에 저장되며, 이를 통해 이전 기록을 확인할 수 있습니다.

## 연락처

프로젝트에 대한 문의 사항은 maplesyrup0423@naver.com로 연락해 주세요.

## 코딩 과정

타자 연습 웹 애플리케이션 제작 과정을 [Velog 시리즈](https://velog.io/@maplesyrup0423/series/%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)로 작성했습니다.

### 📑 시리즈 소개
- **제목**: 코딩 타자 연습 사이트 만들기
- **목적**: 사용자들이 JavaScript 코드를 통해 타자 실력을 향상할 수 있는 웹 애플리케이션 제작기
- **주요 내용**:
  - 프로젝트 초기 설정 및 기능 기획
  - GitHub API 연동을 통한 코드 데이터 불러오기
  - 타이머 및 WPM(분당 타수) 계산 기능 구현
  - 로컬 스토리지 활용하여 타자 연습 기록 저장

### 📚 주요 게시글 목록
- [**1. 프로젝트 기획**](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EA%B8%B0%ED%9A%8D)  
  타자 연습 웹 애플리케이션의 기획 및 주요 기능을 설계한 과정입니다.

- [**2. GitHub API 연동하기**](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-3-GitHub-API)  
  랜덤 JavaScript 코드를 가져오기 위해 GitHub API를 연동한 과정입니다.

- [**3. 타이머** ](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-4-GitHub-API)
- [**정확도, WPM 계산**](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-5-%EC%A0%95%ED%99%95%EB%8F%84-WPM-%EA%B3%84%EC%82%B0)
  사용자 타이핑 속도를 측정하기 위한 타이머와 WPM 계산 로직을 구현한 과정입니다.

- [**4. 타자 연습 기록 기능 추가**](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-14-%ED%83%80%EC%9E%90%EC%97%B0%EC%8A%B5-%EB%A1%9C%EA%B7%B8-%EB%82%A8%EA%B8%B0%EA%B8%B0)  
  로컬 스토리지를 이용하여 타자 연습 기록을 저장하고 조회하는 기능을 추가한 과정입니다.

이 외에도 다양한 개발 과정과 트러블슈팅 내용들이 시리즈에 포함되어 있으니, 흥미가 있으신 분들은 방문하여 확인해보세요! 😊


