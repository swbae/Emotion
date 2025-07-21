// API 엔드포인트 설정
const API_BASE_URL = 'https://5e9feeazo0.execute-api.ap-northeast-2.amazonaws.com/prod/emotion';
const API_ENDPOINTS = {
    ko: `${API_BASE_URL}/ko`,
    en: `${API_BASE_URL}/en`
};

// 감정 아이콘 매핑
const EMOTION_ICONS = {
    // 한국어 감정 (korean-emotion-kluebert-v2)
    'joy': '😊',
    'sadness': '😭',
    'anger': '😡',
    'fear': '😱',
    'surprise': '😲',
    'disgust': '🤢',
    'neutral': '😐',
    
    // 영어 감정 (emotion-english-distilroberta-base 7개 감정)
    'anger': '😡',
    'disgust': '🤢',
    'fear': '😱',
    'joy': '😊',
    'neutral': '😐',
    'sadness': '😭',
    'surprise': '😲'
};

// 감정 한국어 번역
const EMOTION_TRANSLATIONS = {
    // 한국어 감정 (korean-emotion-kluebert-v2)
    'joy': '행복',
    'sadness': '슬픔',
    'anger': '분노',
    'fear': '공포',
    'surprise': '놀람',
    'disgust': '혐오',
    'neutral': '중립',
    
    // 영어 감정 번역 (emotion-english-distilroberta-base 7개 감정)
    'anger': '분노',
    'disgust': '혐오',
    'fear': '공포',
    'joy': '행복',
    'neutral': '중립',
    'sadness': '슬픔',
    'surprise': '놀람'
};

// 감정별 샘플 텍스트 (한국어)
const KOREAN_SAMPLE_TEXTS = {
    'joy': [
        "오늘 정말 기분이 좋아요! 최고의 하루예요!",
        "너무 행복해서 춤을 추고 싶어요! 모든 게 완벽해요.",
        "이런 좋은 소식을 들으니 마음이 너무 따뜻해져요!",
        "웃음이 멈추지 않아요. 정말 즐겁고 기쁜 하루네요!",
        "드디어 꿈이 이루어졌어요! 이보다 더 행복할 수 없어요."
    ],
    'sadness': [
        "너무 슬퍼요. 마음이 아파서 견딜 수가 없어요.",
        "오늘따라 유난히 우울하고 공허한 기분이에요.",
        "눈물이 계속 나와요. 모든 게 힘들고 막막해요.",
        "혼자 있으니까 더 슬프고 외로운 것 같아요.",
        "이별 후로 계속 마음이 무겁고 슬픈 상태예요."
    ],
    'anger': [
        "이런 일이 또 생기다니! 정말 화가 나서 견딜 수가 없어요.",
        "도대체 왜 이런 식으로 대하는 거죠? 너무 억울해요!",
        "참을 수 있는 한계를 넘었어요. 정말 분통이 터져요!",
        "이런 불공정한 처우는 도저히 받아들일 수 없어요!",
        "뒤통수를 맞은 기분이에요. 배신감에 화가 치밀어 올라요."
    ],
    'fear': [
        "혼자서 어두운 길을 걸어야 해서 너무 무서워요. 누군가 따라오는 것 같아요.",
        "내일 발표가 걱정돼요. 실수할까 봐 두려워서 잠이 안 와요.",
        "갑자기 심장이 두근거리고 불안해져요. 뭔가 나쁜 일이 생길 것 같아요.",
        "높은 곳에 올라가니까 다리가 떨리고 무서워요.",
        "시험 결과가 나올 때까지 계속 걱정되고 두려워요."
    ],
    'surprise': [
        "어? 이게 진짜야? 정말 예상하지 못했어요! 깜짝 놀랐네요!",
        "와! 이런 일이 일어날 줄은 꿈에도 몰랐어요!",
        "정말 놀라운 소식이네요! 믿을 수가 없어요!",
        "갑자기 이런 일이? 너무 뜻밖이라서 당황스러워요.",
        "이런 반전이 있을 줄 누가 알았겠어요? 정말 놀라워요!"
    ],
    'disgust': [
        "이런 더러운 것을 어떻게 먹어요? 정말 역겨워서 견딜 수가 없어요.",
        "냄새만 맡아도 속이 메스꺼워져요. 너무 불쾌해요.",
        "이런 행동은 정말 보기 싫고 혐오스러워요.",
        "위생 상태가 너무 더러워서 가까이 가기도 싫어요.",
        "이런 모습을 보니 정말 구역질이 나요."
    ],
    'neutral': [
        "오늘 날씨가 괜찮네요. 특별한 일은 없고 그냥 평범한 하루입니다.",
        "별다른 감정 변화 없이 그냥 일상적인 하루를 보내고 있어요.",
        "평소와 다름없는 보통 날이에요. 특별한 기분은 아니에요.",
        "그냥 그런 하루예요. 좋지도 나쁘지도 않은 평범한 일상이네요.",
        "업무를 처리하고 일정을 소화하는 보통의 하루입니다."
    ]
};

