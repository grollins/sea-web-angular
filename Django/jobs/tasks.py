from celery import task
from time import sleep
from .models import Job

@task()
def run_sea_calculation(job_id):
    job = Job.objects.get(pk=job_id)
    with open(job.structure.name, 'r') as f:
        lines = f.readlines()
        num_lines = len(lines)
    sleep(30.) # seconds
    status = 'Done'
    job.status = status
    job.save()
    return num_lines
