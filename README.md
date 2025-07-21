# 🎭 통합 감정 분석 API 웹 데모

이 웹 데모는 한국어와 영어 텍스트의 감정을 분석하는 통합 API 서비스를 테스트할 수 있는 인터페이스입니다.

## 🌟 주요 기능

- **이중 언어 지원**: 한국어(KLUE-BERT) & 영어(DistilRoBERTa)
- **실시간 감정 분석**: AWS Lambda 기반 서버리스 API
- **샘플 텍스트**: 각 언어별 감정별로 준비된 테스트 샘플
- **시각적 결과**: 감정 점수 차트와 직관적인 이모지 표시
- **반응형 디자인**: 모바일과 데스크톱 지원

## 🚀 사용 방법

### 1. 브라우저에서 접속

```
https://swbae.github.io/Emotion/
```

### 2. 데모 사용

1. **언어 선택**: 🇰🇷 한국어 또는 🇺🇸 영어 선택
2. **텍스트 입력**: 직접 입력하거나 샘플 버튼 클릭
3. **분석 실행**: "감정 분석하기" 버튼 클릭
4. **결과 확인**: 예측된 감정과 신뢰도, 전체 감정 점수 차트 확인

## 📝 준비된 샘플 텍스트

### 🇰🇷 한국어 샘플 (7개 감정)

1. **행복**: "오늘 정말 기분이 좋아요! 최고의 하루예요!"
2. **슬픔**: "너무 슬퍼요. 마음이 아파서 견딜 수가 없어요."
3. **분노**: "이런 일이 또 생기다니! 정말 화가 나서 견딜 수가 없어요."
4. **공포**: "어두운 길을 혼자 걸어가는 게 너무 무서워요."
5. **놀람**: "갑자기 이런 일이 생겨서 완전히 놀랐어요!"
6. **혐오**: "그런 행동은 정말 역겨워요. 용납할 수 없어요."
7. **중립**: "오늘 날씨가 흐리고 기온은 15도입니다."

### 🇺🇸 영어 샘플 (7개 감정)

1. **Joy**: "I love this movie! It's absolutely amazing and wonderful!"
2. **Sadness**: "I'm so sad about what happened today. It breaks my heart."
3. **Anger**: "This is so frustrating! I can't stand it anymore!"
4. **Fear**: "I'm really scared about the exam tomorrow. What if I fail?"
5. **Surprise**: "What a wonderful surprise! I never expected this amazing gift!"
6. **Disgust**: "That's absolutely disgusting! I can't believe anyone would do that."
7. **Neutral**: "The weather forecast predicts rain tomorrow morning."

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
    "fear": 0.0005,
    "surprise": 0.0004,
    "disgust": 0.0002,
    "neutral": 0.0001
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

### 한국어 (7개) - KLUE-BERT 기반

- **행복** (joy): 기쁨, 즐거움, 만족감
- **슬픔** (sadness): 우울, 슬픔, 낙담
- **분노** (anger): 화남, 짜증, 분개
- **공포** (fear): 두려움, 무서움, 위협감
- **놀람** (surprise): 예상치 못한 상황에 대한 반응
- **혐오** (disgust): 불쾌함, 역겨움, 거부감
- **중립** (neutral): 특별한 감정 없이 평범한 상태

### 영어 (7개) - DistilRoBERTa 기반

- **joy** (기쁨): 행복, 즐거움, 만족
- **sadness** (슬픔): 우울, 슬픔, 낙담
- **anger** (분노): 화남, 짜증, 분노
- **fear** (공포): 두려움, 무서움, 걱정
- **surprise** (놀람): 깜짝 놀람, 예상치 못함
- **disgust** (혐오): 역겨움, 불쾌감, 거부감
- **neutral** (중립): 평범한 상태, 특별한 감정 없음

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: AWS Lambda (서버리스)
- **API Gateway**: RESTful API
- **AI Models**:
  - 한국어: [KLUE-BERT v2](https://huggingface.co/dlckdfuf141/korean-emotion-kluebert-v2) - 7개 감정 분류
  - 영어: [DistilRoBERTa-base](https://huggingface.co/j-hartmann/emotion-english-distilroberta-base) - Ekman의 6개 기본 감정 + 중립
- **Infrastructure**: AWS ECR, CloudWatch

## 🚨 주의사항

1. **네트워크 연결**: 인터넷 연결이 필요합니다
2. **API 제한**: 요금이 발생하기 때문에 테스트 용도 외 사용 금지

## 📈 성능

- **응답 속도**: 평균 100-200ms
- **응답 속도(Cold Start)**: 평균 10s 이내

---

**Happy Analyzing! 🎭✨**
