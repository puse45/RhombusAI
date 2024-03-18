from django.urls import path, include
from rest_framework.routers import DefaultRouter

from documents.viewsets import DocumentViewSet

router = DefaultRouter()
router.register(r"documents", DocumentViewSet)

api_urlpatterns = [
    path("", include(router.urls)),
]

urlpatterns = []
