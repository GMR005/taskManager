import re          
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


PRIORITY_RULES = {
    'high': [
        r'срочн', r'важн', r'критич',           
        r'дедлайн', r'deadline', r'asap',        
        r'urgent', r'important', r'critical',    
        r'сегодня', r'завтра', r'пятниц',       
        r'гори',                                
    ],
    'low': [
        r'не срочн', r'не важн',                
        r'когда-нибудь', r'можно',             
        r'low', r'когда будет время',
    ],
}


CATEGORY_RULES = {
    'business': [
        r'клиент', r'презентац', r'проект',    
        r'работ', r'бизнес', r'сделк',
        r'отчёт', r'отчет', r'document',
        r'meeting', r'client', r'presentation',
        r'contract', r'документ', r'партнёр',
        r'партнер', r'инвест',
    ],
    'development': [
        r'разработк', r'код', r'баг',        
        r'bug', r'feature', r'code',
        r'develop', r'программиров',
        r'деплой', r'deploy', r'commit',
        r'api', r'фронтенд', r'backend',
        r'рефакторинг', r'тест', r'test', r'fix',
    ],
    'education': [
        r'учеб', r'курс', r'обучен',            
        r'study', r'learn', r'education',
        r'урок', r'лекци', r'домашк',
        r'задач', r'экзамен', r'exam',
    ],
    'personal': [
        r'личн', r'дом', r'семь',               
        r'отдых', r'хобби', r'personal',
        r'home', r'family',
        r'здоровь', r'спорт', r'health',
        r'gym', r'doctor',
    ],
}


def analyze_priority(text: str) -> str:
    text_lower = text.lower()
    for rule in PRIORITY_RULES['low']:
        if re.search(rule, text_lower):
            return 'low'
    for rule in PRIORITY_RULES['high']:
        if re.search(rule, text_lower):
            return 'high'
    return 'medium'


def analyze_category(text: str) -> str:
    text_lower = text.lower()
    best_category = None
    best_match_length = 0
    for category, patterns in CATEGORY_RULES.items():
        for pattern in patterns:
            match = re.search(pattern, text_lower)
            if match:
                matched_text = match.group()
                if len(matched_text) > best_match_length:
                    best_category = category
                    best_match_length = len(matched_text)
    return best_category or 'other'


@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'no json body'}), 400
        title = data.get('title', '')
        description = data.get('description', '')
        combined = f'{title} {description}'  
        return jsonify({
            'priority': analyze_priority(combined),
            'category': analyze_category(combined),
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)