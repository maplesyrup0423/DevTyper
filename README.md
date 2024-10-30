# DevTyper - 타자 연습 웹 애플리케이션
![devtyper-1028](https://github.com/user-attachments/assets/6f0b19e9-61b5-4902-b03b-f0c03260e782)


![image](https://github.com/user-attachments/assets/f855bbca-2ddc-4c8d-b27f-3b3a73ce09f4)

![image](https://github.com/user-attachments/assets/cea26c5b-a454-41b7-a6cb-fade76f3fc79)

(결과 출력 방식 modal 변경)

## 프로젝트 개요
- **프로젝트명**: DevTyper
- **목적**: 사용자가 실전 코드를 통해 타이핑 실력을 키울 수 있는 웹 애플리케이션 제공
- **주요 타겟 사용자**: 타자 실력을 향상하고자 하는 초급 및 중급 개발자, 코딩 초보자

## 목표
- 실전 코드를 기반으로 한 타자 연습을 통해 개발자들에게 유익한 연습 환경 제공
- 타이핑 정확도 및 속도를 측정하여 사용자의 실력 향상 여부를 객관적으로 확인할 수 있도록 지원
- 반복된 연습을 기록하여 사용자 스스로 타자 실력을 체계적으로 관리 가능하게 함

## 주요 기능
- **랜덤 코드 제공**: GitHub API를 통해 JavaScript 레포지토리에서 코드 조각을 무작위로 가져와 연습에 활용
- **타이핑 연습 기능**: 사용자가 코드를 따라 입력할 수 있는 텍스트 영역 제공
- **정확도 및 WPM 측정**: 사용자가 입력한 코드와 제공된 코드의 정확도를 분석하고, 타이핑 속도(WPM)를 계산
- **타이머**: 타이핑 시작 시 타이머가 자동으로 작동하며 일시 정지/재개 가능
- **로컬 스토리지 기록 관리**: 로컬 스토리지에 타이핑 연습 결과를 저장하고, 사용자가 연습 기록을 확인할 수 있도록 함

## 기술 스택
- **프론트엔드**: React
- **스타일링**: CSS
- **API**: GitHub API
- **데이터 저장**: 로컬 스토리지

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


## 화면 구성

1. **타자 연습 화면**
   - 랜덤으로 제공되는 코드가 표시되는 영역
   - 사용자가 입력하는 텍스트 영역
   - 타이머 및 정확도, WPM 표시
   - 새로운 코드 가져오기 및 타이머 일시 정지 기능 제공

2. **기록 조회 화면**
   - 타자 연습 결과 기록을 보여주는 테이블 형태로 구성
   - 날짜, 정확도, WPM을 표시하여 연습 진행 상황을 한눈에 확인할 수 있도록 함

## 기대 효과
- **실제 코드 기반 학습**: 단순 타이핑 연습이 아닌 실전 코드 타이핑을 통해 학습 효과 증대
- **자기 관리 지원**: WPM 및 정확도를 기록하여 실력 향상 여부를 지속적으로 파악 가능
- **편리한 접근성**: 웹 브라우저만 있으면 언제 어디서든 사용 가능
  
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

- [**3. 타이머** ](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-4-GitHub-API) || [**정확도, WPM 계산**](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-5-%EC%A0%95%ED%99%95%EB%8F%84-WPM-%EA%B3%84%EC%82%B0)
  사용자 타이핑 속도를 측정하기 위한 타이머와 WPM 계산 로직을 구현한 과정입니다.

- [**4. 타자 연습 기록 기능 추가**](https://velog.io/@maplesyrup0423/React-%EC%BD%94%EB%94%A9-%ED%83%80%EC%9E%90-%EC%97%B0%EC%8A%B5-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-14-%ED%83%80%EC%9E%90%EC%97%B0%EC%8A%B5-%EB%A1%9C%EA%B7%B8-%EB%82%A8%EA%B8%B0%EA%B8%B0)  
  로컬 스토리지를 이용하여 타자 연습 기록을 저장하고 조회하는 기능을 추가한 과정입니다.

이 외에도 다양한 개발 과정과 트러블슈팅 내용들이 시리즈에 포함되어 있으니, 흥미가 있으신 분들은 방문하여 확인해보세요! 😊


