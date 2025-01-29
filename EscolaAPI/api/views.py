from django.shortcuts import render
from .models import Professor
from .serializers import ProfessorSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

@api_view(['GET','POST']) #Decorator é pra definir qual tipo de requisição(GET,POST) e o metódo
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

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer

