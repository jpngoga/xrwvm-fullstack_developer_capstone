import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


@csrf_exempt
@require_POST
def register(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    username = data.get("username", "").strip()
    first_name = data.get("first_name", "").strip()
    last_name = data.get("last_name", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not all([username, first_name, last_name, email, password]):
        return JsonResponse(
            {"error": "Username, first name, last name, email, and password are required."},
            status=400,
        )

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists."}, status=409)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"error": "Email already exists."}, status=409)

    user = User.objects.create_user(
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
    )

    return JsonResponse(
        {"message": "User registered successfully.", "username": user.username},
        status=201,
    )


@csrf_exempt
@require_POST
def user_login(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    username = data.get("username", "").strip()
    password = data.get("password", "")

    user = authenticate(request, username=username, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid username or password."}, status=401)

    login(request, user)

    return JsonResponse(
        {"message": "Login successful.", "username": user.username}
    )


@csrf_exempt
@require_POST
def user_logout(request):
    logout(request)
    return JsonResponse({"message": "Logout successful."})
