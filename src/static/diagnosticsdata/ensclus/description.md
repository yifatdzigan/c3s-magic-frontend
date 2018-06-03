EnsClus is a cluster analysis tool in Python, based on the k-means algorithm, for ensembles of climate model simulations. The aim is to group ensemble members according to similar characteristics and to select the most representative member for each cluster.

The user choose which feature of the data is used to group the ensemble members by the clustering: time mean, maximum, a certain percentile (75% in the examples below), standard deviation and trend over the time period. For each ensemble member this value is computed at each grid point, obtaining N lat-lon maps, where N is the number of ensemble members. The anomaly is computed subtracting the ensemble mean of these maps to each of the single maps. The anomaly is therefore computed with respect to the ensemble members (and not with respect to the time) and the Empirical Orthogonal Function (EOF) analysis is applied to these anomaly maps.

Regarding the EOF analysis, the user can choose either how many Principal Components (PCs) the user want to retain or the percentage of explained variance the user want to keep. After reducing dimensionality via EOF analysis, k-means analysis is applied using the desired subset of PCs. The major final outputs are the classification in clusters, i.e. which member belongs to which cluster (in k-means analysis the number k of clusters needs to be defined prior to the analysis) and the most representative member for each cluster, which is the closest member to the cluster centroid.

Other outputs refer to the statistics of clustering: in the PC space, the minimum and the maximum distance between a member in a cluster and the cluster centroid (i.e. the closest and the furthest member), the intra-cluster standard deviation for each cluster (i.e. how much the cluster is compact).

### Description of user-changeable settings on webpage

1) Selection of variable name, as in the NetCDF data file.

2) Selection of total number of ensemble members.

3) Selection of season (DJF, DJFM, NDJFM, JJA so far).

4) Selection of area (EAT, PNA, NH so far).

5) Selection of kind of simulations (historical, scenario).

6) Selection of number of clusters.

7) Selection of value to investigate (??th_percentile, mean, maximum, standard deviation, trend).

8) Either set percentage of variance explained by PCs or directly the number of PC to retain (cluster analysis is applied on such subset of PCs).
