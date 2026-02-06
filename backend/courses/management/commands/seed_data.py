from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from courses.models import Level, Course, Module, Lesson, Task
from store.models import StoreProduct

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed initial data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')
        
        # Create Levels
        beginner, _ = Level.objects.get_or_create(name='Beginner', order=1)
        advanced, _ = Level.objects.get_or_create(name='Advanced', order=2)
        
        # Create Course
        course1, _ = Course.objects.get_or_create(
            level=beginner,
            slug='drum-basics',
            defaults={'title': 'Drum Basics', 'description': 'Learn the fundamentals', 'order': 1}
        )
        
        # Create Module
        mod1, _ = Module.objects.get_or_create(
            course=course1,
            title='Module 1: Grip & Posture',
            order=1
        )
        
        # Create Lesson
        lesson1, _ = Lesson.objects.get_or_create(
            module=mod1,
            title='Lesson 1: Holding the Sticks',
            defaults={'content': 'Content about grip...', 'order': 1}
        )
        
        # Create Task
        Task.objects.get_or_create(
            lesson=lesson1,
            description='Practice match grip for 5 mins',
            defaults={'points_reward': 50, 'task_type': 'PRACTICE'}
        )
        
        # Create Store Product
        StoreProduct.objects.get_or_create(
            name='Pro Sticks 5A',
            defaults={'description': 'Premium drumsticks', 'cost': 500, 'stock': 10}
        )
        StoreProduct.objects.get_or_create(
            name='T-Shirt',
            defaults={'description': 'School Logo Tee', 'cost': 1000, 'stock': 50}
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))
