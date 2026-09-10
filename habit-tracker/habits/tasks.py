from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils import timezone
from .models import Habit


@shared_task
def send_reminder_email_task(user_id):
    User = get_user_model()
    user = User.objects.get(pk=user_id)
    return send_remainder_mail(user)


def send_remainder_mail(user):
    today = timezone.now().date()

    habits = Habit.objects.filter(user=user, is_active=True).exclude(
        checkins__date=today
    )
    if not habits.exists():
        return 0
    habit_lines = "\n".join(f" - {h.name}" for h in habits)

    message = (
        f"You haven't checked in on these habits today:\n\n"
        f"{habit_lines}\n\n"
        f"Log in to Ritual to check them off."
    )

    send_mail(
        subject="Ritual - habits you haven't checked in today",
        message=message,
        from_email=None,
        recipient_list=[user.email],
        using="resend",
    )
    return 1