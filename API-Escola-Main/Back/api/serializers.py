from rest_framework import serializers
from .models import Professor, Disciplina, Turma, Curso, Ambiente

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = '__all__'        

class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'                