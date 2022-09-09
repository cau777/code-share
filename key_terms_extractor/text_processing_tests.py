import unittest
from text_processing import extract_pos_tokens, lemmatize_tokens

class MyTestCase(unittest.TestCase):
    def test_pos_tagging(self):
        text = "You are my friend"
        parts = extract_pos_tokens(text, set())
        self.assertEqual(parts, [("you", None), ("are", "v"), ("my", None), ("friend", "n")])

    def test_lemmatization(self):
        text = "You are my friend"
        tokens = extract_pos_tokens(text, set())
        result = lemmatize_tokens(tokens)
        self.assertEqual(result, ["you", "be", "my", "friend"])


if __name__ == '__main__':
    unittest.main()
