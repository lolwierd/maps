#!/bin/bash

# This script downloads GeoJSON files for different historical periods.
# It saves them into the public/geojson/ directory.
# Existing files in the target directory will be overwritten.

# --- Configuration ---
# Define target file paths
TARGET_0_CE="public/geojson/0_ce.geojson"
TARGET_1000_CE="public/geojson/1000_ce.geojson"
TARGET_1500_CE="public/geojson/1500_ce.geojson"

# URLs for the GeoJSON data
# For 0 AD, please uncomment one of the options below or provide your own URL.
# The original URL (world_0000.geojson) seems to be unavailable (404 error).
# Option 1: Data for 1 BC
# URL_0_CE_OPTION_BC1="https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_bc1.geojson"
# Option 2: Data for 100 AD (as a proxy for 0 AD if 1 BC is not suitable)
# URL_0_CE_OPTION_AD100="https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_100.geojson"

# USER ACTION REQUIRED: Uncomment one of the lines below and set it as URL_0_CE,
# or provide a different URL for 0 AD / 0 CE data.
# For example, to use the BC1 data:
# URL_0_CE="$URL_0_CE_OPTION_BC1"
# Or, to use the AD100 data:
# URL_0_CE="$URL_0_CE_OPTION_AD100"
URL_0_CE="" # USER TO UNCOMMENT AND SET ONE OPTION ABOVE, OR PROVIDE OWN URL

URL_1000_CE="https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1000.geojson"
URL_1500_CE="https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1500.geojson"

# --- Script Execution ---

# Ensure the target directory exists
echo "Ensuring directory public/geojson/ exists..."
mkdir -p public/geojson/
echo "Directory public/geojson/ is ready."
echo ""

# Fetching data for 0 CE
echo "--- Processing 0 CE ---"
if [ -n "$URL_0_CE" ]; then
    echo "Downloading data for 0 CE from $URL_0_CE..."
    curl -L -o "$TARGET_0_CE" "$URL_0_CE"
    if [ $? -eq 0 ]; then
        echo "Successfully downloaded to $TARGET_0_CE"
    else
        echo "Failed to download from $URL_0_CE"
    fi
else
    echo "URL_0_CE is not set. Skipping download for $TARGET_0_CE."
    echo "Please edit this script to set URL_0_CE to one of the provided options or your own URL."
fi
echo ""

# Fetching data for 1000 CE
echo "--- Processing 1000 CE ---"
if [ -n "$URL_1000_CE" ]; then
    echo "Downloading data for 1000 CE from $URL_1000_CE..."
    curl -L -o "$TARGET_1000_CE" "$URL_1000_CE"
    if [ $? -eq 0 ]; then
        echo "Successfully downloaded to $TARGET_1000_CE"
    else
        echo "Failed to download from $URL_1000_CE"
    fi
else
    echo "URL_1000_CE is not set (this should not happen with default script). Skipping $TARGET_1000_CE."
fi
echo ""

# Fetching data for 1500 CE
echo "--- Processing 1500 CE ---"
if [ -n "$URL_1500_CE" ]; then
    echo "Downloading data for 1500 CE from $URL_1500_CE..."
    curl -L -o "$TARGET_1500_CE" "$URL_1500_CE"
    if [ $? -eq 0 ]; then
        echo "Successfully downloaded to $TARGET_1500_CE"
    else
        echo "Failed to download from $URL_1500_CE"
    fi
else
    echo "URL_1500_CE is not set (this should not happen with default script). Skipping $TARGET_1500_CE."
fi
echo ""

# --- Optional Cleanup ---
# Uncomment the line below to delete the old 1900_ce.geojson dummy file
# rm public/geojson/1900_ce.geojson

echo "Script finished."
echo "Make sure to check for any download error messages above."
echo "If you haven't set URL_0_CE, the file $TARGET_0_CE was not created."
