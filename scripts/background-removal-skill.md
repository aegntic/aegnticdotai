# Background Removal Skill

**Type**: Automation Skill
**Triggerable**: Yes - Can be invoked by AI agents
**Purpose**: High-quality background removal from images with transparency preservation

## Agent Invocation

Agents can invoke this skill through multiple methods:

### 1. Direct Python Execution

```python
# Agent can execute:
import subprocess

result = subprocess.run([
    'python3',
    '/path/to/scripts/remove-backgrounds.py',
    '--input', '/path/to/images',
    '--output', '/path/to/output',
    '--model', 'u2net'
], capture_output=True, text=True)

return result.stdout
```

### 2. Shell Command Execution

```bash
# Agent can run:
./scripts/remove-backgrounds.sh --inplace
```

### 3. Programmatic API

```python
# Agent can import and use directly:
from scripts.remove_backgrounds import BackgroundRemover

remover = BackgroundRemover(
    input_dir='/path/to/images',
    output_dir='/path/to/output',
    model='u2net'
)
remover.process_batch()
```

## Skill Capabilities

### Automatic Features
- ✅ **Batch Processing**: Handles entire directories
- ✅ **Quality Preservation**: No resolution loss
- ✅ **Smart Detection**: AI-powered background identification
- ✅ **Edge Refinement**: Alpha matting for smooth edges
- ✅ **Format Support**: PNG, JPG, JPEG, WEBP
- ✅ **Progress Tracking**: Real-time feedback
- ✅ **Error Recovery**: Continues on individual failures

### Configurable Options
- **Input/Output Paths**: Custom directories
- **Model Selection**: u2net, u2netp, u2net_human_seg, silueta
- **In-place Mode**: Replace originals with backups
- **Alpha Matting**: Edge quality tuning
- **Batch Size**: Process multiple images

## Agent Integration Examples

### Example 1: Claude Code Agent

```markdown
@agent Please remove backgrounds from all images in the public/assets/projects folder
```

**Agent executes:**
1. Detects request for background removal
2. Invokes `./scripts/remove-backgrounds.sh`
3. Monitors output for completion
4. Reports success/failure

### Example 2: Automated Pipeline

```python
# Agent workflow
def process_project_assets(project_name):
    """
    Automated asset processing pipeline
    """
    # 1. Download assets
    assets = download_assets(project_name)

    # 2. Remove backgrounds
    remover = BackgroundRemover(
        input_dir=assets['download_path'],
        output_dir=assets['processed_path']
    )
    remover.process_batch()

    # 3. Update project references
    update_image_references(project_name, assets['processed_path'])

    return f"✅ Processed {len(assets['files'])} images for {project_name}"
```

### Example 3: MCP Server Integration

Create an MCP tool that agents can call:

```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const backgroundRemovalTool: Tool = {
  name: "remove_image_backgrounds",
  description: "Remove backgrounds from images while preserving quality and transparency",
  inputSchema: {
    type: "object",
    properties: {
      inputDir: {
        type: "string",
        description: "Directory containing images to process"
      },
      outputDir: {
        type: "string",
        description: "Output directory for processed images"
      },
      model: {
        type: "string",
        enum: ["u2net", "u2netp", "u2net_human_seg", "silueta"],
        description: "AI model to use"
      },
      inplace: {
        type: "boolean",
        description: "Replace original files"
      }
    },
    required: ["inputDir"]
  }
};

// Agent can call this tool, and your server executes:
// python3 scripts/remove-backgrounds.py --input {inputDir} --output {outputDir}
```

## Making It a Formal Skill

To register this as an official Claude Code skill:

### Option 1: Create Skill Metadata

Create `.claude/skills/background-removal/skill.md`:

