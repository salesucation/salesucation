import unittest
import urllib3

http = urllib3.PoolManager()

class testInput(unittest.TestCase):
    def test_func(self):
        response = http.request('GET', 'http://hello.test.k3p.ca')
        self.assertEqual(response.data, b'Hello from Salesucation!\n')


if __name__ == '__main__':
  unittest.main()        