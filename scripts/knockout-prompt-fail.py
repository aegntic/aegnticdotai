#!/usr/bin/env python3
from pathlib import Path
import numpy as np
from PIL import Image

src = Path("/home/ae/Pictures/Screenshots/Screenshot From 2026-07-22 15-00-03.png")
img = Image.open(src).convert("RGBA")
arr = np.array(img)
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

white = (r > 245) & (g > 245) & (b > 245)
off = (r > 235) & (g > 235) & (b > 235) & ((r.astype(int) + g + b) > 720)

alpha = a.copy()
alpha[white] = 0
soft = off & ~white
brightness = (r.astype(np.float32) + g + b) / 3.0
soft_a = np.clip((255 - brightness) / (255 - 235) * 255, 0, 255).astype(np.uint8)
alpha[soft] = np.minimum(alpha[soft], soft_a[soft])
arr[:, :, 3] = alpha

ys, xs = np.where(arr[:, :, 3] > 10)
if len(xs):
    pad = 8
    y0 = max(0, int(ys.min()) - pad)
    y1 = min(arr.shape[0], int(ys.max()) + pad + 1)
    x0 = max(0, int(xs.min()) - pad)
    x1 = min(arr.shape[1], int(xs.max()) + pad + 1)
    arr = arr[y0:y1, x0:x1]

out = Image.fromarray(arr)
dests = [
    Path("public/assets/visuals/prompt-fail-ouroboros.png"),
    Path("public/prompt-fail-ouroboros.png"),
]
for d in dests:
    d.parent.mkdir(parents=True, exist_ok=True)
    out.save(d, "PNG", optimize=True)
    print("saved", d, out.size)
