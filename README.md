
# GAN based Image Inpainting

GAN-based image inpainting uses Generative Adversarial Networks to fill in missing or damaged regions of images. The generator network generates plausible content for the missing regions, while the discriminator network evaluates the realism of the generated content. Through adversarial training, the generator learns to produce realistic inpaintings that closely resemble the missing content. 

## Setup

note: Docker is a prerequisite

```
docker pull thunderblade03/generative-inpainting:0.0.1.RELEASE
docker run -d -p 5000:5000 thunderblade03/generative-inpainting:0.0.1.RELEASE
```

Application will be served on - [localhost:5000](http://localhost:5000)
