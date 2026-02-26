from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes.auth_routes import auth_bp

load_dotenv()
from routes.predict_routes import predict_bp
from routes.admin_routes import admin_bp
from routes.doctor_routes import doctor_bp
from routes.feedback_routes import feedback_bp
from routes.plan_routes import plan_bp
from routes.subscription_routes import subscription_bp
from routes.review_routes import review_bp

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
app.register_blueprint(subscription_bp, url_prefix='/api/subscriptions')
app.register_blueprint(review_bp, url_prefix='/api/reviews')

@app.route('/results/<filename>')
def serve_results(filename):
    return send_from_directory(RESULTS_FOLDER, filename)

@app.route('/health')
def health():
    return {"status": "healthy", "debug_info": "v2_with_logging"}, 200

if __name__ == '__main__':
    import os
    if os.name == 'nt':
        from waitress import serve
        print("Starting robust WSGI server with Waitress on port 5001...")
        serve(app, host='0.0.0.0', port=5001)
    else:
        app.run(host='0.0.0.0', port=5001, debug=True)
