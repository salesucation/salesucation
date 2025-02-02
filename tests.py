import unittest
import urllib3
import os

http = urllib3.PoolManager()

class testInput(unittest.TestCase):
    def test_func(self):
        os.system("kubectl create namespace test")
        os.system("kubectl apply -f https://raw.githubusercontent.com/salesucation/k3p/main/hello.yaml")
        os.system("kubectl wait pod --all --for=condition=Ready --namespace=test")
        response = http.request('GET', 'http://hello.test.k3p.ca')
        self.assertEqual(response.data, b'Hello from Salesucation!\n')


if __name__ == '__main__':
  unittest.main()        