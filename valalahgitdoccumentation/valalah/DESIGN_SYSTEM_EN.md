# Valalah Design System

Complete documentation of the CSS design system used in Valalah, including custom utility classes, color conventions, and best practices.

---

## Table of Contents

- [Custom Utility Classes](#custom-utility-classes)
- [Color System](#color-system)
- [Shadcn Components](#shadcn-components)
- [Interactions and Animations](#interactions-and-animations)
- [Layout and Spacing](#layout-and-spacing)
- [Best Practices](#best-practices)

---

## Custom Utility Classes

### `hover-elevate`

Applies a subtle elevation of the background color on hover, compatible with any background color.

```tsx
<div className="bg-accent hover-elevate">
  Hover me to see the effect
</div>
```

**Features:**
- ✅ Works with any background color
- ✅ Automatically adapts to light/dark mode
- ✅ Smooth transition (150ms)
- ❌ Does NOT work with `overflow-hidden` or `overflow-scroll`

**Recommended use:**
- Interactive cards
- Custom buttons
- Navigation elements

**Avoid:**
- Do NOT use on `<Button>` or `<Badge>` (already integrated)
- Do NOT combine with `overflow-hidden`

---

### `active-elevate-2`

Applies a more pronounced elevation on click/press, simulating a press effect.

```tsx
<div className="bg-primary hover-elevate active-elevate-2">
  Click me
</div>
```

**Features:**
- ✅ Stronger elevation than `hover-elevate`
- ✅ Compatible with all colors
- ✅ Adapts to theme (light/dark)
- ❌ Incompatible with `overflow-hidden/scroll`

**Recommended use:**
- Custom interactive buttons
- Clickable cards
- Action elements

---

### `toggle-elevate` and `toggle-elevated`

Transforms any element into a toggle button with visual state.

```tsx
const [isActive, setIsActive] = useState(false);

<Button 
  variant="ghost" 
  className={cn("toggle-elevate", isActive && "toggle-elevated")}
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? "Active" : "Inactive"}
</Button>
```

**Features:**
- ✅ Works with `hover-elevate` and `active-elevate-2`
- ✅ Clear visual state (elevated when active)
- ✅ Compatible with all Button variants

---

### `no-default-hover-elevate` and `no-default-active-elevate`

Disables default elevations from Shadcn components.

```tsx
<Badge className="no-default-hover-elevate">
  Badge without hover effect
</Badge>

<Button className="no-default-active-elevate">
  Button without active effect
</Button>
```

---

## Color System

### Custom CSS Variables

All colors are defined in `client/src/index.css` in HSL format.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 262 83% 58%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

### Text Contrast Levels

The design system uses **3 levels** of text color:

1. **Default** (`text-foreground`) - Primary text
2. **Secondary** (`text-muted-foreground`) - Secondary information
3. **Tertiary** (`text-muted-foreground/70`) - Tertiary information

```tsx
<div>
  <h2 className="text-foreground">Main Title</h2>
  <p className="text-muted-foreground">Secondary description</p>
  <span className="text-muted-foreground/70">Metadata</span>
</div>
```

### Contrast Rule

**Light text on light background = ❌ Forbidden**  
**Dark text on dark background = ❌ Forbidden**

Always verify contrast between text and its background.

---

## Shadcn Components

### Button

The `<Button>` component **automatically** integrates `hover-elevate` and `active-elevate-2`.

```tsx
// ✅ GOOD - No need to add hover/active
<Button variant="default">Click me</Button>

// ❌ BAD - Redundant
<Button className="hover-elevate">Click me</Button>

// ✅ GOOD - Custom background works with integrated elevations
<Button className="bg-accent border-accent">Custom</Button>
```

**Available variants:**
- `default` - Primary purple button
- `secondary` - Secondary button (use only on `bg-background` or `bg-card`)
- `outline` - Button with border (perfect on images with blurred background)
- `ghost` - Transparent button
- `destructive` - Destructive action button (red)
- `link` - Link-style button

**Available sizes:**
- `default` - `min-h-9`
- `sm` - `min-h-8`
- `lg` - `min-h-10`
- `icon` - `h-9 w-9` (for icons only)

**Important rule:**
- Buttons on the **same line** must have the **same height**.
- `<Badge>` components can have a different (smaller) height.

```tsx
// ✅ GOOD - Same height (default = min-h-9, icon = h-9)
<Button>Action</Button>
<Button size="icon"><Plus /></Button>

// ❌ BAD - Different heights
<Button size="sm">Action</Button>
<Button size="icon"><Plus /></Button>
```

---

### Badge

`<Badge>` components also integrate `hover-elevate` and `active-elevate-2` automatically.

```tsx
<Badge variant="default">Premium</Badge>
<Badge variant="secondary">Early Adopter</Badge>
<Badge variant="outline">Beta</Badge>
```

**Features:**
- No line wrapping (content on single line)
- Hidden overflow automatically
- Must have space to grow in width

---

### Card

The `<Card>` component defines an elevated surface with background and border.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
</Card>
```

**Rules:**
- ❌ NEVER nest a `<Card>` inside another `<Card>`
- ✅ Add `hover-elevate` to make a card interactive
- ✅ Cards must have padding in their parent container (not touching edges)

```tsx
// ✅ GOOD - Card with space around
<div className="p-4">
  <Card>...</Card>
</div>

// ❌ BAD - Card touching edges
<div>
  <Card>...</Card>
</div>
```

---

### Sidebar (Shadcn)

**ALWAYS** use Shadcn's Sidebar component (`@/components/ui/sidebar`).

```tsx
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";

function App() {
  const style = {
    "--sidebar-width": "20rem",       // Custom width
    "--sidebar-width-icon": "4rem",   // Icon mode width
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {/* Content */}
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

**Rules:**
- ❌ NEVER set `width` directly on `<Sidebar>`
- ✅ Use CSS variables `--sidebar-width` on `<SidebarProvider>`
- ✅ Direct child of `<SidebarProvider>` MUST have `className="w-full"`

---

## Interactions and Animations

### Elevations

Elevations simulate visual "height" by adjusting brightness.

**Elevation scale:**
1. **Rest** - Default state
2. **Hover** - +1 brightness level (`hover-elevate`)
3. **Active** - +2 brightness levels (`active-elevate-2`)
4. **Toggle ON** - +1.5 brightness levels (`toggle-elevated`)

### Transitions

All transitions use `transition-colors duration-150`.

```tsx
<div className="transition-colors duration-150 hover:bg-accent">
  Smooth transition
</div>
```

### Transform (scale)

Transforms must be **subtle**:

```tsx
// ✅ GOOD - Subtle transform
<Button className="hover:scale-[1.02]">Subtle</Button>

// ❌ BAD - Too pronounced transform
<Button className="hover:scale-110">Too visible</Button>
```

---

## Layout and Spacing

### Consistent Spacing

Use **3 levels** of spacing:
- **Small** - `p-2`, `gap-2`, `space-x-2`
- **Medium** - `p-4`, `gap-4`, `space-x-4`
- **Large** - `p-6`, `gap-6`, `space-x-6`

### Layout Rules

1. **No layout shift on hover** - Use `visibility: hidden` instead of `display: none`
2. **Sticky elements** - Always with high `z-index`
3. **Justify-between/around** - Always combine with `gap` or `space-x`

```tsx
// ✅ GOOD - gap prevents spacing issues
<div className="flex justify-between gap-2">
  <span>Left</span>
  <span>Right</span>
</div>

// ❌ BAD - No gap
<div className="flex justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

4. **Flex rows** with `justify-start/end` - Always with `flex-wrap`

```tsx
// ✅ GOOD
<div className="flex flex-wrap gap-2">
  {items.map(...)}
</div>

// ❌ BAD - No flex-wrap
<div className="flex gap-2">
  {items.map(...)}
</div>
```

---

## Best Practices

### ✅ Do

- Use default Shadcn components (`<Button>`, `<Card>`, `<Badge>`)
- Apply `hover-elevate` on custom interactive elements
- Check text/background contrast in light AND dark mode
- Keep border-radius small (`rounded-md`)
- Use subtle elevations

### ❌ Don't

- Do NOT create your own components if Shadcn exists
- Do NOT add `hover:bg-*` on `<Button>` or `<Badge>`
- Do NOT use `display: table` (overflows container)
- Do NOT nest `<Card>` inside `<Card>`
- Do NOT apply borders on 1-3 sides if element has `rounded`
- Do NOT use `overflow-hidden` with `hover-elevate`

### Images and Hero Sections

For Hero sections with background images:

```tsx
<div className="relative h-96 bg-cover" style={{backgroundImage: 'url(...)'}}>
  {/* Dark gradient for readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
  
  {/* Content with light text */}
  <div className="relative z-10 text-white">
    <h1>Visible Title</h1>
    <Button variant="outline" className="backdrop-blur-sm">Action</Button>
  </div>
</div>
```

**Rule:** Always add a dark gradient on background images to ensure text readability.

---

## Complete Examples

### Interactive Card

```tsx
<Card className="hover-elevate cursor-pointer" onClick={handleClick}>
  <CardHeader className="flex flex-row items-center justify-between gap-2">
    <CardTitle>Title</CardTitle>
    <Badge variant="secondary">New</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Description</p>
  </CardContent>
</Card>
```

### Custom Toggle Button

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

### Sidebar Navigation

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

For any questions about the design system:
- Check the `client/src/index.css` file for custom classes
- Shadcn UI Documentation: https://ui.shadcn.com
- Tailwind CSS Documentation: https://tailwindcss.com

---

**Valalah Design System v1.0** - November 2025
