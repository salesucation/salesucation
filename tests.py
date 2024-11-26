# foo.py
import unittest


def func(input):
    return input


class testInput(unittest.TestCase):
    def test_func(self):
        self.assertEqual(func(1), 1)