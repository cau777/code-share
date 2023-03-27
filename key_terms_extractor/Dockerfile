FROM python:slim-buster
WORKDIR /app

RUN apt update
RUN apt install -y build-essential

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY nltk_setup.py ./
RUN python nltk_setup.py

COPY app.py dataset_loader.py lazy_data.py text_processing.py documents.json ./

EXPOSE 5000
#ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD waitress-serve --listen 0.0.0.0:5000 --threads 1 app:app
