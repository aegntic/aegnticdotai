# Background Removal

**Type**: Automation Skill
**Category**: Image Processing
**Triggerable**: Yes
**Agent-Compatible**: Yes

## Description

AI-powered background removal from images with professional quality. Preserves high resolution, fine details, and creates proper transparency with smooth edges using advanced alpha matting.

## Triggers

This skill activates when agents detect requests for:
- Background removal from images
- Making images transparent
- Processing wireframes
- Removing solid/checkered backgrounds
- Batch image background processing

## Examples

**Direct requests:**
- "Remove backgrounds from all project images"
- "Make these wireframes transparent"
- "Process the images in public/assets/projects"
- "Remove checkered backgrounds from product shots"

**Contextual requests:**
- "I have some images with false transparency, can you fix them?"
- "The wireframes need transparent backgrounds"
- "Process all PNGs in the assets folder"

## Command

```bash
python3 scripts/remove-backgrounds.py --input {input_dir} --output {output_dir} --model {model}
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `input_dir` | string | ✅ Yes | - | Directory containing images to process |
| `output_dir` | string | ❌ No | `{input_dir}/processed` | Output directory for transparent images |
| `model` | string | ❌ No | `u2net` | AI model: `u2net`, `u2netp`, `u2net_human_seg`, `silueta` |
| `inplace` | boolean | ❌ No | `false` | Replace original files (creates backups) |

## Models

| Model | Quality | Speed | Best For |
|-------|---------|-------|----------|
| `u2net` | ⭐⭐⭐⭐⭐ | Slow | General purpose, highest quality |
| `u2netp` | ⭐⭐⭐⭐ | Medium | Good balance of quality/speed |
| `u2net_human_seg` | ⭐⭐⭐⭐ | Medium | Human portraits and figures |
| `silueta` | ⭐⭐⭐ | Fast | Quick previews, large batches |

## Capabilities

### ✅ Automatic Features
- Batch directory processing
- AI-powered background detection
- Alpha matting for smooth edges
- Quality preservation (no resolution loss)
- Format support: PNG, JPG, JPEG, WEBP
- Progress tracking with emoji indicators
- Error recovery and reporting
- Automatic backup creation (inplace mode)

### ✅ Quality Features
- Full resolution maintained
- Proper alpha channel (RGBA)
- Edge enhancement
- Lossless PNG output
- Transparency validation

## Output

### Success Response
```
🎨 Initializing u2net model...
🖼️  Found 7 images to process

  📸 Processing: image1.png
  ✅ Saved: image1_transparent.png

  📸 Processing: image2.png
  ✅ Saved: image2_transparent.png

🎉 Complete! Processed 7/7 images
📁 Output directory: /path/to/output
```

### Error Response
```
❌ Error processing image.png: [error details]
```

## Usage Patterns

### Pattern 1: Directory Processing
```markdown
Agent: "Remove backgrounds from public/assets/projects"
→ Executes: --input public/assets/projects --output public/assets/projects/processed
```

### Pattern 2: In-place Replacement
```markdown
Agent: "Replace the originals after removing backgrounds"
→ Executes: --input public/assets/projects --inplace
```

### Pattern 3: Custom Model
```markdown
Agent: "Use the faster model to process these images"
→ Executes: --input {path} --model u2netp
```

### Pattern 4: Programmatic Import
```python
from scripts.remove_backgrounds import BackgroundRemover

remover = BackgroundRemover(
    input_dir='/path/to/images',
    output_dir='/path/to/output',
    model='u2net'
)
remover.process_batch()
```

## Integration Points

### 1. Shell Commands
```bash
./scripts/remove-backgrounds.sh
./scripts/remove-backgrounds.sh --inplace
```

### 2. Python API
```python
from scripts.remove_backgrounds import BackgroundRemover
remover = BackgroundRemover(input_dir, output_dir)
remover.process_batch()
```

### 3. MCP Tool
Register as callable MCP tool for agent invocation

### 4. CI/CD Pipeline
Automated processing in GitHub Actions, GitLab CI, etc.

## File Structure

```
scripts/
├── remove-backgrounds.py           # Main Python script
├── remove-backgrounds.sh            # Shell wrapper
├── background-removal-skill.md      # This file
├── README-Background-Removal.md     # Full documentation
└── QUICKSTART.md                     # Quick reference

public/assets/projects/
├── original.png                     # Input images
└── transparent/                     # Output directory
    └── original_transparent.png     # Processed images
```

## Error Handling

The skill handles:
- Missing directories (creates output)
- Unsupported formats (skips with warning)
- Corrupted images (continues batch)
- Permission errors (reports and continues)
- Model download failures (clear error)

## Requirements

```bash
pip install rembg pillow numpy pymatting onnxruntime
```

Or with system packages:
```bash
pip install --break-system-packages rembg[cli] pillow numpy pymatting onnxruntime
```

## Notes

- **Transparency**: Creates true RGBA transparency, not checkered pattern
- **Quality**: No resolution loss, same dimensions as input
- **Backup**: Inplace mode automatically creates `.backup` files
- **Formats**: Outputs PNG for transparency (even if input is JPG)
- **Edge Quality**: Alpha matting ensures smooth, professional edges

## Version

1.0.0 - Initial release with U^2-Net model integration

## Author

aegntic

## See Also

- Full documentation: `scripts/README-Background-Removal.md`
- Quick start: `scripts/QUICKSTART.md`
- Python script: `scripts/remove-backgrounds.py`
