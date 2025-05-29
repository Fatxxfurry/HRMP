import face_recognition
from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import requests
from io import BytesIO

app = Flask(__name__)

resp = requests.get("http://localhost:8080/api/face-encodings/all")
data = resp.json()  # List of dicts: [{"id":1,"employeeId":"1", "encodingJson":"[...]"}, ...]

known_face_ids = [d['employeeId'] for d in data]
known_face_encodings = [np.array(d['encodingJson'], dtype=np.float32) for d in data]

@app.route('/recognize', methods=['POST'])
def recognize():
    file = request.files['image']
    img = face_recognition.load_image_file(file)
    faces = face_recognition.face_encodings(img)

    for face in faces:
        matches = face_recognition.compare_faces(known_face_encodings, face)
        if True in matches:
            matched_idx = matches.index(True)
            return jsonify({"employeeId": known_face_ids[matched_idx]})
    return jsonify({"employeeId": None}), 404

@app.route('/encode', methods=['POST'])
def encode_face():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    img = Image.open(BytesIO(file.read()))
    img = np.array(img)

    face_locations = face_recognition.face_locations(img)
    if len(face_locations) == 0:
        return jsonify({"error": "No face detected"}), 404


    encoding = face_recognition.face_encodings(img, face_locations)[0]


    encoding_list = encoding.tolist()

    return jsonify({"encoding": encoding_list})

@app.route('/get-encodings', methods=['GET'])
def get_encodings():
    resp = requests.get("http://localhost:8080/api/face-encodings/all")
    data = resp.json()  # List of dicts: [{"id":1,"employeeId":"1", "encodingJson":"[...]"}, ...]
    global known_face_ids, known_face_encodings
    known_face_ids = [d['employeeId'] for d in data]
    known_face_encodings = [np.array(d['encodingJson'], dtype=np.float32) for d in data]
    
app.run(debug=True)