// 감정별 샘플 텍스트 (영어)
const ENGLISH_SAMPLE_TEXTS = {
    'joy': [
        "I'm filled with joy! This is the happiest day of my life! I love this!",
        "I'm so happy I could dance! Everything is absolutely perfect today!",
        "This wonderful news just made my heart so warm and joyful!",
        "I can't stop smiling! Today has been such a delightful and cheerful day!",
        "My dream finally came true! I couldn't be any happier than this!"
    ],
    'sadness': [
        "I'm feeling so sad and empty today. Everything just seems overwhelming right now.",
        "I feel particularly melancholy and hollow today. Nothing seems right.",
        "The tears won't stop flowing. Everything feels difficult and hopeless.",
        "Being alone just makes me feel even more sad and lonely.",
        "Since the breakup, my heart has been heavy with sadness."
    ],
    'anger': [
        "This is absolutely infuriating! I can't believe they would do something so irresponsible!",
        "Why are they treating me this way? This is so unfair and maddening!",
        "I've reached my breaking point! I'm absolutely furious about this!",
        "This kind of unjust treatment is completely unacceptable!",
        "I feel betrayed and backstabbed. The anger is boiling inside me!"
    ],
    'fear': [
        "I'm really scared about the surgery tomorrow. What if something goes wrong?",
        "Walking alone in this dark alley terrifies me. I feel like someone's following me.",
        "My heart is racing with anxiety. I'm afraid something terrible might happen.",
        "Being up this high makes my legs shake with fear.",
        "I'm terrified about the exam results. The anticipation is killing me."
    ],
    'surprise': [
        "What a wonderful surprise! I never expected such an amazing gift!",
        "Wow! I never saw this coming in my wildest dreams!",
        "This is absolutely astonishing news! I can't believe it!",
        "Such an unexpected turn of events! I'm completely caught off guard!",
        "Who could have predicted this plot twist? I'm genuinely amazed!"
    ],
    'disgust': [
        "That's absolutely disgusting! I can't believe anyone would eat something like that.",
        "The smell alone makes me nauseous. This is utterly repulsive.",
        "Such behavior is revolting and makes me sick to my stomach.",
        "The hygiene here is so poor, I don't even want to get close.",
        "Seeing this makes me want to throw up. It's completely gross."
    ],
    'neutral': [
        "The weather is okay today. Nothing particularly special happening, just a regular day.",
        "Just going through my daily routine without any significant emotional changes.",
        "It's an ordinary day like any other. Nothing particularly good or bad.",
        "Just another typical day. Neither exciting nor disappointing, just normal.",
        "Processing my tasks and schedule as usual. Just a regular workday."
    ]
};

// 랜덤 샘플 텍스트 선택 함수
function getRandomSampleText(emotion, language) {
    let sampleTexts;
    
    if (language === 'ko') {
        sampleTexts = KOREAN_SAMPLE_TEXTS[emotion];
    } else {
        sampleTexts = ENGLISH_SAMPLE_TEXTS[emotion];
    }
    
    if (!sampleTexts || sampleTexts.length === 0) {
        // 기본값 반환
        return language === 'ko' ? 
            '샘플 텍스트를 불러올 수 없습니다.' : 
            'Sample text could not be loaded.';
    }
    
    // 랜덤 선택
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
}

