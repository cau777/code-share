import re
import string

from nltk import word_tokenize, pos_tag, WordNetLemmatizer
from nltk.corpus import wordnet, stopwords

#  Words to ignore in the documents
ENGLISH_STOPWORDS = set(list(stopwords.words('english')) + list(string.punctuation))


def translate_pos_tag(nltk_tag: str):
    if nltk_tag.startswith("J"):
        return wordnet.ADJ
    elif nltk_tag.startswith("V"):
        return wordnet.VERB
    elif nltk_tag.startswith("N"):
        return wordnet.NOUN
    elif nltk_tag.startswith("R"):
        return wordnet.ADV
    else:
        return None


def extract_pos_tokens(text: str, remove: set[str]):
    text = text.lower()
    tokens = list(filter(lambda t: t not in remove, word_tokenize(text)))
    pos_tags = pos_tag(tokens)
    result = []

    for token, tag in pos_tags:
        result.append((token, translate_pos_tag(tag)))

    return result


def normalize_text(text: str):
    text = text.replace("\r\n", ". ")
    text = text.replace("\n", ". ")
    text = text.replace(r"\r\n", ". ")
    text = text.replace(r"\n", ".")
    # Simplify urls ("https://www.example.com/path" -> www.example.com)
    text = re.sub(r"\w+://([^/]+)/\S*", r"\g<1>", text)
    text = text.replace(r"\'", "'")
    text = text.replace("b'", "b")
    return text


lemmatizer = WordNetLemmatizer()


def lemmatize_tokens(tokens: list[tuple[str, str | None]]):
    result = []
    for token, pos in tokens:
        if pos is None:
            result.append(token)
        else:
            result.append(lemmatizer.lemmatize(token, pos))
    return result
