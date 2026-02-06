from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course, Lesson, Task
from .serializers import CourseSerializer, LessonSerializer
from gamification.models import Enrollment, StudentLessonProgress, StudentTaskCompletion, PointsWallet, PointsTransaction

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Logic to block Advanced courses if Beginner not completed?
        # For now return all, frontend handles locking UI, or we filter here.
        # Requirement: "El alumno NO puede acceder a Avanzado si no completa..."
        return super().get_queryset()

    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        course = self.get_object()
        # Check prerequisites (e.g. previous level completed)
        # Simplified: Auto-enroll or just create record
        Enrollment.objects.get_or_create(user=request.user, course=course)
        return Response({'status': 'enrolled'})

class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        lesson = self.get_object()
        progress, created = StudentLessonProgress.objects.get_or_create(user=request.user, lesson=lesson)
        progress.is_completed = True
        progress.save()
        return Response({'status': 'completed'})

class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        task = self.get_object()
        # Check if already completed
        if StudentTaskCompletion.objects.filter(user=request.user, task=task).exists():
           return Response({'detail': 'Task already completed'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Mark complete
        StudentTaskCompletion.objects.create(user=request.user, task=task)
        
        # Award Points
        wallet, _ = PointsWallet.objects.get_or_create(user=request.user)
        wallet.current_balance += task.points_reward
        wallet.total_earned += task.points_reward
        wallet.save()
        
        PointsTransaction.objects.create(
            wallet=wallet,
            amount=task.points_reward,
            transaction_type='EARN',
            description=f'Completed task: {task.description[:50]}'
        )
        
        return Response({'status': 'completed', 'points_awarded': task.points_reward})