// DOM 요소들
const elements = {
    languageRadios: document.querySelectorAll('input[name="language"]'),
    textInput: document.getElementById('textInput'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    btnText: document.querySelector('.btn-text'),
    loadingSpinner: document.querySelector('.loading-spinner'),
    koreanSamples: document.getElementById('koreanSamples'),
    englishSamples: document.getElementById('englishSamples'),
    resultSection: document.getElementById('resultSection'),
    errorSection: document.getElementById('errorSection'),
    currentEndpoint: document.getElementById('currentEndpoint'),
    currentModelInfo: document.getElementById('currentModelInfo')
};

// 현재 선택된 언어
let currentLanguage = 'en';

// 모델 정보 저장
let modelInfo = {
    ko: null,
    en: null
};

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateLanguage();
    
    // Lambda 함수 워밍업 (콜드 스타트 방지)
    warmupAPIs();
    
    // 초기 모델 정보 가져오기
    //fetchModelInfo('ko');
    //fetchModelInfo('en');
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 언어 선택 이벤트
    elements.languageRadios.forEach(radio => {
        radio.addEventListener('change', handleLanguageChange);
    });

    // 분석 버튼 클릭 이벤트
    elements.analyzeBtn.addEventListener('click', handleAnalyze);

    // 텍스트 입력 엔터 키 이벤트 (Ctrl+Enter)
    elements.textInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            handleAnalyze();
        }
    });

    // 샘플 텍스트 버튼 이벤트
    document.querySelectorAll('.sample-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const emotion = this.dataset.emotion;
            const language = this.dataset.language;
            const randomText = getRandomSampleText(emotion, language);
            elements.textInput.value = randomText;
            elements.textInput.focus();
        });
    });
}

// 언어 변경 처리
function handleLanguageChange(e) {
    currentLanguage = e.target.value;
    updateLanguage();
}

// 언어에 따른 UI 업데이트
function updateLanguage() {
    // 샘플 섹션 표시/숨김
    if (currentLanguage === 'ko') {
        elements.koreanSamples.style.display = 'block';
        elements.englishSamples.style.display = 'none';
        elements.textInput.value = '';
        elements.textInput.placeholder = '분석할 한국어 텍스트를 입력하세요...';
        elements.btnText.textContent = '감정 분석하기';
    } else {
        elements.koreanSamples.style.display = 'none';
        elements.englishSamples.style.display = 'block';
        elements.textInput.value = '';
        elements.textInput.placeholder = 'Enter English text to analyze...';
        elements.btnText.textContent = 'Analyze Emotion';
    }

    // 현재 엔드포인트 표시
    elements.currentEndpoint.textContent = API_ENDPOINTS[currentLanguage];

    // 결과 및 에러 섹션 숨김
    hideResults();
    
    // 선택된 언어의 모델 정보 가져오기
    fetchModelInfo(currentLanguage);
}

// 감정 분석 처리
async function handleAnalyze() {
    const text = elements.textInput.value.trim();
    
    if (!text) {
        showError(currentLanguage === 'ko' ? 
            '분석할 텍스트를 입력해주세요.' : 
            'Please enter text to analyze.');
        return;
    }

    // 로딩 상태
    setLoading(true);
    hideResults();

    try {
        const result = await analyzeEmotion(text, currentLanguage);
        showResult(result);
    } catch (error) {
        console.error('감정 분석 오류:', error);
        showError(currentLanguage === 'ko' ? 
            `분석 중 오류가 발생했습니다: ${error.message}` : 
            `Error occurred during analysis: ${error.message}`);
    } finally {
        setLoading(false);
    }
}

// API 호출
async function analyzeEmotion(text, language) {
    const endpoint = API_ENDPOINTS[language];
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error);
    }

    return data;
}

