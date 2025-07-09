# 🎭 통합 감정 분석 API 웹 데모

이 웹 데모는 한국어와 영어 텍스트의 감정을 분석하는 통합 API 서비스를 테스트할 수 있는 인터페이스입니다.

## 🌟 주요 기능

- **이중 언어 지원**: 한국어(KoELECTRA) & 영어(RoBERTa-GoEmotions)
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

### 🇰🇷 한국어 샘플 (6개 감정)

1. **행복**: "오늘 정말 기분이 좋아요! 최고의 하루예요!"
2. **슬픔**: "너무 슬퍼요. 마음이 아파서 견딜 수가 없어요."
3. **분노**: "이런 일이 또 생기다니! 정말 화가 나서 견딜 수가 없어요."
4. **불안**: "내일 발표가 걱정돼요. 잘할 수 있을지 두려워요."
5. **당황**: "갑자기 이런 일이 생겨서 완전히 당황스러워요. 어떻게 해야 할지 모르겠어요."
6. **상처**: "믿었던 사람에게 배신당해서 마음이 너무 아파요. 실망스럽고 상처받았어요."

### 🇺🇸 영어 샘플 (28개 감정)

1. **Admiration**: "I really admire how you handled that difficult situation with such grace and wisdom."
2. **Amusement**: "That joke was hilarious! I can't stop laughing, it's so funny and clever!"
3. **Anger**: "This is absolutely infuriating! I can't believe they would do something so irresponsible!"
4. **Annoyance**: "It's really annoying when people don't follow simple instructions. This is getting on my nerves."
5. **Approval**: "I completely agree with your decision. That's exactly the right approach to take."
6. **Caring**: "I'm worried about you. Please take care of yourself and let me know if you need anything."
7. **Confusion**: "I'm completely confused by these instructions. What exactly am I supposed to do here?"
8. **Curiosity**: "I'm really curious about how this works. Can you explain the process to me?"
9. **Desire**: "I really want to travel to Japan someday. It's been my dream destination for years."
10. **Disappointment**: "I'm so disappointed that the concert was cancelled. I was really looking forward to it."
11. **Disapproval**: "I strongly disagree with that policy. It's unfair and poorly thought out."
12. **Disgust**: "That's absolutely disgusting! I can't believe anyone would eat something like that."
13. **Embarrassment**: "I'm so embarrassed about what happened at the meeting. I wish I could just disappear."
14. **Excitement**: "I'm so excited about the vacation! I can't wait to see all the amazing places we'll visit!"
15. **Fear**: "I'm really scared about the surgery tomorrow. What if something goes wrong?"
16. **Gratitude**: "Thank you so much for your help! I'm incredibly grateful for everything you've done."
17. **Grief**: "I'm still grieving the loss of my beloved pet. The grief is overwhelming and I can't stop thinking about all our memories together."
18. **Joy**: "I'm filled with joy! This is the happiest day of my life!"
19. **Love**: "I love you more than words can express. You make my life complete."
20. **Nervousness**: "I'm so nervous about the job interview. My hands are shaking and I can't calm down."
21. **Optimism**: "I'm confident that everything will work out fine. Good things are coming our way!"
22. **Pride**: "I'm so proud of my daughter for graduating with honors. She worked so hard for this."
23. **Realization**: "Oh wow, I just realized what you meant! Now everything makes perfect sense."
24. **Relief**: "What a relief! I was so worried, but everything turned out okay in the end."
25. **Remorse**: "I deeply regret what I said. I'm sorry for hurting your feelings, it was wrong of me."
26. **Sadness**: "I feel so sad and empty inside. Nothing seems to bring me joy anymore."
27. **Surprise**: "I can't believe this amazing surprise! This is absolutely unexpected and wonderful!"
28. **Neutral**: "The weather forecast predicts rain tomorrow morning."

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

## 🚨 주의사항

1. **네트워크 연결**: 인터넷 연결이 필요합니다
2. **API 제한**: 요금이 발생하기 때문에 테스트 용도 외 사용 금지

## 📈 성능

- **응답 속도**: 평균 100-200ms
- **응답 속도(Cold Start)**: 평균 10s 이내

---

**Happy Analyzing! 🎭✨**
