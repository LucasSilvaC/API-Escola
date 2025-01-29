from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView  # Certifique-se de importar corretamente
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores', listar_professores),  # Função baseada em view
    path('prof', ProfessoresView.as_view()),  # as_view() retorna uma função que pode ser chamada diretamente pelo Django quando há uma requisição para aquela rota.
    path('professor/<int:pk>', ProfessoresDetailView.as_view()), #pk = primmary key
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
]