from django.http import JsonResponse
from django.views.decorators.http import require_GET


@require_GET
def get_cars(request):
    cars = [
        {"CarMake": "Toyota", "CarModel": "Corolla"},
        {"CarMake": "Toyota", "CarModel": "Camry"},
        {"CarMake": "Toyota", "CarModel": "Prius"},
        {"CarMake": "Honda", "CarModel": "Civic"},
        {"CarMake": "Honda", "CarModel": "Accord"},
        {"CarMake": "Honda", "CarModel": "CR-V"},
        {"CarMake": "BMW", "CarModel": "3 Series"},
        {"CarMake": "BMW", "CarModel": "5 Series"},
        {"CarMake": "BMW", "CarModel": "X5"},
        {"CarMake": "Mercedes-Benz", "CarModel": "C-Class"},
        {"CarMake": "Mercedes-Benz", "CarModel": "E-Class"},
        {"CarMake": "Audi", "CarModel": "A4"},
        {"CarMake": "Audi", "CarModel": "Q5"},
        {"CarMake": "Ford", "CarModel": "Mustang"},
        {"CarMake": "Nissan", "CarModel": "Altima"},
    ]
    return JsonResponse({"CarModels": cars})
