# utils/clustering.py

import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import DBSCAN

def flood_clustering(ndwi, ndvi, ndbi):
    valid_mask = (~np.isnan(ndwi)) & (~np.isnan(ndvi)) & (~np.isnan(ndbi))
    features = np.column_stack([ndwi[valid_mask], ndvi[valid_mask], ndbi[valid_mask]])

    # Normalize + PCA
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)
    reduced = PCA(n_components=2).fit_transform(features_scaled)

    # Clustering using DBSCAN
    db = DBSCAN(eps=0.3, min_samples=100).fit(reduced)
    labels = db.labels_

    # Reconstruct image
    cluster_image = np.full(ndwi.shape, -1)
    cluster_image[valid_mask] = labels
    return cluster_image
