---
title: 'TUI Design: Building Terminal Interfaces That Developers Love'
description: 'Principles and patterns for creating beautiful, functional terminal user interfaces. Rich formatting, real-time updates, and cross-platform compatibility.'
pubDate: 'Aug 25 2024'
heroImage: '../../assets/blog-placeholder-4.jpg'
tags: ['TUI', 'terminal', 'UI-design', 'development', 'CLI']
---

# TUI Design: Terminal Interfaces That Developers Love

Developers live in terminals. The best tools meet them there.

Terminal User Interfaces (TUIs) combine the speed of CLI with the clarity of GUI.

## Why TUI?

### Speed

- No mouse required
- Keyboard shortcuts for everything
- Instant response times

### Ubiquity

- Works over SSH
- Works in containers
- Works everywhere terminals exist

### Integration

- Pipes and redirects
- Scriptable
- Composable with other tools

## Design Principles

### 1. Information Hierarchy

Most important information first and most visible:

```
┌─────────────────────────────────────┐
│ Status: ✓ Running     CPU: 45%      │  ← Primary status
├─────────────────────────────────────┤
│ Active Tasks: 12      Queue: 3       │  ← Secondary metrics
├─────────────────────────────────────┤
│ Recent Activity:                     │
│  • Task completed: build-frontend    │  ← Activity log
│  • Task started: run-tests           │
│  • Error: database connection lost   │
└─────────────────────────────────────┘
```

### 2. Progressive Disclosure

Don't show everything at once:

**Level 1**: Overview (what's the situation?)
**Level 2**: Details (what's happening specifically?)
**Level 3**: Full data (give me everything)

Navigation: Tab between levels, arrow keys within.

### 3. Consistent Color Semantics

```
Green  = Success, healthy, active
Yellow = Warning, pending, attention needed
Red    = Error, failure, critical
Blue   = Information, links, navigation
Gray   = Disabled, inactive, secondary
White  = Primary content
```

### 4. Keyboard-First Design

Every action should have a keyboard shortcut:

```
Common patterns:
  q/Esc  = Quit/back
  Enter  = Select/confirm
  Tab    = Next section
  /      = Search
  ?      = Help
  r      = Refresh
  j/k    = Navigate down/up (vim-style)
  ↑↓←→   = Navigation (arrow-style)
```

## Implementation with Rich

Python's Rich library makes beautiful TUIs accessible:

```python
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.live import Live

console = Console()

# Tables
table = Table(title="Active Tasks")
table.add_column("ID", style="cyan")
table.add_column("Name", style="green")
table.add_column("Status", style="yellow")

for task in tasks:
    table.add_row(task.id, task.name, task.status)

console.print(table)

# Live updates
with Live(generate_status()) as live:
    while True:
        live.update(generate_status())
        sleep(1)
```

### Real-Time Updates

```python
from rich.live import Live
from rich.layout import Layout
from rich.panel import Panel

def create_layout():
    layout = Layout()
    layout.split_column(
        Layout(name="header", size=3),
        Layout(name="main"),
        Layout(name="footer", size=3)
    )
    return layout

layout = create_layout()
layout["header"].update(Panel("🚀 System Monitor"))
layout["main"].update(Panel(generate_stats()))
layout["footer"].update(Panel("Press q to quit"))

with Live(layout, refresh_per_second=4):
    while running:
        layout["main"].update(Panel(generate_stats()))
```

## Cross-Platform Considerations

### Terminal Capabilities

Not all terminals are equal:

```python
import os

def get_terminal_width():
    try:
        return os.get_terminal_size().columns
    except OSError:
        return 80  # Safe default

def supports_color():
    # Check TERM and NO_COLOR
    if os.environ.get('NO_COLOR'):
        return False
    term = os.environ.get('TERM', '')
    return term != 'dumb'
```

### Graceful Degradation

```python
class Renderer:
    def __init__(self):
        self.rich = supports_rich()
        self.color = supports_color()
        self.unicode = supports_unicode()
    
    def status_icon(self, success: bool) -> str:
        if self.unicode:
            return "✓" if success else "✗"
        else:
            return "[OK]" if success else "[FAIL]"
    
    def progress_bar(self, pct: float) -> str:
        width = min(20, get_terminal_width() - 10)
        if self.unicode:
            filled = int(width * pct)
            return "█" * filled + "░" * (width - filled)
        else:
            filled = int(width * pct)
            return "#" * filled + "-" * (width - filled)
```

## Common Patterns

### Selection Lists

```
Select an option:
  ┃ ○ Option A
  ┃ ● Option B  ← current selection
  ┃ ○ Option C

Controls: ↑↓ to move, Enter to select
```

### Confirmation Dialogs

```
┌────────────────────────────────────┐
│ Delete this file?                   │
│                                     │
│ This cannot be undone.             │
│                                     │
│     [Cancel]  [Delete]              │
└────────────────────────────────────┘

Controls: Tab to switch, Enter to confirm
```

### Progress Indicators

```
Building project...
  ├─ Compiling sources    ████████████████░░░░ 80%
  ├─ Running tests        ████████████████████ Done
  └─ Generating docs      ░░░░░░░░░░░░░░░░░░░░ Waiting
```

### Searchable Lists

```
Search: docker█

Results (5 of 23):
  • start-docker-container
  • stop-docker-container  
  • docker-compose-up
  • docker-compose-down
  • docker-prune-images

Press Enter to select, Esc to cancel
```

## Performance Optimization

### Minimize Redraws

```python
# Bad: Full redraw every update
while True:
    clear_screen()
    draw_everything()
    sleep(0.1)

# Good: Only update changed regions
with Live(layout) as live:
    while True:
        if stats_changed:
            layout["stats"].update(new_stats)
        if logs_changed:
            layout["logs"].update(new_logs)
        sleep(0.1)
```

### Efficient Rendering

```python
# Pre-compute static elements
HEADER = Panel("System Monitor", style="bold blue")

# Reuse table structure
def update_table(table: Table, rows: list):
    table.rows.clear()
    for row in rows:
        table.add_row(*row)
    return table
```

## User Testing Insights

From building TUIs for Prologue and other tools:

### What Users Love

- Responsive key shortcuts
- Clear status indicators
- Search/filter capabilities
- Consistent navigation

### What Users Hate

- Unclear how to exit
- No loading indicators
- Broken layouts in small terminals
- Mandatory mouse interaction

## Lessons Learned

### 1. Test in Multiple Terminals

iTerm2, Terminal.app, Windows Terminal, tmux—behavior varies.

### 2. Provide Escape Hatches

Users should always be able to quit or go back.

### 3. Show Loading States

Even if operation is fast, show that something is happening.

### 4. Document Keybindings

Show available shortcuts, ideally in a help panel.

---

*TUI design is essential for developer tools. For applications, see [Prologue MCP Discovery](/blog/birth-of-prologue-mcp-discovery).*
