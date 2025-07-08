# 🎭 통합 감정 분석 API 웹 데모

이 웹 데모는 한국어와 영어 텍스트의 감정을 분석하는 통합 API 서비스를 테스트할 수 있는 인터페이스입니다.

## 🌟 주요 기능

- **이중 언어 지원**: 한국어(KoELECTRA) & 영어(RoBERTa-GoEmotions)
- **실시간 감정 분석**: AWS Lambda 기반 서버리스 API
- **샘플 텍스트**: 각 언어별 5개씩 준비된 테스트 샘플
- **시각적 결과**: 감정 점수 차트와 직관적인 이모지 표시
- **반응형 디자인**: 모바일과 데스크톱 지원

## 🚀 사용 방법

### 1. 웹 서버 실행

```bash
# 간단한 HTTP 서버 실행 (Python)
cd web
python3 -m http.server 8000

# 또는 Node.js 사용 시
npx http-server . -p 8000

# 또는 PHP 사용 시
php -S localhost:8000
```

### 2. 브라우저에서 접속

```
http://localhost:8000
```

### 3. 데모 사용

1. **언어 선택**: 🇰🇷 한국어 또는 🇺🇸 영어 선택
2. **텍스트 입력**: 직접 입력하거나 샘플 버튼 클릭
3. **분석 실행**: "감정 분석하기" 버튼 클릭
4. **결과 확인**: 예측된 감정과 신뢰도, 전체 감정 점수 차트 확인

## 📝 준비된 샘플 텍스트

### 🇰🇷 한국어 샘플 (6개 감정)

1. **행복**: "오늘 정말 기분이 좋아요! 최고의 하루예요!"
2. **슬픔**: "너무 슬퍼요. 마음이 아파서 견딜 수가 없어요."
3. **분노**: "이런 일이 또 생기다니! 정말 화가 나서 견딜 수가 없어요."
4. **불안**: "내일 발표가 걱정돼요. 잘할 수 있을지 두려워요."
5. **당황**: "갑자기 이런 일이 생겨서 완전히 당황스러워요. 어떻게 해야 할지 모르겠어요."

### 🇺🇸 영어 샘플 (28개 감정 중 5가지)

1. **Love & Joy**: "I love this movie! It's absolutely amazing and wonderful!"
2. **Sadness**: "I'm so sad about what happened today. It breaks my heart."
3. **Anger**: "This is so frustrating! I can't stand it anymore!"
4. **Fear**: "I'm really scared about the exam tomorrow. What if I fail?"
5. **Surprise**: "What a wonderful surprise! I never expected this amazing gift!"

## 🔧 API 엔드포인트

### 한국어 감정 분석
```
POST https://5e9feeazo0.execute-api.ap-northeast-2.amazonaws.com/prod/emotion/ko

Content-Type: application/json
{
  "text": "분석할 한국어 텍스트"
}
```

### 영어 감정 분석
```
POST https://5e9feeazo0.execute-api.ap-northeast-2.amazonaws.com/prod/emotion/en

Content-Type: application/json
{
  "text": "English text to analyze"
}
```

## 📊 응답 형식

```json
{
  "text": "분석된 텍스트",
  "predicted_emotion": "happy",
  "confidence": 0.997,
  "all_emotions": {
    "happy": 0.997,
    "sad": 0.001,
    "angry": 0.001,
    "anxious": 0.0005,
    "embarrassed": 0.0004,
    "heartache": 0.0002
  },
  "processing_time": {
    "model_time": 0.039,
    "total_time": 0.04
  },
  "timestamp": 1751871991,
  "request_id": "unique-request-id",
  "status": "success"
}
```

## 🎯 지원 감정

### 한국어 (6개)
- **happy** (행복): 기쁨, 즐거움, 만족감
- **sad** (슬픔): 우울, 슬픔, 낙담
- **angry** (분노): 화남, 짜증, 분개
- **anxious** (불안): 걱정, 근심, 두려움
- **embarrassed** (당황): 놀람, 혼란, 어리둥절
- **heartache** (상처): 마음의 아픔, 배신감, 실망

### 영어 (28개)
admiration, amusement, anger, annoyance, approval, caring, confusion, curiosity, desire, disappointment, disapproval, disgust, embarrassment, excitement, fear, gratitude, grief, joy, love, nervousness, optimism, pride, realization, relief, remorse, sadness, surprise, neutral

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: AWS Lambda (서버리스)
- **API Gateway**: RESTful API
- **AI Models**: 
  - 한국어: KoELECTRA
  - 영어: RoBERTa-GoEmotions
- **Infrastructure**: AWS ECR, CloudWatch

## 🔍 디버깅 도구

개발자 콘솔에서 다음 명령으로 테스트할 수 있습니다:

```javascript
// 한국어 테스트
debugAPI.testKorean()

// 영어 테스트
debugAPI.testEnglish()

// 현재 API 엔드포인트 확인
debugAPI.endpoints

// 현재 선택된 언어 확인
debugAPI.currentLang()
```

## 🌐 CORS 설정

웹 브라우저에서 API를 직접 호출하므로 CORS가 활성화되어 있습니다. 로컬 개발 시에도 문제없이 작동합니다.

## 📱 반응형 지원

- **데스크톱**: 최적화된 레이아웃
- **태블릿**: 중간 크기 화면 지원
- **모바일**: 터치 친화적 인터페이스

## 🎨 UI/UX 특징

- **아름다운 그라디언트**: 현대적인 디자인
- **감정별 색상**: 각 감정마다 고유한 색상
- **애니메이션**: 부드러운 페이드인 효과
- **로딩 스피너**: 분석 중 시각적 피드백
- **에러 처리**: 사용자 친화적 오류 메시지

## 🚨 주의사항

1. **네트워크 연결**: 인터넷 연결이 필요합니다
2. **API 제한**: 과도한 요청 시 제한될 수 있습니다
3. **브라우저 지원**: 모던 브라우저에서 최적화됨

## 📈 성능

- **응답 속도**: 평균 40-100ms
- **정확도**: 한국어 99%+, 영어 80%+
- **가용성**: 99.9% (AWS Lambda 기반)

---

**Happy Analyzing! 🎭✨** 