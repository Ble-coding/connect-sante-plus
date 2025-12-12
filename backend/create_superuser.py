"""
Script pour créer un superutilisateur Django de manière non-interactive
Usage: python create_superuser.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User

def create_superuser():
    username = 'admin'
    email = 'admin@pharmafriconnect.africa'
    password = 'admin123'  # Changez ce mot de passe en production !
    
    if User.objects.filter(username=username).exists():
        print(f"L'utilisateur '{username}' existe déjà.")
        return
    
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
        user_type='admin',
        first_name='Admin',
        last_name='User'
    )
    print(f"Superutilisateur créé avec succès !")
    print(f"Username: {username}")
    print(f"Password: {password}")
    print("\n⚠️  IMPORTANT: Changez le mot de passe après la première connexion !")

if __name__ == '__main__':
    create_superuser()








