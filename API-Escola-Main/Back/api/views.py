from django.shortcuts import render
from .models import Professor, Disciplina, Curso, Turma, Ambiente
from .serializers import ProfessorSerializer, DisciplinaSerializer, CursoSerializer, AmbienteSerializer, TurmaSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# PROFESSORES
@api_view(['GET','POST']) #Decorator é pra definir qual tipo de requisição(GET,POST) e o metódo
@permission_classes([IsAuthenticated])
def listar_professores(request): #Só usa as requisições acima, do decorator
    if request.method == 'GET':
        queryset = Professor.objects.all() #Query é de buscar, ele busca todos os objetos e guarda no "queryset"
        serializer = ProfessorSerializer(queryset, many=True) #Serializa o queryset, transforma em json, many por ter muitos itens
        return Response(serializer.data) #Retorna estes dados serializados
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data=request.data) #Pega os dados do request e transforma em json
        if serializer.is_valid(): #Verifica se os dados são válidos
            serializer.save() #Salva os dados no banco de dados
            return Response(serializer.data, status=status.HTTP_201_CREATED) #Retorna os dados serializados e o status 201
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #Retorna os erros e o status 400
            
class ProfessoresView(ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer #Serializer em formato de formulário
    permission_classes = [IsAuthenticated]

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

# DISCIPLINAS
@api_view(['GET','POST']) 
@permission_classes([IsAuthenticated])
def listar_disciplinas(request): 
    if request.method == 'GET':
        queryset = Disciplina.objects.all() 
        serializer = DisciplinaSerializer(queryset, many=True) 
        return Response(serializer.data) 
    elif request.method == 'POST':
        serializer = DisciplinaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class DisciplinaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]

# CURSOS
@api_view(['GET','POST']) 
@permission_classes([IsAuthenticated])
def listar_cursos(request): 
    if request.method == 'GET':
        queryset = Curso.objects.all() 
        serializer = CursoSerializer(queryset, many=True)  
        return Response(serializer.data) 
    elif request.method == 'POST':
        serializer = CursoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class CursoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]    

# TURMA
@api_view(['GET','POST']) 
@permission_classes([IsAuthenticated])
def listar_turmas(request): 
    if request.method == 'GET':
        queryset = Turma.objects.all() 
        serializer = TurmaSerializer(queryset, many=True)  
        return Response(serializer.data) 
    elif request.method == 'POST':
        serializer = TurmaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class TurmaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    permission_classes = [IsAuthenticated]

# AMBIENTE
@api_view(['GET','POST']) 
@permission_classes([IsAuthenticated])
def listar_ambientes(request): 
    if request.method == 'GET':
        queryset = Ambiente.objects.all() 
        serializer = AmbienteSerializer(queryset, many=True)  
        return Response(serializer.data) 
    elif request.method == 'POST':
        serializer = AmbienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class AmbienteDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]                    