```yaml
name: background-removal
description: Remove backgrounds from images with AI-powered transparency
version: 1.0.0
author: aegntic
tags: [image-processing, automation, ai]

triggers:
  - "remove background"
  - "transparent images"
  - "remove backgrounds from"
  - "process wireframes"

command: |
  python3 scripts/remove-backgrounds.py --input {input_dir} --output {output_dir}

parameters:
  - name: input_dir
    type: string
    required: true
    description: Directory containing images

  - name: output_dir
    type: string
    required: false
    description: Output directory (default: {input_dir}/processed)

  - name: model
    type: string
    required: false
    default: u2net
    description: AI model (u2net, u2netp, u2net_human_seg, silueta)

examples:
  - "Remove backgrounds from public/assets/projects"
  - "Make all wireframes transparent"
  - "Process product images with u2net model"
```

### Option 2: MCP Tool Registration

Add to your MCP server configuration:

```json
{
  "name": "background-removal",
  "endpoint": "python3 /path/to/remove-backgrounds.py",
  "description": "AI-powered background removal",
  "parameters": {
    "inputDir": "string",
    "outputDir": "string?",
    "model": "string?"
  }
}
```

## Usage by Different Agents

### 1. Claude Code Agent
```markdown
User: "Remove backgrounds from project images"
Agent: [Detects intent] → [Invokes skill] → [Reports results]
```

### 2. Custom AI Agent
```python
class AssetProcessingAgent:
    def handle_request(self, user_request):
        if "background" in user_request and "remove" in user_request:
            return self.invoke_skill('background-removal', {
                'input_dir': self.extract_path(user_request)
            })
```

### 3. CI/CD Pipeline Agent
```yaml
# .github/workflows/process-images.yml
name: Process Product Images
on: [push]
jobs:
  background-removal:
    runs-on: ubuntu-latest
    steps:
      - name: Remove backgrounds
        run: |
          pip install rembg pillow numpy pymatting
          python3 scripts/remove-backgrounds.py \
            --input public/assets/new-products \
            --output public/assets/processed
```

## Agent Feedback

The skill provides structured output for agents:

```
🎨 Initializing u2net model...
🖼️  Found 7 images to process

  📸 Processing: cldcde-wireframe.png
  ✅ Saved: cldcde-wireframe_transparent.png

  📸 Processing: tld-express-wireframe.png
  ✅ Saved: tld-express-wireframe_transparent.png

🎉 Complete! Processed 7/7 images
📁 Output directory: /path/to/output
```

Agents can parse this for:
- ✅ Success count
- ❌ Failed files
- 📁 Output location
- ⚠️ Warnings

## Enhancement Opportunities

### 1. Add Progress Callbacks

```python
class BackgroundRemover:
    def __init__(self, ..., progress_callback=None):
        self.progress_callback = progress_callback

    def process_batch(self):
        for img in images:
            result = self.process(img)
            if self.progress_callback:
                self.progress_callback({
                    'file': img.name,
                    'status': 'success',
                    'output': result.path
                })
```

### 2. Add Quality Metrics

```python
def analyze_quality(self, original, processed):
    """Return quality metrics for agent decision-making"""
    return {
        'resolution preserved': original.size == processed.size,
        'transparency pixels': count_transparent_pixels(processed),
        'edge_quality': measure_edge_smoothness(processed)
    }
```

### 3. Add Auto-Model Selection

```python
def select_optimal_model(self, image_info):
    """Agent can automatically choose best model"""
    if image_info['has_human']:
        return 'u2net_human_seg'
    elif image_info['needs_speed']:
        return 'u2netp'
    else:
        return 'u2net'
```

## Summary

✅ **Yes, this is a fully agentically-triggerable skill!**

- Can be invoked by AI agents
- Provides structured feedback
- Handles errors gracefully
- Supports batch processing
- Configurable via parameters
- Can be wrapped as MCP tool
- Can be registered as Claude Code skill

**To use:**
1. Direct execution: `./scripts/remove-backgrounds.sh`
2. Python import: `from scripts.remove_backgrounds import BackgroundRemover`
3. MCP tool: Register as callable tool
4. Skill registration: Add to `.claude/skills/`
