from django.db import models
import uuid

class Level(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50) # e.g. Beginner, Advanced
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='courses')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True)
    order = models.PositiveIntegerField(default=0)
    thumbnail = models.ImageField(upload_to='courses/', null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Module(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.course.title} - {self.title}"

class Lesson(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    video_url = models.URLField(blank=True)
    content = models.TextField(blank=True) # Markdown text
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TASK_TYPES = (
        ('QUIZ', 'Quiz'),
        ('PRACTICE', 'Practice Submission'),
    )
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='tasks')
    description = models.TextField()
    task_type = models.CharField(max_length=20, choices=TASK_TYPES, default='PRACTICE')
    points_reward = models.PositiveIntegerField(default=10)
    
    def __str__(self):
        return f"Task for {self.lesson.title}"
