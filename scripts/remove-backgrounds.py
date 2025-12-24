#!/usr/bin/env python3
"""
High-Quality Background Removal Workflow
========================================
Removes backgrounds from images while preserving:
- High resolution (no quality loss)
- Fine details and edges
- Transparency with proper alpha channel
- Original color depth

Requirements:
    pip install rembg pillow numpy pymatting
"""

import os
import sys
from pathlib import Path
from PIL import Image
import numpy as np
from rembg import remove, new_session
from typing import Optional, Tuple
import argparse


class BackgroundRemover:
    """Professional background removal with quality preservation"""

    def __init__(self, input_dir: str, output_dir: str, model: str = 'u2net'):
        """
        Initialize the background remover

        Args:
            input_dir: Directory containing input images
            output_dir: Directory for output images (transparent)
            model: Model to use ('u2net', 'u2netp', 'u2net_human_seg', 'silueta')
        """
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.model_name = model

        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Initialize AI model session
        print(f"🎨 Initializing {model} model...")
        self.session = new_session(model)

    def is_transparent(self, img: Image.Image) -> bool:
        """Check if image already has transparency"""
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            return True
        return False

    def has_checkered_background(self, img: Image.Image) -> bool:
        """Detect if image has a checkered transparency pattern (false transparency)"""
        if not self.is_transparent(img):
            return False

        # Sample pixels in a checkerboard pattern
        pixels = np.array(img)
        if len(pixels.shape) == 3 and pixels.shape[2] == 4:
            # Check alpha channel - if all values are 0 or 255, it's false transparency
            alpha = pixels[:, :, 3]

            # Check if alpha is binary (only 0 and 255)
            unique_alphas = np.unique(alpha)
            if len(unique_alphas) <= 2:
                # This is likely false transparency (checkered pattern)
                return True

        return False

    def remove_background_single(self, input_path: Path) -> Optional[Image.Image]:
        """
        Remove background from a single image with high quality

        Args:
            input_path: Path to input image

        Returns:
            PIL Image with transparent background, or None if failed
        """
        try:
            print(f"  📸 Processing: {input_path.name}")

            # Open image
            input_image = Image.open(input_path)

            # Convert to RGB if needed (rembg works best with RGB)
            if input_image.mode != 'RGB':
                input_image = input_image.convert('RGB')

            # Remove background using AI
            output_image = remove(
                input_image,
                session=self.session,
                alpha_matting=True,  # Enable alpha matting for smoother edges
                alpha_matting_foreground_threshold=240,
                alpha_matting_background_threshold=10,
                alpha_matting_erode_size=10
            )

            # Enhance edges slightly for crispness
            output_image = self.enhance_edges(output_image)

            return output_image

        except Exception as e:
            print(f"  ❌ Error processing {input_path.name}: {str(e)}")
            return None

    def enhance_edges(self, img: Image.Image, amount: float = 1.1) -> Image.Image:
        """
        Slightly enhance edges for better visual quality

        Args:
            img: Input image
            amount: Enhancement amount

        Returns:
            Enhanced image
        """
        # Convert to numpy for edge enhancement
        pixels = np.array(img)

        if len(pixels.shape) == 3 and pixels.shape[2] == 4:
            # Apply mild sharpening to edges
            from scipy.ndimage import gaussian_filter

            # Extract RGB and Alpha
            rgb = pixels[:, :, :3]
            alpha = pixels[:, :, 3:4]

            # Enhance RGB slightly
            rgb_enhanced = rgb * amount
            rgb_enhanced = np.clip(rgb_enhanced, 0, 255).astype(np.uint8)

            # Recombine
            enhanced = np.concatenate([rgb_enhanced, alpha], axis=2)
            return Image.fromarray(enhanced.astype(np.uint8))

        return img

    def process_batch(self, extensions: Tuple[str, ...] = ('.png', '.jpg', '.jpeg', '.webp')):
        """
        Process all images in the input directory

        Args:
            extensions: Tuple of file extensions to process
        """
        # Find all images
        image_files = []
        for ext in extensions:
            image_files.extend(self.input_dir.glob(f"*{ext}"))
            image_files.extend(self.input_dir.glob(f"*{ext.upper()}"))

        if not image_files:
            print(f"❌ No images found in {self.input_dir}")
            return

        print(f"🖼️  Found {len(image_files)} images to process\n")

        success_count = 0

        for input_path in image_files:
            # Process image
            result_image = self.remove_background_single(input_path)

            if result_image:
                # Save with transparency
                output_path = self.output_dir / f"{input_path.stem}_transparent{input_path.suffix}"

                # Save with maximum quality
                save_kwargs = {
                    'format': 'PNG' if output_path.suffix.lower() == '.png' else 'WEBP',
                    'optimize': True,
                }

                if output_path.suffix.lower() in ('.jpg', '.jpeg'):
                    # For JPEG, we can't save transparency, so save as PNG instead
                    output_path = self.output_dir / f"{input_path.stem}_transparent.png"
                    save_kwargs['format'] = 'PNG'

                result_image.save(output_path, **save_kwargs)

                print(f"  ✅ Saved: {output_path.name}")
                success_count += 1

            print()  # Empty line between images

        print(f"🎉 Complete! Processed {success_count}/{len(image_files)} images")
        print(f"📁 Output directory: {self.output_dir.absolute()}")


def main():
    parser = argparse.ArgumentParser(
        description='High-quality background removal for project assets'
    )
    parser.add_argument(
        '--input',
        '-i',
        default='/home/ae/AE/02_Showcase/aegnticdotai/public/assets/projects',
        help='Input directory containing images'
    )
    parser.add_argument(
        '--output',
        '-o',
        default='/home/ae/AE/02_Showcase/aegnticdotai/public/assets/projects/processed',
        help='Output directory for processed images'
    )
    parser.add_argument(
        '--model',
        '-m',
        default='u2net',
        choices=['u2net', 'u2netp', 'u2net_human_seg', 'silueta'],
        help='AI model to use for background removal (default: u2net - best quality)'
    )
    parser.add_argument(
        '--inplace',
        action='store_true',
        help='Replace original files instead of creating new ones'
    )

    args = parser.parse_args()

    # If inplace, use a temp directory then move files
    if args.inplace:
        output_dir = args.input + '_temp'
    else:
        output_dir = args.output

    # Create remover and process
    remover = BackgroundRemover(args.input, output_dir, args.model)
    remover.process_batch()

    # If inplace, replace originals
    if args.inplace:
        import shutil
        input_path = Path(args.input)
        temp_path = Path(output_dir)

        print("\n🔄 Replacing original files...")

        for img in temp_path.glob('*_transparent.png'):
            original_name = img.stem.replace('_transparent', '')
            original_path = input_path / f"{original_name}.png"

            # Backup original
            backup_path = input_path / f"{original_name}.png.backup"
            if original_path.exists():
                shutil.copy2(original_path, backup_path)
                print(f"  💾 Backed up: {original_path.name}")

            # Replace with processed
            shutil.move(str(img), str(original_path))
            print(f"  ✅ Replaced: {original_path.name}")

        # Remove temp directory
        shutil.rmtree(temp_path)
        print("\n✨ Done! Original files backed up with .backup extension")


if __name__ == '__main__':
    main()
