import os
import json

from flask import Flask, request, request, jsonify
from flask_cors import CORS
from rule_base import ActivityPlan
from rule_base import Therepies

app = Flask(__name__)
cors = CORS(app)


@app.route('/therepies', methods=['POST'])
def severity_info():
    age = request.json['age']
    gender = request.json['gender']
    level = request.json['level']
    print(age, gender, level)

    engine = ActivityPlan()
    engine.reset()
    engine.declare(Therepies(age=age,
                            gender=gender,
                            level=level))
    engine.run()

    response = jsonify({"suggestions": engine.suggestions})
    print(response)
    return response


if __name__ == '__main__':
    app.run(debug=True)
