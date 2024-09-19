from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

app = Flask(__name__)
CORS(app)  

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get", methods=["POST"])
def chat():
    try:
        data = request.json
        msg = data.get("msg")
        
        if not msg:
            return jsonify({"error": "No message provided"}), 400
        
        response = get_Chat_response(msg)
        return jsonify({"response": response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_Chat_response(text):
    chat_history_ids = torch.tensor([]).long()  

    for step in range(5):
        new_user_input_ids = tokenizer.encode(str(text) + tokenizer.eos_token, return_tensors='pt')
        bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if chat_history_ids.numel() > 0 else new_user_input_ids
        chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
        text = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
    
    return text

if __name__ == '__main__':
    app.run()
