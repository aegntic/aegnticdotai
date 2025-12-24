# Background Removal Workflow

High-quality background removal tool that preserves image resolution and fine details while creating proper transparency.

## Features

✨ **Quality Preservation**
- No resolution loss
- Maintains fine details and edges
- Proper alpha channel transparency
- High-quality output (PNG/WebP)

🤖 **AI-Powered**
- Uses U^2-Net deep learning model
- Alpha matting for smooth edges
- Automatic edge enhancement

🎯 **Batch Processing**
- Process entire directories at once
- Progress indicators
- Error handling and recovery

## Installation

```bash
# Install Python dependencies
pip install rembg pillow numpy pymatting

# Or use the shell script (auto-installs dependencies)
./scripts/remove-backgrounds.sh
```

## Quick Start

### Basic Usage (creates new files)

```bash
./scripts/remove-backgrounds.sh
```

This will:
- Process all images in `public/assets/projects/`
- Save results to `public/assets/projects/processed/`
- Keep original files unchanged

### Replace Original Files

```bash
./scripts/remove-backgrounds.sh --inplace
```

This will:
- Process all images
- Replace original files
- Create `.backup` files automatically

### Custom Paths

```bash
./scripts/remove-backgrounds.sh /path/to/input /path/to/output
```

## Advanced Usage

### Python Script

```bash
python3 scripts/remove-backgrounds.py \
  --input /path/to/images \
  --output /path/to/output \
  --model u2net
```

### Available Models

| Model | Quality | Speed | Best For |
|-------|---------|-------|----------|
| `u2net` | ⭐⭐⭐⭐⭐ | Slow | General purpose (recommended) |
| `u2netp` | ⭐⭐⭐⭐ | Medium | Faster processing |
| `u2net_human_seg` | ⭐⭐⭐⭐ | Medium | Human portraits |
| `silueta` | ⭐⭐⭐ | Fast | Quick previews |

## Options

| Flag | Description |
|------|-------------|
| `--inplace`, `-i` | Replace original files (creates backups) |
| `--model`, `-m` | Choose AI model (default: u2net) |
| `--input`, `-i` | Input directory |
| `--output`, `-o` | Output directory |

## Examples

### Process wireframes with best quality

```bash
./scripts/remove-backgrounds.sh
```

### Fast processing (for testing)

```bash
./scripts/remove-backgrounds.sh --model u2netp
```

### Replace originals safely

```bash
./scripts/remove-backgrounds.sh --inplace
```

### Custom directory

```bash
./scripts/remove-backgrounds.sh ~/Dropzone/images ~/processed
```

## Output

Processed images are saved with:
- **Format**: PNG with full alpha channel
- **Quality**: Same resolution as input
- **Naming**: `{original_name}_transparent.png`
- **Transparency**: Proper alpha channel (not checkered)

## Troubleshooting

### "Missing dependencies"

```bash
pip install rembg pillow numpy pymatting
```

### "No images found"

Check that:
1. Input directory exists
2. Images have correct extensions (.png, .jpg, .jpeg, .webp)
3. You have read permissions

### Poor quality edges

Try:
1. Using `u2net` model (slowest, best quality)
2. Ensure input images are high resolution
3. Check that original doesn't have checkered transparency

### Out of memory

1. Process images in smaller batches
2. Use `u2netp` or `silueta` models
3. Close other applications

## Technical Details

### Alpha Matting

The tool uses alpha matting to create smooth edges:

```python
alpha_matting_foreground_threshold=240  # Foreground sensitivity
alpha_matting_background_threshold=10   # Background sensitivity
alpha_matting_erode_size=10              # Edge refinement
```

### Edge Enhancement

Mild sharpening is applied to preserve details:

```python
enhancement_amount = 1.1  # 10% boost
```

### Quality Settings

- **Format**: PNG (lossless)
- **Optimization**: Enabled
- **Transparency**: 8-bit alpha channel
- **Color Depth**: Original (typically 24-bit RGB + 8-bit alpha)

## Integration with Project

These processed images can be used in:

1. **Project cards** on the Projects page
2. **Featured sections** with transparent backgrounds
3. **Hover effects** without background conflicts
4. **Dark/light themes** without visual issues

## File Structure

```
public/assets/projects/
├── original-wireframe.png          # Original (with background)
├── original-wireframe.png.backup   # Backup (if --inplace used)
└── processed/                      # Output directory
    ├── cldcde-wireframe_transparent.png
    ├── tld-express-wireframe_transparent.png
    └── ...
```

## Contributing

To improve the workflow:

1. Test on different image types
2. Adjust model parameters in `remove-backgrounds.py`
3. Add edge case handling
4. Improve error messages

## License

MIT - Use freely in your projects.
