// API 엔드포인트 설정
const API_BASE_URL = 'https://5e9feeazo0.execute-api.ap-northeast-2.amazonaws.com/prod/emotion';
const API_ENDPOINTS = {
    ko: `${API_BASE_URL}/ko`,
    en: `${API_BASE_URL}/en`
};

// 감정 아이콘 매핑
const EMOTION_ICONS = {
    // 한국어 감정
    'happy': '😊',
    'sad': '😢',
    'angry': '😡',
    'anxious': '😰',
    'embarrassed': '😳',
    'heartache': '💔',
    
    // 영어 감정
    'love': '💖',
    'joy': '😄',
    'admiration': '👏',
    'excitement': '🤩',
    'gratitude': '🙏',
    'amusement': '😂',
    'approval': '👍',
    'caring': '🤗',
    'optimism': '😌',
    'pride': '😎',
    'relief': '😅',
    'surprise': '😲',
    'curiosity': '🤔',
    'confusion': '😕',
    'realization': '💡',
    'neutral': '😐',
    'desire': '😍',
    'fear': '😱',
    'nervousness': '😬',
    'sadness': '😭',
    'anger': '😡',
    'annoyance': '😤',
    'disappointment': '😞',
    'disapproval': '👎',
    'disgust': '🤢',
    'embarrassment': '😳',
    'grief': '😢',
    'remorse': '😔'
};

// 감정 한국어 번역
const EMOTION_TRANSLATIONS = {
    'happy': '행복',
    'sad': '슬픔',
    'angry': '분노',
    'anxious': '불안',
    'embarrassed': '당황',
    'heartache': '상처',
    
    'love': '사랑',
    'joy': '기쁨',
    'admiration': '감탄',
    'excitement': '흥분',
    'gratitude': '감사',
    'amusement': '재미',
    'approval': '승인',
    'caring': '배려',
    'optimism': '낙관',
    'pride': '자부심',
    'relief': '안도',
    'surprise': '놀라움',
    'curiosity': '호기심',
    'confusion': '혼란',
    'realization': '깨달음',
    'neutral': '중립',
    'desire': '욕망',
    'fear': '두려움',
    'nervousness': '긴장',
    'sadness': '슬픔',
    'anger': '분노',
    'annoyance': '짜증',
    'disappointment': '실망',
    'disapproval': '반대',
    'disgust': '혐오',
    'embarrassment': '당황',
    'grief': '슬픔',
    'remorse': '후회'
};

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
    currentEndpoint: document.getElementById('currentEndpoint')
};

// 현재 선택된 언어
let currentLanguage = 'ko';

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateLanguage();
    
    // Lambda 함수 워밍업 (콜드 스타트 방지)
    warmupAPIs();
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
            const sampleText = this.getAttribute('data-text');
            elements.textInput.value = sampleText;
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
        elements.textInput.placeholder = '분석할 한국어 텍스트를 입력하세요...';
        elements.btnText.textContent = '감정 분석하기';
    } else {
        elements.koreanSamples.style.display = 'none';
        elements.englishSamples.style.display = 'block';
        elements.textInput.placeholder = 'Enter English text to analyze...';
        elements.btnText.textContent = 'Analyze Emotion';
    }

    // 현재 엔드포인트 표시
    elements.currentEndpoint.textContent = API_ENDPOINTS[currentLanguage];

    // 결과 및 에러 섹션 숨김
    hideResults();
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

    // 모델 정보
    const modelName = currentLanguage === 'ko' ? 'KoELECTRA' : 'RoBERTa-GoEmotions';
    document.getElementById('modelName').textContent = modelName;
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

console.log('🎭 통합 감정 분석 API 데모가 로드되었습니다!');
console.log('디버깅: window.debugAPI 객체를 사용해보세요.');
console.log('예시: debugAPI.testKorean(), debugAPI.testEnglish()'); 