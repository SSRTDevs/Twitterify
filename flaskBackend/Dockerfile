# This Dockerfile treats server.py as app.py, rename the file as app.py before building. 

From python:3.10.10-slim-buster


WORKDIR /python-docker

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt
COPY . .

CMD ["flask", "run", "--host=0.0.0.0"]