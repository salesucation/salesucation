import ansible_runner
import requests
import shutil
  
def download_file(url, local_filename):
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename

# install a kubernetes 
if shutil.which("docker"):
    download_file('https://raw.githubusercontent.com/salesucation/k3p/rich-sprint2/k3d.yml', '/tmp/install/k3d.yml')
    r = ansible_runner.run(private_data_dir='.', playbook='k3d.yml')
    print("{}: {}".format(r.status, r.rc))
else:
    download_file('https://raw.githubusercontent.com/salesucation/k3p/rich-sprint2/k3s.yml', '/tmp/install/k3s.yml')
    r = ansible_runner.run(private_data_dir='.', playbook='k3s.yml')
    print("{}: {}".format(r.status, r.rc))

# install knative
download_file('https://raw.githubusercontent.com/salesucation/k3p/rich-sprint2/knative.yml', '/tmp/install/knative.yml')
r = ansible_runner.run(private_data_dir='.', playbook='knative.yml')
print("{}: {}".format(r.status, r.rc))
