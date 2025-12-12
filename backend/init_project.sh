#!/bin/bash
# Script d'initialisation du projet Django

echo "Initialisation du projet Pharma Africa Connect Backend..."

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "Création du fichier .env..."
    cat > .env << EOF
SECRET_KEY=django-insecure-change-this-in-production-$(openssl rand -hex 32)
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
EOF
    echo "Fichier .env créé"
fi

# Installer les dépendances
echo "Installation des dépendances..."
pip install -r requirements.txt

# Appliquer les migrations
echo "Application des migrations..."
python manage.py makemigrations
python manage.py migrate

# Créer un superutilisateur (optionnel)
echo ""
echo "Voulez-vous créer un superutilisateur ? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    python manage.py createsuperuser
fi

echo ""
echo "✅ Initialisation terminée !"
echo "Pour démarrer le serveur : python manage.py runserver"








