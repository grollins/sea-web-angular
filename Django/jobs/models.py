from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    ''' Creates a token whenever a User is created '''
    if created:
        Token.objects.create(user=instance)

class Job(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    owner = models.ForeignKey('auth.User', related_name='jobs')

    class Meta:
        ordering = ('created',)

    # def save(self, *args, **kwargs):
        # self.highlighted = highlight(self.code, lexer, formatter)
        # super(Snippet, self).save(*args, **kwargs)

        # limit the number of instances retained
        # snippets = Snippet.objects.all()
        # if len(snippets) > 100:
            # snippets[0].delete()
