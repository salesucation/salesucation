if grep -q docker /proc/1/cgroup; then 
   echo inside docker 
else
   echo on host
fi