// 결과 표시
function showResult(result) {
    hideError();
    
    // 감정 아이콘과 라벨
    const emotionIcon = EMOTION_ICONS[result.predicted_emotion] || '🎭';
    const emotionLabel = currentLanguage === 'ko' ? 
        `${EMOTION_TRANSLATIONS[result.predicted_emotion] || result.predicted_emotion}(${result.predicted_emotion})` :
        result.predicted_emotion;

    document.getElementById('emotionIcon').textContent = emotionIcon;
    document.getElementById('emotionLabel').textContent = emotionLabel;
    document.getElementById('confidenceValue').textContent = 
        `${(result.confidence * 100).toFixed(1)}%`;

    // 모델 정보 (API 응답에서 가져옴)
    const modelName = result.model_name || (currentLanguage === 'ko' ? 'KoELECTRA' : 'emotion-english-distilroberta-base');
    document.getElementById('modelName').textContent = modelName;
    
    // Footer 모델 정보 업데이트
    updateModelInfo(result.model_name, currentLanguage);
    document.getElementById('processingTime').textContent = 
        `${(result.processing_time.total_time * 1000).toFixed(0)}ms`;

    // 분석된 텍스트
    document.getElementById('analyzedText').textContent = result.text;

    // 감정 차트
    renderEmotionChart(result.all_emotions || result.filtered_emotions);

    // 결과 섹션 표시
    elements.resultSection.style.display = 'block';
}

// 감정 차트 렌더링
function renderEmotionChart(emotions) {
    const chartContainer = document.getElementById('emotionsChart');
    chartContainer.innerHTML = '';

    // 감정을 점수 순으로 정렬
    const sortedEmotions = Object.entries(emotions)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10); // 상위 10개만 표시

    sortedEmotions.forEach(([emotion, score]) => {
        const emotionBar = document.createElement('div');
        emotionBar.className = 'emotion-bar';

        const emotionName = document.createElement('span');
        emotionName.className = 'emotion-name';
        emotionName.textContent = currentLanguage === 'ko' ? 
            `${EMOTION_TRANSLATIONS[emotion] || emotion}(${emotion})` : emotion;

        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';

        const barFill = document.createElement('div');
        barFill.className = 'bar-fill';
        barFill.style.width = `${score * 100}%`;

        const emotionValue = document.createElement('span');
        emotionValue.className = 'emotion-value';
        emotionValue.textContent = `${(score * 100).toFixed(1)}%`;

        barContainer.appendChild(barFill);
        emotionBar.appendChild(emotionName);
        emotionBar.appendChild(barContainer);
        emotionBar.appendChild(emotionValue);
        chartContainer.appendChild(emotionBar);
    });
}

// 에러 표시
function showError(message) {
    hideResults();
    document.getElementById('errorMessage').textContent = message;
    elements.errorSection.style.display = 'block';
}

// 에러 숨김
function hideError() {
    elements.errorSection.style.display = 'none';
}

// 결과 숨김
function hideResults() {
    elements.resultSection.style.display = 'none';
    hideError();
}

// 로딩 상태 설정
function setLoading(isLoading) {
    elements.analyzeBtn.disabled = isLoading;
    
    if (isLoading) {
        elements.btnText.style.display = 'none';
        elements.loadingSpinner.style.display = 'inline-block';
    } else {
        elements.btnText.style.display = 'inline-block';
        elements.loadingSpinner.style.display = 'none';
    }
}

// 유틸리티 함수들
function formatProcessingTime(seconds) {
    if (seconds < 1) {
        return `${(seconds * 1000).toFixed(0)}ms`;
    } else {
        return `${seconds.toFixed(2)}s`;
    }
}

function getEmotionIcon(emotion) {
    return EMOTION_ICONS[emotion] || '🎭';
}

function translateEmotion(emotion, targetLanguage = 'ko') {
    if (targetLanguage === 'ko') {
        return EMOTION_TRANSLATIONS[emotion] || emotion;
    }
    return emotion;
}

// 디버깅용 함수들
window.debugAPI = {
    testKorean: () => {
        elements.textInput.value = "오늘 정말 기분이 좋아요!";
        document.querySelector('input[value="ko"]').checked = true;
        handleLanguageChange({ target: { value: 'ko' } });
        handleAnalyze();
    },
    testEnglish: () => {
        elements.textInput.value = "I love this movie!";
        document.querySelector('input[value="en"]').checked = true;
        handleLanguageChange({ target: { value: 'en' } });
        handleAnalyze();
    },
    endpoints: API_ENDPOINTS,
    currentLang: () => currentLanguage
};

