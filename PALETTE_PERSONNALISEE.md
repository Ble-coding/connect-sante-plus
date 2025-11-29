# Palette de Couleurs Personnalisée

## Date : Aujourd'hui

## Nouvelle Palette de Couleurs

Cette palette de couleurs a été intégrée dans le projet selon vos spécifications.

---

## 🎨 Couleurs de la Palette

### Couleurs Principales

#### Salem (Vert Vif)
- **Hex** : `#0fa14d`
- **HSL** : `142 83% 35%`
- **RGB** : `rgba(15,161,77,1)`
- **Usage** : Couleur principale (primary) - vert vif
- **Rôle** : Médecin, éléments principaux

#### Blue Zodiac (Bleu Foncé)
- **Hex** : `#0e1f37`
- **RGB** : `rgba(14,31,55,1)`
- **Usage** : Couleur foncée pour contraste
- **Rôle** : Patient, texte foncé, éléments profonds

#### Genoa (Vert Moyen)
- **Hex** : `#15865e`
- **HSL** : `158 75% 30%`
- **RGB** : `rgba(21,134,94,1)`
- **Usage** : Couleur secondaire (secondary)
- **Rôle** : Pharmacie, éléments secondaires

#### Eden (Vert Foncé/Teal)
- **Hex** : `#106155`
- **RGB** : `rgba(16,97,85,1)`
- **Usage** : Vert foncé/teal
- **Rôle** : Éléments d'accentuation foncés

---

### Couleurs Légères

#### Off Green (Vert Très Clair)
- **Hex** : `#e6f9ee`
- **RGB** : `rgba(230,249,238,1)`
- **Usage** : Arrière-plan clair (light)
- **Rôle** : Sections légères, fonds

#### De York (Vert Clair)
- **Hex** : `#6fc298`
- **RGB** : `rgba(111,194,152,1)`
- **Usage** : Vert clair pour accents
- **Rôle** : Éléments d'accentuation clairs

#### Shadow Green (Teal Clair)
- **Hex** : `#93c4c4`
- **HSL** : `180 32% 63%`
- **RGB** : `rgba(147,196,196,1)`
- **Usage** : Accent (accent) - teal clair
- **Rôle** : Éléments d'accentuation modernes

---

### Couleurs Neutres

#### Shuttle Gray (Gris Bleuté)
- **Hex** : `#596974`
- **HSL** : `207 12% 40%`
- **RGB** : `rgba(89,105,116,1)`
- **Usage** : Couleur muted - texte secondaire
- **Rôle** : Texte secondaire, éléments désactivés

---

## 🔄 Mapping des Couleurs

### Variables Pharma (compatibilité)

| Variable | Couleur | Hex | Usage |
|----------|---------|-----|-------|
| `pharma.primary` | Salem | `#0fa14d` | Couleur principale |
| `pharma.secondary` | Genoa | `#15865e` | Couleur secondaire |
| `pharma.accent` | Shadow Green | `#93c4c4` | Accent |
| `pharma.patient` | Blue Zodiac | `#0e1f37` | Zones patients |
| `pharma.doctor` | Salem | `#0fa14d` | Zones médecins |
| `pharma.pharmacy` | Genoa | `#15865e` | Zones pharmacies |
| `pharma.light` | Off Green | `#e6f9ee` | Arrière-plans clairs |
| `pharma.muted` | Shuttle Gray | `#596974` | Texte secondaire |
| `pharma.dark` | Blue Zodiac | `#0e1f37` | Éléments foncés |

### Variables CSS (shadcn/ui)

| Variable | Couleur | HSL | Usage |
|----------|---------|-----|-------|
| `--primary` | Salem | `142 83% 35%` | Boutons, CTA |
| `--secondary` | Genoa | `158 75% 30%` | Éléments secondaires |
| `--accent` | Shadow Green | `180 32% 63%` | Accents |
| `--muted` | Shuttle Gray | `207 12% 40%` | Texte secondaire |

---

## 📝 Fichiers Modifiés

1. ✅ `tailwind.config.ts` - Palette pharma mise à jour avec toutes les couleurs
2. ✅ `src/index.css` - Variables CSS mises à jour en HSL

---

## ✅ Application Automatique

Les nouvelles couleurs sont automatiquement appliquées à :
- ✅ Tous les boutons utilisant `bg-pharma-primary`
- ✅ Les titres et textes utilisant `text-pharma-primary`
- ✅ Les badges et indicateurs
- ✅ Les sections avec fond coloré
- ✅ Les dashboards (patient, médecin, pharmacie)
- ✅ Les composants shadcn/ui utilisant `--primary`, `--secondary`, etc.

---

## 🎯 Couleurs par Rôle

### Patient
- **Couleur** : Blue Zodiac (`#0e1f37`)
- **Utilisation** : Zones et éléments spécifiques aux patients
- **Caractéristique** : Bleu très foncé pour la confiance et la stabilité

### Médecin
- **Couleur** : Salem (`#0fa14d`)
- **Utilisation** : Zones et éléments spécifiques aux médecins
- **Caractéristique** : Vert vif pour la vitalité et la santé

### Pharmacie
- **Couleur** : Genoa (`#15865e`)
- **Utilisation** : Zones et éléments spécifiques aux pharmacies
- **Caractéristique** : Vert moyen pour l'équilibre et la fiabilité

---

## 🌈 Exemples d'Utilisation

### En CSS/Tailwind
```css
/* Utilisation directe */
.bg-salem { background-color: #0fa14d; }
.text-blue-zodiac { color: #0e1f37; }

/* Utilisation via variables pharma */
.bg-pharma-primary { /* #0fa14d */ }
.text-pharma-primary { /* #0fa14d */ }
.bg-pharma-light { /* #e6f9ee */ }
```

### En Classes Tailwind
```jsx
<div className="bg-pharma-primary text-white">
  Bouton principal
</div>

<div className="bg-pharma-light text-pharma-primary">
  Section légère
</div>
```

---

## 📊 Harmonisation

Cette palette crée une harmonie naturelle :
- **Verts dominants** : Salem, Genoa, Eden créent une palette cohérente
- **Contraste** : Blue Zodiac offre un excellent contraste
- **Légèreté** : Off Green et Shadow Green apportent de la respiration
- **Neutralité** : Shuttle Gray pour les éléments secondaires

---

## 🔧 Personnalisation

Toutes les couleurs sont disponibles individuellement dans `tailwind.config.ts` :
- `pharma.salem`
- `pharma.blue-zodiac`
- `pharma.genoa`
- `pharma.eden`
- `pharma.off-green`
- `pharma.de-york`
- `pharma.shadow-green`
- `pharma.shuttle-gray`

---

**La palette est maintenant intégrée et prête à l'emploi !** 🎨

