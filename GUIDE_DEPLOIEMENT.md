# Guide de Build et Déploiement - PharmaConnect

## 📦 Build du Projet

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Git

### Étapes pour Builder le Projet

#### 1. Installer les dépendances (si pas déjà fait)
```bash
npm install
```

#### 2. Builder le projet en mode production
```bash
npm run build
```

Cette commande va :
- Compiler le code TypeScript
- Minifier et optimiser les fichiers
- Générer les fichiers statiques dans le dossier `dist/`

#### 3. Tester le build localement
```bash
npm run preview
```

Cela démarre un serveur local pour tester la version de production. Ouvrez `http://localhost:4173` dans votre navigateur.

---

## 🚀 Options de Déploiement

### Option 1 : Vercel (Recommandé - Gratuit et Simple)

Vercel est la plateforme recommandée pour les projets React/Vite.

#### Étape 1 : Créer un compte
1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte avec GitHub

#### Étape 2 : Importer le projet
1. Cliquez sur "Add New Project"
2. Sélectionnez votre dépôt GitHub `Ble-coding/connect-sante-plus`
3. Vercel détectera automatiquement que c'est un projet Vite

#### Étape 3 : Configurer le build
Vercel détectera automatiquement ces paramètres, mais vous pouvez les vérifier :
- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`

#### Étape 4 : Déployer
1. Cliquez sur "Deploy"
2. Attendez la fin du déploiement
3. Votre site sera disponible à l'adresse : `https://votre-projet.vercel.app`

#### Avantages Vercel :
- ✅ Déploiement automatique à chaque push sur GitHub
- ✅ HTTPS gratuit
- ✅ CDN global
- ✅ Domaine personnalisé gratuit
- ✅ Version gratuite généreuse

---

### Option 2 : Netlify (Alternative Gratuite)

#### Étape 1 : Créer un compte
1. Allez sur [netlify.com](https://netlify.com)
2. Créez un compte avec GitHub

#### Étape 2 : Importer le projet
1. Cliquez sur "Add new site" > "Import an existing project"
2. Sélectionnez votre dépôt GitHub
3. Configurez :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`

#### Étape 3 : Déployer
1. Cliquez sur "Deploy site"
2. Votre site sera disponible à : `https://votre-projet.netlify.app`

---

### Option 3 : GitHub Pages

#### Étape 1 : Installer gh-pages (si pas déjà installé)
```bash
npm install --save-dev gh-pages
```

#### Étape 2 : Modifier package.json
Ajoutez ces scripts dans `package.json` :
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://Ble-coding.github.io/connect-sante-plus"
}
```

#### Étape 3 : Configurer vite.config.ts
Ajoutez `base: '/connect-sante-plus/'` dans la config :
```typescript
export default defineConfig({
  base: '/connect-sante-plus/',
  // ... reste de la config
});
```

#### Étape 4 : Déployer
```bash
npm run deploy
```

---

### Option 4 : Surge.sh (Simple et Rapide)

#### Étape 1 : Installer Surge
```bash
npm install -g surge
```

#### Étape 2 : Builder le projet
```bash
npm run build
```

#### Étape 3 : Déployer
```bash
cd dist
surge
```

Suivez les instructions pour créer un compte et choisir un nom de domaine.

---

### Option 5 : Firebase Hosting

#### Étape 1 : Installer Firebase CLI
```bash
npm install -g firebase-tools
```

#### Étape 2 : Se connecter
```bash
firebase login
```

#### Étape 3 : Initialiser Firebase
```bash
firebase init hosting
```

Choisissez :
- Public directory : `dist`
- Single-page app : `Yes`
- Overwrite index.html : `No`

#### Étape 4 : Builder et déployer
```bash
npm run build
firebase deploy
```

---

## 🔧 Configuration Avant Déploiement

### 1. Vérifier les Variables d'Environnement

Créez un fichier `.env.production` si nécessaire :
```env
VITE_API_URL=https://api.pharmafriconnect.africa
VITE_APP_NAME=PharmaConnect
```

### 2. Optimiser le Build

Le build Vite est déjà optimisé, mais vous pouvez ajouter :

#### vite.config.ts - Optimisations supplémentaires
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
});
```

---

## 📝 Checklist Avant Déploiement

- [ ] ✅ Tester le build localement avec `npm run build && npm run preview`
- [ ] ✅ Vérifier que toutes les routes fonctionnent
- [ ] ✅ Vérifier les images et assets
- [ ] ✅ Tester sur mobile (responsive)
- [ ] ✅ Vérifier les liens externes
- [ ] ✅ Vérifier que l'email de contact est correct
- [ ] ✅ Vérifier le logo et les couleurs
- [ ] ✅ Tester les formulaires
- [ ] ✅ Vérifier la console du navigateur pour les erreurs

---

## 🌐 Configuration du Domaine Personnalisé

### Sur Vercel
1. Allez dans Project Settings > Domains
2. Ajoutez votre domaine (ex: `pharmafriconnect.africa`)
3. Configurez les DNS selon les instructions
4. Attendez la propagation DNS (peut prendre 24h)

### Sur Netlify
1. Domain settings > Add custom domain
2. Suivez les instructions DNS
3. Activez le HTTPS automatique

---

## 🔄 Déploiement Continu (CI/CD)

### Vercel et Netlify
Le déploiement automatique est activé par défaut :
- Chaque push sur `main` ou `v1` déclenche un nouveau déploiement
- Les Pull Requests génèrent des previews automatiques

---

## 📊 Monitoring Post-Déploiement

### Outils recommandés
1. **Google Analytics** - Suivi des visiteurs
2. **Sentry** - Gestion des erreurs
3. **Vercel Analytics** - Performance et analytics

---

## 🆘 Résolution de Problèmes

### Erreur "404 Not Found" sur les routes
**Solution** : Configurez les redirects pour le SPA :
- Vercel : Créez `vercel.json` avec redirects
- Netlify : Créez `_redirects` dans `public/`

### Les images ne s'affichent pas
**Solution** : Vérifiez que les chemins sont relatifs (`/image.png` et non `./image.png`)

### Erreurs de build
**Solution** : 
1. Supprimez `node_modules` et `dist`
2. Réinstallez : `npm install`
3. Rebuild : `npm run build`

---

## 📞 Support

Pour toute question, contactez : Info@pharmafriconnect.africa

---

**Bon déploiement ! 🚀**

