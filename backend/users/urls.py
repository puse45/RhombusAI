from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import UserViewSet, ObtainTokenView

router = DefaultRouter()
router.register(r"users", UserViewSet)

api_urlpatterns = [
    path("", include(router.urls)),
    path("token/", ObtainTokenView.as_view(), name="token_obtain"),
]


urlpatterns = []
