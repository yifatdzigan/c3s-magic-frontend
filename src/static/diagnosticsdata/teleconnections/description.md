Part of the ESMValTool recipe MId-Latitude Evaluation System (MiLES) the teleconnection diagnostic is calculated using daily 500hPa geopotential height data (with data interpolated on a common 2.5x2.5 grid) and provides the following diagnostics':'

* Z500 Empirical Orthogonal Functions':' 

Based on SVD. The first 4 EOFs for North Atlantic (over the 90W-40E 20N-85N box) and Northern Hemisphere (20N-85N) or a custom region are computed. North Atlantic Oscillation, East Atlantic Pattern, and Arctic Oscillation can be evaluated. Figures showing linear regression of PCs on monthly Z500 are provided. PCs and eigenvectors, as well as the variances explained are provided in NetCDF4 Zip format.

* North Atlantic Weather Regimes':' 

Following k-means clustering of 500hPa geopotential height. 4 weather regimes over North Atlantic (80W-40E 30N-87.5N) are evaluated using anomalies from daily seasonal cycle. This is done retaining the first North Atlantic EOFs which explains the 80% of the variance to reduce the phase-space dimensions and then applying k-means clustering using Hartigan-Wong algorithm with k=4. Figures report patterns and frequencies of occurrence. NetCDF4 Zip data are saved. Only 4 regimes and DJF supported so far.

The teleconnection diagnostic is implemented in the ESMValTool recipe MId-Latitude Evaluation System (MiLES), also available as [stand-alone package](https://github.com/oloapinivad/MiLES). 

![example output](diagnosticsdata/teleconnections/EOF1_MPI-ESM-P_r1_1951_2005_DJF.png "NAO EOF1")
![example output](diagnosticsdata/teleconnections/Regime2_MPI-ESM-P_r1_1951_2005_DJF.png "Regimes")


