# Palette de Couleurs Finale

## Date : Aujourd'hui

## Nouvelle Palette Simplifiée

Cette palette utilise uniquement 3 couleurs principales, créant une identité visuelle claire et cohérente.

---

## 🎨 Les 3 Couleurs Principales

### Blue Zodiac (Bleu Foncé) - PRIMARY
- **Hex** : `#0e1f37`
- **RGB** : `rgba(14,31,55,1)`
- **HSL** : `215 58% 13%`
- **Usage** : **Couleur principale (primary)**
- **Rôle** : Boutons CTA, liens importants, éléments principaux, patients
- **Signification** : Confiance, professionnalisme, stabilité

### Eucalyptus (Vert Moyen)
- **Hex** : `#269d64`
- **RGB** : `rgba(38,157,100,1)`
- **HSL** : `150 60% 38%`
- **Usage** : Couleur secondaire (secondary) et accent
- **Rôle** : Éléments secondaires, pharmacies, accents
- **Signification** : Équilibre, stabilité, nature

### Green Haze (Vert Vif)
- **Hex** : `#00ae4a`
- **RGB** : `rgba(0,174,74,1)`
- **HSL** : `140 100% 34%`
- **Usage** : Couleur d'accent
- **Rôle** : Médecins, éléments d'accentuation
- **Signification** : Vitalité, croissance, santé

---

## 🔄 Mapping des Couleurs

### Variables Pharma (compatibilité)

| Variable | Couleur | Hex | Usage |
|----------|---------|-----|-------|
| `pharma.primary` | **Blue Zodiac** | `#0e1f37` | **Couleur principale** |
| `pharma.secondary` | Eucalyptus | `#269d64` | Couleur secondaire |
| `pharma.accent` | Eucalyptus | `#269d64` | Accent |
| `pharma.patient` | Blue Zodiac | `#0e1f37` | Zones patients |
| `pharma.doctor` | Green Haze | `#00ae4a` | Zones médecins |
| `pharma.pharmacy` | Eucalyptus | `#269d64` | Zones pharmacies |
| `pharma.light` | Off Green | `#e6f9f0` | Arrière-plans clairs |
| `pharma.muted` | Gris neutre | `#64748B` | Texte secondaire |
| `pharma.dark` | Blue Zodiac | `#0e1f37` | Éléments foncés |

### Variables CSS (shadcn/ui)

| Variable | Couleur | HSL | Usage |
|----------|---------|-----|-------|
| `--primary` | **Blue Zodiac** | `215 58% 13%` | **Boutons, CTA principaux** |
| `--secondary` | Eucalyptus | `150 60% 38%` | Éléments secondaires |
| `--accent` | Eucalyptus | `150 60% 38%` | Accents |
| `--muted` | Gris neutre | `207 12% 40%` | Texte secondaire |

### Accès Direct aux Couleurs

| Nom | Variable Tailwind | Hex | Usage |
|-----|-------------------|-----|-------|
| Blue Zodiac | `pharma.blue-zodiac` | `#0e1f37` | Accès direct |
| Eucalyptus | `pharma.eucalyptus` | `#269d64` | Accès direct |
| Green Haze | `pharma.green-haze` | `#00ae4a` | Accès direct |

---

## 📝 Fichiers Modifiés

1. ✅ `tailwind.config.ts` - Palette simplifiée avec 3 couleurs
2. ✅ `src/index.css` - Variables CSS mises à jour

---

## ✅ Application Automatique

Les nouvelles couleurs sont automatiquement appliquées à :
- ✅ Tous les boutons utilisant `bg-pharma-primary` (Green Haze)
- ✅ Les titres et textes avec `text-pharma-primary`
- ✅ Les sections avec fond coloré
- ✅ Les dashboards (patient, médecin, pharmacie)
- ✅ Les composants shadcn/ui utilisant `--primary`, `--secondary`, etc.

---

## 🎯 Couleurs par Rôle

### Patient
- **Couleur** : Blue Zodiac (`#0e1f37`) - **PRIMARY**
- **Utilisation** : Zones et éléments spécifiques aux patients
- **Caractéristique** : Bleu très foncé pour la confiance et la sécurité

### Médecin
- **Couleur** : Green Haze (`#00ae4a`)
- **Utilisation** : Zones et éléments spécifiques aux médecins
- **Caractéristique** : Vert vif pour la vitalité et la santé

### Pharmacie
- **Couleur** : Eucalyptus (`#269d64`)
- **Utilisation** : Zones et éléments spécifiques aux pharmacies
- **Caractéristique** : Vert moyen pour l'équilibre et la fiabilité

---

## 🌈 Exemples d'Utilisation

### En CSS/Tailwind
```css
/* Utilisation directe */
.bg-blue-zodiac { background-color: #0e1f37; }
.bg-eucalyptus { background-color: #269d64; }
.bg-green-haze { background-color: #00ae4a; }

/* Utilisation via variables pharma */
.bg-pharma-primary { /* #00ae4a - Green Haze */ }
.text-pharma-primary { /* #00ae4a */ }
.bg-pharma-secondary { /* #269d64 - Eucalyptus */ }
.bg-pharma-patient { /* #0e1f37 - Blue Zodiac */ }
```

### En Classes Tailwind
```jsx
<div className="bg-pharma-primary text-white">
  Bouton principal (Blue Zodiac)
</div>

<div className="bg-pharma-secondary text-white">
  Bouton secondaire (Eucalyptus)
</div>

<div className="bg-pharma-patient text-white">
  Zone patient (Blue Zodiac)
</div>
```

---

## 📊 Harmonisation

Cette palette simplifiée crée une harmonie naturelle :
- **Bleu principal** : Blue Zodiac comme couleur principale offre professionnalisme et confiance
- **Accents verts** : Green Haze et Eucalyptus créent une cohérence naturelle
- **Simplicité** : 3 couleurs principales pour une identité claire

---

## 🎨 Variations Utilitaires

En plus des 3 couleurs principales, des variations utilitaires sont disponibles :
- **Light** : `#e6f9f0` - Variante claire du vert pour les arrière-plans
- **Muted** : `#64748B` - Gris neutre pour le texte secondaire
- **Dark** : `#0e1f37` - Blue Zodiac pour les éléments foncés

---

## 🔧 Personnalisation

Toutes les couleurs sont disponibles individuellement dans `tailwind.config.ts` :
- `pharma.blue-zodiac` - `#0e1f37`
- `pharma.eucalyptus` - `#269d64`
- `pharma.green-haze` - `#00ae4a`

---

**La palette simplifiée est maintenant intégrée et prête à l'emploi !** 🎨

