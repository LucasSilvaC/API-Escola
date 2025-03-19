from django.db import models

class Professor(models.Model):  
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=255)
    ocupacao = models.FloatField()
    carga_horaria_prof = models.FloatField()

class Disciplina(models.Model):
    nome = models.CharField(max_length=255)
    sigla = models.CharField(max_length=4)
    cod_sigla = models.IntegerField()
    carga_horaria = models.FloatField()
    professor = models.ForeignKey('api.Professor', on_delete=models.CASCADE)  

class Ambiente(models.Model):
    PERIODO = [
        ('M', 'Manha'),
        ('T', 'Tarde'),
        ('N', 'Noite'),
        ('S', 'Sabado'),
    ]

    codigo = models.CharField(max_length=7) 
    sala = models.CharField(max_length=7)
    capacidade = models.CharField(max_length=2) 
    responsavel = models.CharField(max_length=255) 
    periodo = models.CharField(max_length=1, choices=PERIODO)

class Curso(models.Model):
    codigo = models.CharField(max_length=3)  
    curso = models.CharField(max_length=255)  
    sigla = models.CharField(max_length=3)  
    tipo = models.CharField(max_length=3)  
    hora_aula = models.TimeField()

class Turma(models.Model):
    codigo = models.CharField(max_length=3)  
    turma = models.CharField(max_length=255)  