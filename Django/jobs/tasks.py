from celery import task
from time import sleep
from .models import Job

@task()
def run_sea_calculation(job_id):
    job = Job.objects.get(pk=job_id)
    sleep(60.) # seconds
    status = 'Done'
    job.status = status
    job.save()
    return status
