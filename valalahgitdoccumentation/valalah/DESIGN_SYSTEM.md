# Valalah Design System

Documentation complète du système de design CSS utilisé dans Valalah, incluant les classes utilitaires personnalisées, les conventions de couleurs, et les bonnes pratiques.

---

## Table des matières

- [Classes utilitaires personnalisées](#classes-utilitaires-personnalisées)
- [Système de couleurs](#système-de-couleurs)
- [Composants Shadcn](#composants-shadcn)
- [Interactions et animations](#interactions-et-animations)
- [Layout et espacement](#layout-et-espacement)
- [Bonnes pratiques](#bonnes-pratiques)

---

## Classes utilitaires personnalisées

### `hover-elevate`

Applique une élévation subtile de la couleur de fond lors du survol, compatible avec n'importe quelle couleur de fond.

```tsx
<div className="bg-accent hover-elevate">
  Survole-moi pour voir l'effet
</div>
```

**Caractéristiques :**
- ✅ Fonctionne avec n'importe quelle couleur de fond
- ✅ S'adapte automatiquement au mode clair/sombre
- ✅ Transition douce (150ms)
- ❌ Ne fonctionne PAS avec `overflow-hidden` ou `overflow-scroll`

**Utilisation recommandée :**
- Cards interactives
- Boutons personnalisés
- Éléments de navigation

**À éviter :**
- Ne PAS utiliser sur `<Button>` ou `<Badge>` (déjà intégré)
- Ne PAS combiner avec `overflow-hidden`

---

### `active-elevate-2`

Applique une élévation plus marquée lors du clic/press, simulant un effet de pression.

```tsx
<div className="bg-primary hover-elevate active-elevate-2">
  Clique-moi
</div>
```

**Caractéristiques :**
- ✅ Élévation plus forte que `hover-elevate`
- ✅ Compatible avec toutes les couleurs
- ✅ S'adapte au thème (clair/sombre)
- ❌ Incompatible avec `overflow-hidden/scroll`

**Utilisation recommandée :**
- Boutons personnalisés interactifs
- Cards cliquables
- Éléments d'action

---

### `toggle-elevate` et `toggle-elevated`

Transforme n'importe quel élément en bouton toggle avec état visuel.

```tsx
const [isActive, setIsActive] = useState(false);

<Button 
  variant="ghost" 
  className={cn("toggle-elevate", isActive && "toggle-elevated")}
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? "Activé" : "Désactivé"}
</Button>
```

**Caractéristiques :**
- ✅ Fonctionne avec `hover-elevate` et `active-elevate-2`
- ✅ État visuel clair (élevé quand actif)
- ✅ Compatible avec tous les variants de Button

---

### `no-default-hover-elevate` et `no-default-active-elevate`

Désactive les élévations par défaut des composants Shadcn.

```tsx
<Badge className="no-default-hover-elevate">
  Badge sans effet hover
</Badge>

<Button className="no-default-active-elevate">
  Bouton sans effet active
</Button>
```

---

## Système de couleurs

### Variables CSS personnalisées

Toutes les couleurs sont définies dans `client/src/index.css` en format HSL.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 262 83% 58%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

### Niveaux de contraste de texte

Le design system utilise **3 niveaux** de couleur de texte :

1. **Default** (`text-foreground`) - Texte principal
2. **Secondary** (`text-muted-foreground`) - Informations secondaires
3. **Tertiary** (`text-muted-foreground/70`) - Informations tertiaires

```tsx
<div>
  <h2 className="text-foreground">Titre principal</h2>
  <p className="text-muted-foreground">Description secondaire</p>
  <span className="text-muted-foreground/70">Métadonnées</span>
</div>
```

### Règle de contraste

**Texte clair sur fond clair = ❌ Interdit**  
**Texte sombre sur fond sombre = ❌ Interdit**

Toujours vérifier le contraste entre le texte et son arrière-plan.

---

## Composants Shadcn

### Button

Le composant `<Button>` intègre **automatiquement** `hover-elevate` et `active-elevate-2`.

```tsx
// ✅ BON - Pas besoin d'ajouter hover/active
<Button variant="default">Cliquez-moi</Button>

// ❌ MAUVAIS - Redondant
<Button className="hover-elevate">Cliquez-moi</Button>

// ✅ BON - Background personnalisé fonctionne avec les élévations intégrées
<Button className="bg-accent border-accent">Custom</Button>
```

**Variants disponibles :**
- `default` - Bouton primaire violet
- `secondary` - Bouton secondaire (à utiliser uniquement sur `bg-background` ou `bg-card`)
- `outline` - Bouton avec bordure (parfait sur images avec fond flouté)
- `ghost` - Bouton transparent
- `destructive` - Bouton d'action destructive (rouge)
- `link` - Bouton style lien

**Sizes disponibles :**
- `default` - `min-h-9`
- `sm` - `min-h-8`
- `lg` - `min-h-10`
- `icon` - `h-9 w-9` (pour icônes uniquement)

**Règle importante :**
- Les boutons sur la **même ligne** doivent avoir la **même hauteur**.
- Les `<Badge>` peuvent avoir une hauteur différente (plus petite).

```tsx
// ✅ BON - Même hauteur (default = min-h-9, icon = h-9)
<Button>Action</Button>
<Button size="icon"><Plus /></Button>

// ❌ MAUVAIS - Hauteurs différentes
<Button size="sm">Action</Button>
<Button size="icon"><Plus /></Button>
```

---

### Badge

Les `<Badge>` intègrent aussi `hover-elevate` et `active-elevate-2` automatiquement.

```tsx
<Badge variant="default">Premium</Badge>
<Badge variant="secondary">Early Adopter</Badge>
<Badge variant="outline">Beta</Badge>
```

**Caractéristiques :**
- Pas de retour à la ligne (contenu sur une seule ligne)
- Overflow caché automatiquement
- Doit avoir de l'espace pour grandir en largeur

---

### Card

Le composant `<Card>` définit une surface élevée avec fond et bordure.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Titre de la card</CardTitle>
  </CardHeader>
  <CardContent>
    Contenu de la card
  </CardContent>
</Card>
```

**Règles :**
- ❌ Ne JAMAIS imbriquer une `<Card>` dans une autre `<Card>`
- ✅ Ajouter `hover-elevate` pour rendre une card interactive
- ✅ Cards doivent avoir du padding dans leur conteneur parent (pas toucher les bords)

```tsx
// ✅ BON - Card avec espace autour
<div className="p-4">
  <Card>...</Card>
</div>

// ❌ MAUVAIS - Card touche les bords
<div>
  <Card>...</Card>
</div>
```

---

### Sidebar (Shadcn)

Utiliser **TOUJOURS** le composant Sidebar de Shadcn (`@/components/ui/sidebar`).

```tsx
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";

function App() {
  const style = {
    "--sidebar-width": "20rem",       // Largeur personnalisée
    "--sidebar-width-icon": "4rem",   // Largeur en mode icône
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {/* Contenu */}
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          {/* Page */}
        </main>
      </div>
    </SidebarProvider>
  );
}
```

**Règles :**
- ❌ Ne JAMAIS définir `width` directement sur `<Sidebar>`
- ✅ Utiliser les CSS variables `--sidebar-width` sur `<SidebarProvider>`
- ✅ L'enfant direct de `<SidebarProvider>` DOIT avoir `className="w-full"`

---

## Interactions et animations

### Élévations

Les élévations simulent une "hauteur" visuelle en ajustant la luminosité.

**Échelle d'élévation :**
1. **Repos** - État par défaut
2. **Hover** - +1 niveau de luminosité (`hover-elevate`)
3. **Active** - +2 niveaux de luminosité (`active-elevate-2`)
4. **Toggle ON** - +1.5 niveaux de luminosité (`toggle-elevated`)

### Transitions

Toutes les transitions utilisent `transition-colors duration-150`.

```tsx
<div className="transition-colors duration-150 hover:bg-accent">
  Transition douce
</div>
```

### Transform (scale)

Les transforms doivent être **subtiles** :

```tsx
// ✅ BON - Transform subtile
<Button className="hover:scale-[1.02]">Subtil</Button>

// ❌ MAUVAIS - Transform trop marquée
<Button className="hover:scale-110">Trop visible</Button>
```

---

## Layout et espacement

### Espacement consistant

Utiliser **3 niveaux** d'espacement :
- **Small** - `p-2`, `gap-2`, `space-x-2`
- **Medium** - `p-4`, `gap-4`, `space-x-4`
- **Large** - `p-6`, `gap-6`, `space-x-6`

### Règles de layout

1. **Pas de layout shift au hover** - Utiliser `visibility: hidden` au lieu de `display: none`
2. **Sticky elements** - Toujours avec `z-index` élevé
3. **Justify-between/around** - Toujours combiner avec `gap` ou `space-x`

```tsx
// ✅ BON - gap prévient les problèmes de spacing
<div className="flex justify-between gap-2">
  <span>Gauche</span>
  <span>Droite</span>
</div>

// ❌ MAUVAIS - Pas de gap
<div className="flex justify-between">
  <span>Gauche</span>
  <span>Droite</span>
</div>
```

4. **Flex rows** avec `justify-start/end` - Toujours avec `flex-wrap`

```tsx
// ✅ BON
<div className="flex flex-wrap gap-2">
  {items.map(...)}
</div>

// ❌ MAUVAIS - Pas de flex-wrap
<div className="flex gap-2">
  {items.map(...)}
</div>
```

---

## Bonnes pratiques

### ✅ À faire

- Utiliser les composants Shadcn par défaut (`<Button>`, `<Card>`, `<Badge>`)
- Appliquer `hover-elevate` sur les éléments personnalisés interactifs
- Vérifier le contraste texte/fond en mode clair ET sombre
- Garder les border-radius petits (`rounded-md`)
- Utiliser des élévations subtiles

### ❌ À éviter

- Ne PAS créer ses propres composants si Shadcn existe
- Ne PAS ajouter `hover:bg-*` sur `<Button>` ou `<Badge>`
- Ne PAS utiliser `display: table` (déborde du conteneur)
- Ne PAS imbriquer des `<Card>` dans des `<Card>`
- Ne PAS appliquer des bordures sur 1-3 côtés si l'élément a `rounded`
- Ne PAS utiliser `overflow-hidden` avec `hover-elevate`

### Images et Hero sections

Pour les Hero sections avec images de fond :

```tsx
<div className="relative h-96 bg-cover" style={{backgroundImage: 'url(...)'}}>
  {/* Gradient sombre pour lisibilité */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
  
  {/* Contenu avec texte clair */}
  <div className="relative z-10 text-white">
    <h1>Titre visible</h1>
    <Button variant="outline" className="backdrop-blur-sm">Action</Button>
  </div>
</div>
```

**Règle :** Toujours ajouter un gradient sombre sur les images de fond pour garantir la lisibilité du texte.

---

## Exemples complets

### Card interactive

```tsx
<Card className="hover-elevate cursor-pointer" onClick={handleClick}>
  <CardHeader className="flex flex-row items-center justify-between gap-2">
    <CardTitle>Titre</CardTitle>
    <Badge variant="secondary">New</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Description</p>
  </CardContent>
</Card>
```

### Bouton toggle personnalisé

```tsx
const [isActive, setIsActive] = useState(false);

<Button
  variant="ghost"
  size="icon"
  className={cn("toggle-elevate", isActive && "toggle-elevated")}
  onClick={() => setIsActive(!isActive)}
>
  <Star className={cn(isActive && "fill-current text-primary")} />
</Button>
```

### Navigation sidebar

```tsx
<Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

---

## Support

Pour toute question sur le système de design :
- Consultez le fichier `client/src/index.css` pour les classes personnalisées
- Documentation Shadcn UI : https://ui.shadcn.com
- Documentation Tailwind CSS : https://tailwindcss.com

---

**Valalah Design System v1.0** - Novembre 2025
