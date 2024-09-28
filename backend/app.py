from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  

model = joblib.load('emotional_resilience_model.pkl')

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    emotion = data.get('emotion', '')
    intensity = int(data.get('intensity', 0))
    reason = data.get('reason', '')
    duration = data.get('duration', '')
    coping = data.get('coping', '')
    patterns = data.get('patterns', '')
    open_to_new_strategies = data.get('openToNewStrategies', '')

    tips = []

    if emotion == 'sad':
        tips.append("Consider talking to a friend or loved one about your feelings.")
        tips.append("Try engaging in activities that you enjoy to lift your mood.")
        tips.append("Mindfulness exercises or meditation might help manage your sadness.")
    elif emotion == 'stressed':
        tips.append("Take short breaks during work or study sessions to avoid burnout.")
        tips.append("Try practicing deep breathing or relaxation exercises.")
        tips.append("Physical activity like a short walk can help reduce stress.")
    elif emotion == 'anxious':
        tips.append("Consider journaling to explore and understand your anxiety triggers.")
        tips.append("Try grounding exercises or focusing on your breathing to calm yourself.")
        tips.append("If your anxiety is persistent, speaking to a professional might be helpful.")

    if intensity >= 7:
        tips.append("Since your emotional intensity is high, consider seeking professional support.")

    media = [
        {
            "text": "",
            "image": "https://i.imgflip.com/1pg7k9.jpg"  
        },
        {
            
            "audio": "https://example.com/calm_song.mp3"  
        }
    ]
    
    return jsonify({
        'tips': tips,
        'media': media
    })

if __name__ == '__main__':
    app.run(debug=True)
