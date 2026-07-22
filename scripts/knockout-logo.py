#!/usr/bin/env python3
from pathlib import Path
from collections import Counter
import numpy as np
from PIL import Image

src = Path("public/ae-logo.webp")
im = Image.open(src).convert("RGBA")
a = np.array(im)
print("size", im.size)
print("corners", a[0, 0], a[0, -1], a[-1, 0], a[-1, -1])
print("alpha unique sample", np.unique(a[:, :, 3])[:20])
flat = a.reshape(-1, 4)
cols = Counter(map(tuple, flat[:: max(1, len(flat) // 8000)]))
print("top", cols.most_common(8))

# Knock out near-white / light mint page bg and pure black bars if logo is mark-only
# Keep dark ink of the mark. ae logo is typically black "ae" on transparent or light bg.
r, g, b, al = a[:, :, 0], a[:, :, 1], a[:, :, 2], a[:, :, 3]
# light backgrounds (white / mint #f0f6f8)
light = (r > 230) & (g > 230) & (b > 230)
# very light cool greys
light2 = (r > 220) & (g > 230) & (b > 235) & ((r.astype(int) + g + b) > 700)
alpha = al.copy()
alpha[light | light2] = 0

# if logo is already mostly transparent, just refine edges
out = a.copy()
out[:, :, 3] = alpha

# crop
ys, xs = np.where(out[:, :, 3] > 8)
if len(xs):
    pad = 4
    y0, y1 = max(0, ys.min() - pad), min(out.shape[0], ys.max() + pad + 1)
    x0, x1 = max(0, xs.min() - pad), min(out.shape[1], xs.max() + pad + 1)
    out = out[y0:y1, x0:x1]

result = Image.fromarray(out)
# keep webp + png
result.save("public/ae-logo.png", "PNG", optimize=True)
# webp via pillow
result.save("public/ae-logo.webp", "WEBP", quality=95, method=6)
print("wrote transparent logo", result.size, "alpha min", out[:, :, 3].min())
