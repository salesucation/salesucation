import unittest
import urllib3

http = urllib3.PoolManager()

class testInput(unittest.TestCase):
    def test_func(self):
        #TODO: set host header to match provided CNAME and set http request to EXTERNAL-IP from `kubectl --namespace kourier-system get service kourier`
        response = http.request('GET', 'http://172.18.0.2', headers={
        "Host": "hello.test.k3p.dev"})
        self.assertEqual(response.data, b'Hello from Salesucation!\n')


if __name__ == '__main__':
  unittest.main()        