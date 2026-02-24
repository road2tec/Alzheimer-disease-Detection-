from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from routes.auth_routes import auth_bp
from routes.predict_routes import predict_bp
from routes.admin_routes import admin_bp
from routes.doctor_routes import doctor_bp
from routes.feedback_routes import feedback_bp
from routes.plan_routes import plan_bp

app = Flask(__name__)
CORS(app)

# Configuration
RESULTS_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'results', 'grad_cam')
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(predict_bp, url_prefix='/api/predict_logic')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(doctor_bp, url_prefix='/api/doctor')
app.register_blueprint(feedback_bp, url_prefix='/api/feedback')
app.register_blueprint(plan_bp, url_prefix='/api/plans')

@app.route('/results/<filename>')
def serve_results(filename):
    return send_from_directory(RESULTS_FOLDER, filename)

@app.route('/health')
def health():
    return {"status": "healthy"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, reloader_type='stat')
