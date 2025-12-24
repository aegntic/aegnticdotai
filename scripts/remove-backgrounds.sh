#!/bin/bash
# Background Removal Workflow
# High-quality background removal with transparency preservation

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     High-Quality Background Removal Workflow             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi

# Check if required packages are installed
echo -e "${YELLOW}📦 Checking dependencies...${NC}"

MISSING_DEPS=()

python3 -c "import rembg" 2>/dev/null || MISSING_DEPS+=("rembg")
python3 -c "import PIL" 2>/dev/null || MISSING_DEPS+=("pillow")
python3 -c "import numpy" 2>/dev/null || MISSING_DEPS+=("numpy")

if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
    echo -e "${RED}❌ Missing dependencies: ${MISSING_DEPS[*]}${NC}"
    echo ""
    echo "Installing missing dependencies..."
    pip install "${MISSING_DEPS[@]}" pymatting
    echo ""
fi

echo -e "${GREEN}✅ All dependencies installed${NC}"
echo ""

# Parse arguments
INPUT_DIR="${1:-/home/ae/AE/02_Showcase/aegnticdotai/public/assets/projects}"
OUTPUT_DIR="${2:-/home/ae/AE/02_Showcase/aegnticdotai/public/assets/projects/processed}"
MODEL="${3:-u2net}"
INPLACE=false

# Parse flags
while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--inplace)
            INPLACE=true
            shift
            ;;
        --model)
            MODEL="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

echo -e "${BLUE}📁 Input directory:${NC}  $INPUT_DIR"
echo -e "${BLUE}📁 Output directory:${NC} $OUTPUT_DIR"
echo -e "${BLUE}🤖 Model:${NC}            $MODEL"
echo -e "${BLUE}🔄 In-place mode:${NC}     $INPLACE"
echo ""

# Run the Python script
python3 "$SCRIPT_DIR/remove-backgrounds.py" \
    --input "$INPUT_DIR" \
    --output "$OUTPUT_DIR" \
    --model "$MODEL" \
    $( [ "$INPLACE" = true ] && echo "--inplace" )

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    ✨ Process Complete! ✨               ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Usage examples:${NC}"
echo "  ./scripts/remove-backgrounds.sh                                    # Use defaults"
echo "  ./scripts/remove-backgrounds.sh /path/to/input /path/to/output      # Custom paths"
echo "  ./scripts/remove-backgrounds.sh --inplace                          # Replace originals"
echo "  ./scripts/remove-backgrounds.sh --model u2netp                     # Use faster model"
echo ""
echo -e "${YELLOW}Available models:${NC}"
echo "  • u2net              - Best quality (slow, recommended)"
echo "  • u2netp             - Good quality, faster"
echo "  • u2net_human_seg    - Optimized for humans"
echo "  • silueta            - Lightweight, fastest"
echo ""
