from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

@app.route('/bfhl', methods=['POST'])
def process_data():
    data = request.json.get('data', [])
    user_id = "nishanth_p_27102003"  

    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]
    highest_lowercase = [max([item for item in data if item.islower()], default="")]

    response = {
        "is_success": True,
        "user_id": user_id,
        "email": "nishanth.p2021@vitstudent.ac.in",  
        "roll_number": "21BCE1668",  
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase
    }

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
