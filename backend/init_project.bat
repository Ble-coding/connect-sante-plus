@echo off
REM Script d'initialisation du projet Django pour Windows

echo Initialisation du projet Pharma Africa Connect Backend...

REM Créer le fichier .env s'il n'existe pas
if not exist .env (
    echo Création du fichier .env...
    (
        echo SECRET_KEY=django-insecure-change-this-in-production
        echo DEBUG=True
        echo ALLOWED_HOSTS=localhost,127.0.0.1
    ) > .env
    echo Fichier .env créé
)

REM Installer les dépendances
echo Installation des dépendances...
pip install -r requirements.txt

REM Appliquer les migrations
echo Application des migrations...
python manage.py makemigrations
python manage.py migrate

echo.
echo Initialisation terminée !
echo Pour démarrer le serveur : python manage.py runserver
echo Pour créer un superutilisateur : python manage.py createsuperuser

pause








