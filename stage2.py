import ansible_runner
r = ansible_runner.run(private_data_dir='.', playbook='stage2a.yml')
print("{}: {}".format(r.status, r.rc))