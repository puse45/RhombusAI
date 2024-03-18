from django.urls import path, include
from users.urls import api_urlpatterns as users_urls
from documents.urls import api_urlpatterns as documents_urls
from rest_framework.routers import DefaultRouter
from drf_yasg import openapi
from rest_framework import permissions
from drf_yasg.views import get_schema_view

app_name = "api"

router = DefaultRouter()


schema_view = get_schema_view(
    openapi.Info(
        title="API Playground",
        default_version="v1",
        contact=openapi.Contact(email="piusmusoki45@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
    path("", include(router.urls)),
    path("", include(users_urls)),
    path("", include(documents_urls)),
    path(
        "playground/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
]
