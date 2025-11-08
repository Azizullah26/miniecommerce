# Design Guidelines: eCommerce Product Listing Module

## Design Approach

**System-Based Approach**: Material Design principles adapted for data-dense admin interfaces. This is a utility-focused application prioritizing efficiency, scannability, and clear data presentation over visual storytelling.

## Core Design Principles

1. **Information Hierarchy**: Clear visual separation between data table, filters, and actions
2. **Efficiency First**: Minimize clicks, maximize scannability
3. **Data Clarity**: Tabular layouts with clear headers and aligned columns
4. **Responsive Utility**: Desktop-first with graceful mobile degradation

---

## Typography

**Font Stack**: Inter or Roboto via Google Fonts CDN

**Hierarchy**:
- Page Title: text-2xl font-semibold (32px)
- Section Headers: text-lg font-medium (18px)
- Data Table Headers: text-sm font-semibold uppercase tracking-wide (14px)
- Body/Data: text-base (16px)
- Helper Text: text-sm (14px)
- Labels: text-sm font-medium (14px)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Component padding: p-4 or p-6
- Section gaps: gap-6 or gap-8
- Form field spacing: space-y-4
- Table cell padding: px-4 py-3

**Container**:
- Max width: max-w-7xl mx-auto
- Page padding: px-4 md:px-6 lg:px-8
- Vertical spacing: py-6 md:py-8

---

## Component Library

### 1. **Page Layout**
- Header bar with page title and primary action (Add Product button)
- Filter/search bar section below header
- Main content area with product table
- Pagination controls at bottom

### 2. **Product Table**
- Full-width responsive table with fixed header row
- Columns: Product Name (40%), Price (15%), Category (20%), Stock Status (15%), Actions (10%)
- Alternating row treatment for scannability
- Mobile: Stack into cards with label-value pairs

### 3. **Filter Bar**
- Horizontal layout with search input and category dropdown
- Search: Full-width on mobile, 300px on desktop
- Category filter: Dropdown with "All Categories" default
- Clear filters link when filters active

### 4. **Add Product Form**
- Modal overlay approach OR dedicated page
- Form fields: Name (text), Price (number), Category (select), Stock Status (select)
- Field layout: Single column, full-width inputs
- Validation: Inline error messages below fields
- Actions: Primary "Add Product" button, Secondary "Cancel" button

### 5. **Pagination**
- Centered horizontal layout
- Previous/Next buttons with page numbers between
- Show max 7 page numbers with ellipsis for large sets
- Items per page selector (10, 25, 50)

### 6. **Buttons**
**Primary**: Rounded corners (rounded-md), medium padding (px-4 py-2), font-medium
**Secondary**: Similar sizing, outlined treatment
**Icon buttons**: Square (w-10 h-10), centered icon from Heroicons

### 7. **Form Inputs**
- Standard height: h-10
- Border treatment with rounded corners (rounded-md)
- Focus state: Prominent ring
- Error state: Red border with error message below
- Labels: Above input with mb-2

### 8. **Status Badges**
- Inline badges for stock status
- Rounded-full, px-3 py-1, text-xs font-medium
- "In Stock", "Low Stock", "Out of Stock" variants

### 9. **Empty States**
- Centered layout when no products
- Icon (from Heroicons: ShoppingCartIcon)
- Helpful message: "No products yet. Add your first product to get started."
- Primary CTA button below

---

## Responsive Behavior

**Desktop (lg:)**: 
- Full table view with all columns visible
- Horizontal filter bar
- Modal for add product form

**Tablet (md:)**:
- Table preserved, possible horizontal scroll
- Filter bar may stack

**Mobile (base)**:
- Table converts to card stack
- Each card shows all product details vertically
- Filters stack vertically
- Full-screen form on mobile

---

## Accessibility

- All form inputs have associated labels with htmlFor
- Focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Keyboard navigation support for table and pagination
- Screen reader announcements for form validation errors

---

## Icons

**Library**: Heroicons (outline style) via CDN

**Usage**:
- ShoppingCartIcon: Empty state
- PlusIcon: Add product button
- MagnifyingGlassIcon: Search input
- PencilIcon: Edit actions
- TrashIcon: Delete actions
- ChevronLeftIcon/ChevronRightIcon: Pagination

---

## Animations

**Minimal approach**:
- Modal: Fade in overlay + slide in content (200ms)
- Form validation: Shake animation on error (subtle)
- Table row hover: Simple background transition
- NO scroll animations, NO loading spinners beyond basic form submit states