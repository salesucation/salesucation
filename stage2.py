import ansible_runner
import requests
 
url = 'https://raw.githubusercontent.com/salesucation/k3p/main/stage2a.yml'  # Replace with your URL
local_filename = '/tmp/install/stage2a.yml'  # Replace with your desired local file name
 
def download_file(url, local_filename):
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename
 
download_file(url, local_filename)
r = ansible_runner.run(private_data_dir='.', playbook='stage2a.yml')
print("{}: {}".format(r.status, r.rc))