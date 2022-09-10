FROM python:slim-buster AS deps
WORKDIR /app

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
CMD python app.py