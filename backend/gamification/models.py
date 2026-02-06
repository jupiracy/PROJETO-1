from django.db import models
import uuid
from django.conf import settings
from courses.models import Task, Lesson, Course

class PointsWallet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wallet')
    current_balance = models.PositiveIntegerField(default=0)
    total_earned = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"Wallet of {self.user.username}"

class PointsTransaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TRANSACTION_TYPES = (
        ('EARN', 'Earned'),
        ('SPEND', 'Spent'),
        ('ADJUST', 'Adjustment'),
    )
    wallet = models.ForeignKey(PointsWallet, on_delete=models.CASCADE, related_name='transactions')
    amount = models.IntegerField()
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class Enrollment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    progress_percent = models.FloatField(default=0.0)
    
    class Meta:
        unique_together = ('user', 'course')

class StudentLessonProgress(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'lesson')

class StudentTaskCompletion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    points_awarded = models.PositiveIntegerField(default=0)
    
    class Meta:
        unique_together = ('user', 'task')
