import unittest
import urllib3

http = urllib3.PoolManager()

class testInput(unittest.TestCase):
    def test_func(self):
        response = http.request('GET', 'http://localhost', headers={
            'Host': "hello.test.example.com"})
        self.assertEqual(response, 1)