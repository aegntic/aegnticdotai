---
title: 'Python uv: The Modern Python Package Manager We Needed'
description: 'Why we switched to Astral uv for Python dependency management. Speed benchmarks, workflow improvements, and migration guide.'
pubDate: 'May 20 2024'
heroImage: '../../assets/blog-placeholder-4.jpg'
tags: ['python', 'uv', 'package-management', 'rust', 'toolchain']
---

# Python uv: The Modern Package Manager

Python's packaging has been a mess. pip is slow. virtualenv is clunky. pyproject.toml is confusing.

Then Astral released uv. Written in Rust. Blazingly fast. Actually pleasant to use.

## The Speed Difference

### Package Installation

```bash
# Installing a typical ML stack (numpy, pandas, scikit-learn, etc.)

pip install -r requirements.txt
# Time: 45 seconds

uv pip install -r requirements.txt
# Time: 3 seconds
```

**15x faster**.

### Virtual Environment Creation

```bash
python -m venv .venv
# Time: 2.5 seconds

uv venv
# Time: 0.1 seconds
```

**25x faster**.

### Lock File Resolution

```bash
pip-compile requirements.in
# Time: 8 seconds

uv pip compile requirements.in
# Time: 0.4 seconds
```

**20x faster**.

## Why It's Fast

### Rust Foundation

Written entirely in Rust, benefiting from:

- Zero runtime overhead
- Parallel dependency resolution
- Efficient caching
- Native binary (no Python interpreter needed)

### Smart Caching

uv caches:

- Downloaded wheels
- Built wheels from source
- Resolution graphs
- Metadata

Second installs are nearly instant.

### Parallel Everything

- Concurrent downloads
- Parallel wheel building
- Multi-threaded resolution

## Feature Set

### Drop-in pip Replacement

```bash
# Instead of
pip install requests

# Use
uv pip install requests

# Everything else works the same
uv pip install -r requirements.txt
uv pip install -e .
uv pip uninstall requests
```

### Native Virtual Environments

```bash
# Create venv
uv venv

# With specific Python version
uv venv --python 3.11

# Or
uv python install 3.11
uv venv --python 3.11
```

### Lock Files

```bash
# Generate lock file
uv pip compile requirements.in -o requirements.txt

# Install from lock file
uv pip sync requirements.txt
```

### Project Management

```bash
# Initialize project
uv init my-project

# Add dependencies
uv add requests pandas

# Run scripts
uv run python main.py

# Build distribution
uv build
```

## Workflow Comparison

### Before (pip + venv)

```bash
# Create environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Add new dependency
pip install new-package
pip freeze > requirements.txt  # Brittle

# Run script
python main.py
```

### After (uv)

```bash
# Create environment (optional, uv handles this)
uv venv

# Install dependencies
uv pip sync requirements.txt

# Add new dependency
uv add new-package  # Updates pyproject.toml + lock

# Run script
uv run python main.py
```

## Migration Guide

### Step 1: Install uv

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Or with pip (ironic but works)
pip install uv

# Or with Homebrew
brew install uv
```

### Step 2: Convert to uv

```bash
# In existing project
cd my-project

# Create new venv with uv
rm -rf .venv
uv venv

# Install from requirements
uv pip install -r requirements.txt

# Generate lock file
uv pip compile requirements.txt -o requirements.lock
```

### Step 3: Update CI/CD

```yaml
# GitHub Actions
- name: Install uv
  run: pip install uv

- name: Install dependencies
  run: |
    uv venv
    uv pip sync requirements.lock

- name: Run tests
  run: uv run pytest
```

### Step 4: Update Docker

```dockerfile
FROM python:3.11-slim

# Install uv
RUN pip install uv

WORKDIR /app
COPY requirements.lock .

# Fast dependency install
RUN uv venv && uv pip sync requirements.lock

COPY . .
CMD ["uv", "run", "python", "main.py"]
```

## Real-World Impact

### CI Build Times

| Stage | Before (pip) | After (uv) |
|-------|-------------|------------|
| Install deps | 45s | 5s |
| Run tests | 30s | 30s |
| Total | 75s | 35s |

**53% reduction in CI time**.

### Developer Experience

- No more waiting for pip
- Consistent environments across team
- Lock files that actually lock
- Python version management included

### Production Deployments

- Faster container builds
- Smaller build caches
- More reliable installations

## Comparison with Alternatives

### vs Poetry

| Feature | Poetry | uv |
|---------|--------|-----|
| Install speed | Slow | Very fast |
| Lock files | Yes | Yes |
| Dependency resolution | Good | Excellent |
| Learning curve | Moderate | Low |
| pip compatibility | Partial | Full |

### vs pipenv

| Feature | pipenv | uv |
|---------|--------|-----|
| Install speed | Slow | Very fast |
| Stability | Questionable | Solid |
| Active development | Slow | Very active |

### vs pip-tools

| Feature | pip-tools | uv |
|---------|----------|-----|
| Install speed | Slow | Very fast |
| Lock files | Yes | Yes |
| Venv management | No | Yes |
| Python management | No | Yes |

## Best Practices

### 1. Always Use Lock Files

```bash
# Generate lock
uv pip compile pyproject.toml -o requirements.lock

# Install from lock (not pyproject.toml)
uv pip sync requirements.lock
```

### 2. Pin Python Versions

```bash
# In pyproject.toml
[project]
requires-python = ">=3.10,<3.13"
```

### 3. Use uv run

```bash
# Instead of activating venv
uv run python main.py
uv run pytest
uv run mypy .
```

### 4. Cache in CI

```yaml
- uses: actions/cache@v3
  with:
    path: ~/.cache/uv
    key: uv-${{ hashFiles('requirements.lock') }}
```

---

*uv is our standard Python package manager. For the full toolchain, see [our ecosystem architecture](/blog/building-40-platform-ai-ecosystem).*
