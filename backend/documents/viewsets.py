from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from documents.models import DocumentImport
from documents.serializers import DocumentImportSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = DocumentImport.objects.select_related("user")
    serializer_class = DocumentImportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return self.queryset
        elif user.is_authenticated:
            return self.queryset.filter(user=user)
        else:
            return self.queryset.none()