// Lambda 함수 워밍업 (콜드 스타트 방지)
async function warmupAPIs() {
    console.log('🔥 Lambda 함수 워밍업을 시작합니다...');
    
    const warmupPromises = [
        warmupAPI('ko', '안녕하세요'),
        warmupAPI('en', 'Hello')
    ];
    
    try {
        const results = await Promise.allSettled(warmupPromises);
        
        let successCount = 0;
        results.forEach((result, index) => {
            const language = index === 0 ? '한국어' : '영어';
            if (result.status === 'fulfilled') {
                console.log(`✅ ${language} API 워밍업 성공`);
                successCount++;
            } else {
                console.warn(`⚠️ ${language} API 워밍업 실패:`, result.reason?.message || '알 수 없는 오류');
            }
        });
        
        console.log(`🎯 워밍업 완료: ${successCount}/2개 API 준비됨`);
        
        // 워밍업 완료 후 UI에 간단한 표시 (선택사항)
        if (successCount > 0) {
            showWarmupComplete();
        }
        
    } catch (error) {
        console.error('워밍업 중 예상치 못한 오류:', error);
    }
}

// 개별 API 워밍업
async function warmupAPI(language, sampleText) {
    const endpoint = API_ENDPOINTS[language];
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: sampleText })
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error);
    }

    return data;
}

// 워밍업 완료 표시 (선택사항)
function showWarmupComplete() {
    // 브라우저 제목에 준비 완료 표시
    const originalTitle = document.title;
    document.title = '🔥 준비완료 - ' + originalTitle;
    
    // 3초 후 원래 제목으로 복원
    setTimeout(() => {
        document.title = originalTitle;
    }, 3000);
    
    // 콘솔에 준비 완료 메시지
    console.log('🚀 모든 API가 준비되었습니다! 빠른 응답을 기대하세요.');
}

// API에서 모델 정보 가져오기
async function fetchModelInfo(language) {
    try {
        const endpoint = API_ENDPOINTS[language];
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            // 헬스체크 응답에서 model_name이 없으면 service 필드에서 추출
            let modelName = data.model_name;
            if (!modelName && data.service) {
                // 서비스 이름에서 모델명 추출
                if (data.service.includes('korean-emotion-kluebert-v2')) {
                    modelName = 'dlckdfuf141/korean-emotion-kluebert-v2';
                } else if (data.service.includes('emotion-english-distilroberta-base')) {
                    modelName = 'j-hartmann/emotion-english-distilroberta-base';
                }
            }
            
            if (modelName) {
                updateModelInfo(modelName, language);
            }
        }
    } catch (error) {
        console.log(`모델 정보 가져오기 실패 (${language}):`, error);
        // 실패 시 기본값으로 footer 업데이트
        updateModelInfo(null, language);
    }
}

// 모델 정보 업데이트
function updateModelInfo(modelName, language) {
    if (modelName) {
        modelInfo[language] = modelName;
    }
    
    // Footer 모델 정보 업데이트
    const koModel = modelInfo.ko || 'dlckdfuf141/korean-emotion-kluebert-v2';
    const enModel = modelInfo.en || 'j-hartmann/emotion-english-distilroberta-base';
    
    const koLink = `<a href="https://huggingface.co/${koModel}" target="_blank" rel="noopener noreferrer" class="model-link">${koModel}</a>`;
    const enLink = `<a href="https://huggingface.co/${enModel}" target="_blank" rel="noopener noreferrer" class="model-link">${enModel}</a>`;
    
    elements.currentModelInfo.innerHTML = `한국어: ${koLink} | 영어: ${enLink}`;
}

console.log('🎭 통합 감정 분석 API 데모가 로드되었습니다!');
console.log('디버깅: window.debugAPI 객체를 사용해보세요.');
console.log('예시: debugAPI.testKorean(), debugAPI.testEnglish()'); 