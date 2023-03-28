import json
import shelve


def main():
    with open(r"./documents.json", "r", encoding="utf-8") as f, \
            shelve.open(r"./documents.shelf", "c") as dest:
        source: dict = json.load(f)
        for key, value in source.items():
            dest[key] = value


if __name__ == '__main__':
    main()
