from celery import task
from time import sleep
import subprocess
import os.path
from .models import Job

SEA_PATH = os.path.expanduser("~/SEA")

@task()
def run_simple_calculation(job_id):
    job = Job.objects.get(pk=job_id)
    with open(job.structure.name, 'r') as f:
        lines = f.readlines()
        num_lines = len(lines)
    sleep(30.) # seconds
    status = 'Done'
    job.status = status
    job.save()
    return num_lines

@task()
def run_sea_calculation(job_id):
    job = Job.objects.get(pk=job_id)
    solvate_cmd = os.path.join(SEA_PATH, "bin", "solvate")
    input_flag = "-s"
    input_path = os.path.join(SEA_PATH, "examples", "methane")
    arg_list = [solvate_cmd, input_flag, input_path]
    try:
        output_str = subprocess.check_output(arg_list, stderr=subprocess.STDOUT)
        status = 'Done'
    except subprocess.CalledProcessError, e:
        output_str = "There was an error:\n%s" % e.output
        output_str += "return code: %s\n" % e.returncode
        status = 'Error'

    sleep(10.) # seconds
    job.status = status
    job.output = output_str
    job.save()
    return "%s\n%s" % (status, output_str)
