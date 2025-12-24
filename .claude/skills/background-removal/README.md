# Background Removal Skill

**✅ Agentically Triggerable** | **v1.0.0** | **By aegntic**

---

## 🚀 Quick Start

```bash
# Direct invocation
./scripts/remove-backgrounds.sh

# With options
python3 scripts/remove-backgrounds.py \
  --input /path/to/images \
  --output /path/to/output \
  --model u2net
```

---

## 🎯 How Agents Trigger This

### Natural Language
```markdown
User: "Remove backgrounds from project images"
Agent: [Detects intent] → [Executes skill] → [Reports results]
```

### Programmatic
```python
from scripts.remove_backgrounds import BackgroundRemover
remover = BackgroundRemover(input_dir, output_dir)
remover.process_batch()
```

### Shell
```bash
./scripts/remove-backgrounds.sh --inplace
```

---

## ✨ Features

- ✅ AI-powered background removal
- ✅ True transparency (RGBA)
- ✅ No quality loss
- ✅ Batch processing
- ✅ Multiple models
- ✅ Progress tracking
- ✅ Error recovery

---

## 📖 Documentation

- **This file**: Skill overview
- **skill.md**: Full specification
- **skill.json**: Machine-readable config
- **../../../scripts/README-Background-Removal.md**: Complete documentation

---

## 🤖 Trigger Examples

- "Remove backgrounds from..."
- "Make images transparent"
- "Process wireframes"
- "Remove checkered backgrounds"

---

## 📊 Models

| Model | Quality | Speed |
|-------|---------|-------|
| `u2net` | ⭐⭐⭐⭐⭐ | Slow |
| `u2netp` | ⭐⭐⭐⭐ | Medium |
| `u2net_human_seg` | ⭐⭐⭐⭐ | Medium |
| `silueta` | ⭐⭐⭐ | Fast |

---

## 📁 Output

```
public/assets/projects/transparent/
├── cldcde-wireframe_transparent.png
├── tld-express-wireframe_transparent.png
└── ...
```

---

## 🔧 Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input_dir` | string | required | Input directory |
| `output_dir` | string | `{input}/processed` | Output directory |
| `model` | string | `u2net` | AI model |
| `inplace` | boolean | `false` | Replace originals |

---

**See full documentation in `scripts/` directory**
