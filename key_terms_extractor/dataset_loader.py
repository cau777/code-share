import json
import sys
import time
from collections import defaultdict
from text_processing import extract_pos_tokens, lemmatize_tokens, normalize_text, ENGLISH_STOPWORDS


def main():
    # Dict representing in how many documents words are present, to be used by tf-idf
    doc_frequency = defaultdict(int)
    doc_count = 0

    # Expects files with code descriptions/comments/docstrings on each line
    # Can be downloaded from:
    # * https://github.com/EdinburghNLP/code-docstring-corpus/blob/master/V2/parallel/parallel_desc
    # * https://github.com/EdinburghNLP/code-docstring-corpus/blob/master/V2/parallel/parallel_methods_desc
    for file in sys.argv[1:]:
        with open(file, "r", encoding="utf-8", errors="ignore") as f:
            print(f"Started file {file} at {time.thread_time()}")
            for line in f:
                line: str = normalize_text(line[1:-1])
                tokens = extract_pos_tokens(line, ENGLISH_STOPWORDS)
                lemmatized = lemmatize_tokens(tokens)  # Lemmatize using Part Of Speach tagging
                for word in set(lemmatized):  # Avoid duplicates
                    doc_frequency[word] += 1
                doc_count += 1

    print("doc_count", doc_count)

    print("Started saving at", time.thread_time())
    with open(r"./documents.json", "w", encoding="utf-8") as f:
        json.dump({"count": doc_count, "frequencies": doc_frequency}, f)


if __name__ == '__main__':
    main()
