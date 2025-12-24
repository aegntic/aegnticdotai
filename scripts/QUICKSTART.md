# Background Removal - Quick Start Guide

## ✅ What Was Done

All 7 project wireframe images have been processed with proper background removal:

### Processed Images
- ✅ `cldcde-wireframe_transparent.png`
- ✅ `tld-express-wireframe_transparent.png`
- ✅ `prompt-prompter-dd-wireframe_transparent.png`
- ✅ `unltd-cli-wireframe_transparent.png`
- ✅ `prompt-prompter-wireframe_transparent.png`
- ✅ `os-wwwrong-wireframe_transparent.png`
- ✅ `zkputer-wireframe_transparent.png`

### Output Location
```
/home/ae/AE/02_Showcase/aegnticdotai/public/assets/projects/transparent/
```

## 🎨 Quality Features

- **Full Resolution**: No quality loss (same size as originals)
- **Proper Transparency**: Real alpha channel (not checkered pattern)
- **Smooth Edges**: Alpha matting for professional quality
- **PNG Format**: Lossless compression with transparency

## 📊 File Sizes

| Original | Transparent | Change |
|----------|-------------|---------|
| cldcde-wireframe.png | cldcde-wireframe_transparent.png | Similar size |
| ... | ... | ... |

## 🚀 Using the Images

### In React Components

```tsx
// Import the transparent version
import cldcdeWireframe from '/assets/projects/transparent/cldcde-wireframe_transparent.png';

// Use in your component
<img
  src={cldcdeWireframe}
  alt="CLDCDE Wireframe"
  className="w-full h-auto"
  style={{
    // No background color needed - it's transparent!
  }}
/>
```

### For Project Cards

```tsx
{secondaryProducts.map((product) => (
  <div key={product.id} className="project-card">
    <img
      src={`/assets/projects/transparent/${product.slug}-wireframe_transparent.png`}
      alt={product.title}
      className="w-full h-auto"
    />
  </div>
))}
```

## 🔄 Running Again

### Process New Images

```bash
# From project root
./scripts/remove-backgrounds.sh
```

### Replace Originals

```bash
# Backs up originals and replaces them
./scripts/remove-backgrounds.sh --inplace
```

### Custom Directory

```bash
python3 scripts/remove-backgrounds.py \
  --input /path/to/images \
  --output /path/to/output
```

## 💡 Tips

1. **Test First**: Run on a test image before processing all
2. **Check Quality**: Zoom in to verify edges are smooth
3. **Backup**: Always keep originals (the script does this automatically with `--inplace`)
4. **Model Choice**: Use `u2net` for best quality, `u2netp` for speed

## 🐛 Troubleshooting

### Images still have checkered background

The original might have false transparency. The script creates **true** transparency using AI.

### Want to replace originals

```bash
./scripts/remove-backgrounds.sh --inplace
```

This creates `.backup` files first, then replaces originals.

### Need different quality

Edit `scripts/remove-backgrounds.py`:

```python
# Line ~70-73: Adjust alpha matting
alpha_matting_foreground_threshold=240  # Lower = more aggressive
alpha_matting_background_threshold=10   # Higher = more aggressive
alpha_matting_erode_size=10              # Higher = smoother edges
```

## 📦 Dependencies

```bash
pip install rembg pillow numpy pymatting onnxruntime
```

Or use the system packages flag:
```bash
pip install --break-system-packages rembg[cli] pillow numpy pymatting onnxruntime
```

## 🎯 Next Steps

1. **Verify images**: Check the transparent folder
2. **Update references**: Change image paths in your code
3. **Test display**: View on different background colors
4. **Commit**: Add to git when satisfied

## 📚 Full Documentation

See `scripts/README-Background-Removal.md` for complete documentation.
