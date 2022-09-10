import json

document_count: int
document_frequencies: dict[str, int]


def load_document():
    global document_count, document_frequencies
    with open(r"./documents.txt", "r", encoding="utf-8") as f:
        loaded = json.load(f)
        document_count = loaded["count"]
        document_frequencies = loaded["frequencies"]
        print(f"Loaded {document_count} documents and {len(document_frequencies)} words")
    return document_count, document_frequencies
