import shelve
from collections import defaultdict
from math import log
from flask import Flask, jsonify, request
from werkzeug.exceptions import BadRequest
from text_processing import extract_pos_tokens, lemmatize_tokens, normalize_text, ENGLISH_STOPWORDS

app = Flask(__name__)


@app.route("/extract", methods=["POST"])
def hello_world():
    request_json = request.json
    if "text" not in request_json or "count" not in request_json:
        raise BadRequest("Incorrect json format")

    text = request_json["text"]
    count = int(request_json["count"])

    if len(text) > 4_000:
        raise BadRequest("Text too long")

    text = normalize_text(text)
    tokens = extract_pos_tokens(text, ENGLISH_STOPWORDS)

    lemmatized = lemmatize_tokens(tokens)
    frequencies = defaultdict(int)
    word_count = 0

    for word in lemmatized:
        frequencies[word] += 1
        word_count += 1

    words_scores = dict()
    with shelve.open("./documents.shelf") as document_frequencies:
        document_count = document_frequencies["__count__"]
        for word, freq in frequencies.items():
            word_document_count = 0
            if word in document_frequencies:
                word_document_count = document_frequencies[word]

            tf = freq / word_count
            idf = log((document_count + 1) / (1 + word_document_count))
            words_scores[word] = tf * idf

    # Only get the count words with the highest score
    s = sorted(words_scores.items(), key=lambda item: -item[1])[:min(count, len(words_scores))]
    return jsonify([key for key, value in s])


if __name__ == '__main__':
    app.run()
