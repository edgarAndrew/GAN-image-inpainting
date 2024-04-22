from flask import Flask, request, jsonify,render_template
import base64
from PIL import Image
from io import BytesIO
import subprocess
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/process_images', methods=['POST'])
def process_images():
    try:
        # Get images from form data
        image_file = request.files.get('image')
        mask_file = request.files.get('mask')

        model_name = request.form.get('model')

        # Convert images to PIL Image objects
        image = Image.open(image_file)
        mask = Image.open(mask_file)


        # Save images to temporary files
        image_path = 'temp_image.png'
        mask_path = 'temp_mask.png'
        image.save(image_path)
        mask.save(mask_path)

        # Run the TensorFlow model
        if model_name == "release_places2_256":
            subprocess.run([
                'python',
                'test.py',
                '--image',
                image_path,
                '--mask',
                mask_path,
                '--output',
                'output.png',
                '--checkpoint_dir',
                'model_logs/release_places2_256'
            ])
        elif model_name == "release_celeba_hq_256":
            subprocess.run([
                'python',
                'test.py',
                '--image',
                image_path,
                '--mask',
                mask_path,
                '--output',
                'output.png',
                '--checkpoint_dir',
                'model_logs/release_celeba_hq_256'
            ])
        else:
            abort(400, 'Invalid model name')

        # Read the output image
        with open('output.png', 'rb') as f:
            output_image_data = f.read()

        # Convert the output image to base64 data URL
        output_image_data_url = base64.b64encode(output_image_data).decode('utf-8')

        # Remove temporary files
        os.remove(image_path)
        os.remove(mask_path)
        os.remove('output.png')

        return jsonify({'outputImageData': output_image_data_url}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
