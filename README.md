
# GAN based Image Inpainting

GAN-based image inpainting uses Generative Adversarial Networks to fill in missing or damaged regions of images. The generator network generates plausible content for the missing regions, while the discriminator network evaluates the realism of the generated content. Through adversarial training, the generator learns to produce realistic inpaintings that closely resemble the missing content. 

## Setup

### Docker (recommended)

```
docker pull thunderblade03/generative-inpainting:0.0.1.RELEASE
docker run -d -p 5000:5000 thunderblade03/generative-inpainting:0.0.1.RELEASE
```


### Manual
Note : create a virtual environment using python 3.6 [download](https://www.python.org/downloads/release/python-360/)

#### Pretrained models

[Places2](https://drive.google.com/drive/folders/1y7Irxm3HSHGvp546hZdAZwuNmhLUVcjO?usp=sharing) | [CelebA-HQ](https://drive.google.com/drive/folders/1uvcDgMer-4hgWlm6_G9xjvEQGP8neW15?usp=sharing)

Download the model dirs and put it under `model_logs/` 

####  
```
model_logs/ 
└── release_places2_256/
```
#### Install dependencies
```
pip install --no-cache-dir -r requirements.txt
```

#### Run app
```
python app.py
```
Application will be served on - [localhost:5000](http://localhost:5000)


