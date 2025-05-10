# utils/raster_loader.py

import rasterio
import numpy as np

def load_rasters(ndwi_path, ndvi_path, ndbi_path):
    with rasterio.open(ndwi_path) as src_ndwi:
        ndwi = src_ndwi.read(1)
        profile = src_ndwi.profile
    with rasterio.open(ndvi_path) as src_ndvi:
        ndvi = src_ndvi.read(1)
    with rasterio.open(ndbi_path) as src_ndbi:
        ndbi = src_ndbi.read(1)
    return ndwi, ndvi, ndbi, profile
