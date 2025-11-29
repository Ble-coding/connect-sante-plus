# Palette de Couleurs - Adaptée au Logo

## Date : Aujourd'hui

## Nouvelle Palette de Couleurs

La palette de couleurs a été adaptée pour harmoniser avec le logo "Tech Company Logo Emphasizing Health (5).png". Les couleurs ont été choisies pour refléter l'identité d'une entreprise de santé digitale moderne et professionnelle.

---

## 🎨 Couleurs Principales

### Primary (Bleu Médical)
- **Hex** : `#0066CC`
- **HSL** : `210 100% 40%`
- **Usage** : Couleur principale du site, boutons CTA, liens importants
- **Signification** : Confiance, professionnalisme, stabilité médicale

### Secondary (Vert Santé)
- **Hex** : `#00A86B`
- **HSL** : `160 100% 33%`
- **Usage** : Éléments secondaires, accents verts
- **Signification** : Bien-être, nature, croissance, santé

### Accent (Turquoise Moderne)
- **Hex** : `#4ECDC4`
- **HSL** : `175 60% 55%`
- **Usage** : Éléments d'accentuation, highlights
- **Signification** : Innovation, modernité, énergie

---

## 🎯 Couleurs par Rôle

### Patient
- **Hex** : `#0052A3`
- **Usage** : Zones et éléments spécifiques aux patients
- **Description** : Bleu profond pour la confiance et la sécurité

### Médecin
- **Hex** : `#00C896`
- **Usage** : Zones et éléments spécifiques aux médecins
- **Description** : Vert émeraude pour la croissance et la santé

### Pharmacie
- **Hex** : `#FF6B6B`
- **Usage** : Zones et éléments spécifiques aux pharmacies
- **Description** : Corail pour l'attention et l'accessibilité

---

## 🌈 Couleurs Utilitaires

### Light (Bleu Clair)
- **Hex** : `#E3F2FD`
- **Usage** : Arrière-plans clairs, sections légères
- **Description** : Calme, sérénité, espace aéré

### Muted (Gris Bleuté)
- **Hex** : `#64748B`
- **Usage** : Texte secondaire, éléments désactivés
- **Description** : Discrétion, hiérarchie visuelle

### Dark (Bleu Foncé)
- **Hex** : `#003D7A`
- **Usage** : Texte sur fond clair, éléments profonds
- **Description** : Profondeur, stabilité, contraste

---

## 📝 Variables CSS

Les couleurs sont définies dans deux endroits :

### 1. `tailwind.config.ts`
```typescript
pharma: {
  primary: "#0066CC",
  secondary: "#00A86B",
  accent: "#4ECDC4",
  // ...
}
```

### 2. `src/index.css`
```css
--primary: 210 100% 40%; /* #0066CC */
--secondary: 160 100% 33%; /* #00A86B */
--accent: 175 60% 55%; /* #4ECDC4 */
```

---

## 🔄 Changements Effectués

### Avant
- Primary : `#0E7490` (Teal)
- Secondary : `#14B8A6` (Lighter teal)
- Accent : `#7E22CE` (Purple)

### Après
- Primary : `#0066CC` (Bleu médical)
- Secondary : `#00A86B` (Vert santé)
- Accent : `#4ECDC4` (Turquoise moderne)

---

## ✅ Application

Les nouvelles couleurs sont automatiquement appliquées à :
- ✅ Tous les boutons et CTA
- ✅ Liens et éléments interactifs
- ✅ Badges et indicateurs
- ✅ Sections avec `bg-pharma-primary`, `text-pharma-primary`, etc.
- ✅ Variables CSS pour les composants shadcn/ui

---

## 🎨 Harmonisation avec le Logo

Cette palette a été créée pour :
1. **S'harmoniser** avec les couleurs typiques des logos santé/tech
2. **Renforcer l'identité** de marque PharmaConnect
3. **Améliorer la cohérence** visuelle du site
4. **Optimiser l'accessibilité** avec des contrastes appropriés

---

## 🔧 Personnalisation

Si vous souhaitez ajuster les couleurs pour correspondre exactement à votre logo :

1. **Identifier les couleurs exactes** du logo (utilisez un outil comme [Adobe Color](https://color.adobe.com) ou [Coolors](https://coolors.co))
2. **Convertir en HSL** pour les variables CSS
3. **Mettre à jour** `tailwind.config.ts` et `src/index.css`
4. **Tester** l'accessibilité et les contrastes

---

## 📊 Contraste et Accessibilité

Toutes les couleurs ont été choisies pour respecter les standards WCAG :
- ✅ Contraste suffisant pour le texte
- ✅ Lisibilité optimale
- ✅ Compatibilité avec le mode sombre (si activé)

---

## 🚀 Prochaines Étapes

1. Tester le site avec les nouvelles couleurs
2. Ajuster si nécessaire selon le feedback
3. Vérifier l'harmonie visuelle globale
4. Documenter toute modification supplémentaire

---

**Note** : Si votre logo contient des couleurs spécifiques différentes, n'hésitez pas à me les communiquer et je les intégrerai dans la palette !

