from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class Professor(models.Model):  
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=255)
    ocupacao = models.FloatField()
    carga_horaria_prof = models.FloatField()
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)

class Disciplina(models.Model):
    nome = models.CharField(max_length=255)
    sigla = models.CharField(max_length=4)
    cod_sigla = models.CharField(max_length=10)
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
    capacidade = models.IntegerField() 
    responsavel = models.CharField(max_length=255) 
    periodo = models.CharField(max_length=1, choices=PERIODO)

class Curso(models.Model):
    TIPO = [
        ('FIC', 'FIC'),
        ('CS', 'CS'),
        ('CT', 'CT'),
        ('CAI', 'CAI'),
    ]

    codigo = models.CharField(max_length=3)  
    curso = models.CharField(max_length=255)  
    sigla = models.CharField(max_length=3)  
    tipo = models.CharField(max_length=3, choices=TIPO)
    hora_aula = models.DurationField()

class Turma(models.Model):
    codigo = models.CharField(max_length=3)  
    turma = models.CharField(max_length=255)


class UsuarioManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('O usuário deve ter um nome de usuário.')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)


class Usuario(AbstractUser):
    objects = UsuarioManager()