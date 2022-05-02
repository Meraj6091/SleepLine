import os
import json

from flask import Flask, request, request, jsonify
from flask_cors import CORS
from rule_base import ActivityPlan
from rule_base import Employee

app = Flask(__name__)
cors = CORS(app)


@app.route('/diet', methods=['POST'])
def severity_info():
    calcium = request.json['calcium']
    iron = request.json['iron']
    folate = request.json['folate']
    print(calcium, iron, folate)

    engine = ActivityPlan()
    engine.reset()
    engine.declare(Employee(calcium=calcium,
                            iron=iron,
                            folate=folate))
    engine.run()

    response = jsonify({"suggestions": engine.suggestions})
    return response


if __name__ == '__main__':
    app.run(debug=True, port=4001)
