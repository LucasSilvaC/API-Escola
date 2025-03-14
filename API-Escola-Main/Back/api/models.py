from django.db import models

class Professor(models.Model): #Cria a tabela com as info que vamos coletar
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=255)
    ocupacao = models.FloatField()

class Disciplina(models.Model):
    nome = models.CharField(max_length=255)
    sigla = models.CharField(max_length=4)
    cod_sigla = models.IntegerField()
    carga_horaria = models.FloatField()
    professor = models.ForeignKey('api.Professor', on_delete=models.CASCADE) #Relaciona a tabela professor com a tabela disciplina
#https://docs.djangoproject.com/en/5.1/topics/db/examples/many_to_one/