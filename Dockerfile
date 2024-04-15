FROM python:3.6.15-slim-buster
WORKDIR /python-docker
COPY requirements.txt requirements.txt

RUN apt-get update \
    && apt-get install -y libglib2.0-0 \
    && apt-get install -y libsm6 libxext6 libxrender-dev \
    && apt install -y git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install git+https://github.com/JiahuiYu/neuralgym

COPY . .
CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]
