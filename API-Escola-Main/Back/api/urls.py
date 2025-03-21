from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, DisciplinaDetailView, listar_disciplinas, listar_cursos, listar_turmas, CursoDetailView, TurmaDetailView, AmbienteDetailView, listar_ambientes
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores', listar_professores),  
    path('disciplinas', listar_disciplinas),
    path('turmas', listar_turmas),
    path('cursos', listar_cursos),
    path('ambientes', listar_ambientes),
    path('prof', ProfessoresView.as_view()),  # as_view() retorna uma função que pode ser chamada diretamente pelo Django quando há uma requisição para aquela rota.
    path('professor/<int:pk>', ProfessoresDetailView.as_view()),
    path('disciplina/<int:pk>', DisciplinaDetailView.as_view()),
    path('curso/<int:pk>', CursoDetailView.as_view()),
    path('turma/<int:pk>', TurmaDetailView.as_view()),
    path('ambiente/<int:pk>', AmbienteDetailView.as_view()),        
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
]