import unittest
import urllib3
import os

http = urllib3.PoolManager()

class testInput(unittest.TestCase):
    def test_func(self):
        #TODO: set host header to match provided CNAME
        response = http.request('GET', 'http://localhost', headers={
        "Host": "hello.test.k3p.ca"})
        self.assertEqual(response.data, b'Hello from Salesucation!\n')


if __name__ == '__main__':
  unittest.main()        