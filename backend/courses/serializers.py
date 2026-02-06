from rest_framework import serializers
from .models import Level, Course, Module, Lesson, Task
from gamification.models import StudentLessonProgress, StudentTaskCompletion

class TaskSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'description', 'task_type', 'points_reward', 'is_completed']

    def get_is_completed(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return StudentTaskCompletion.objects.filter(user=user, task=obj).exists()
        return False

class LessonSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'video_url', 'content', 'order', 'tasks', 'is_completed']

    def get_is_completed(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return StudentLessonProgress.objects.filter(user=user, lesson=obj, is_completed=True).exists()
        return False

class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'order', 'lessons']

class CourseSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    level_name = serializers.CharField(source='level.name', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'slug', 'order', 'thumbnail', 'level_name', 'modules']

class LevelSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = Level
        fields = ['id', 'name', 'description', 'order', 'courses']
