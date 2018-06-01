This namelist calls RainFARM (https://github.com/jhardenberg/RainFARM.jl). RainFARM is a Julia library and command-line tools implementing the RainFARM stochastic precipitation downscaling method adapted for climate models. The stochastic method allows to predict climate variables at local scale from information simulated by climate models at regional scale: It first evaluates the statistical distribution of precipitation fields at regional scale and then applies the relationship to the boundary conditions of the climate model to produce synthetic fields at the requested higher resolution. RainFARM exploits the nonlinear transformation of a Gaussian random precipitation field, conserving the information present in the fields at larger scale (Rebora et al., 2006).

![example output](diagnosticsdata/rainfarm/RainFARM_example_8x8.png "Example Output")
![example output](diagnosticsdata/rainfarm/RainFARM_example_64x64.png "Example Output")

### Description of user-changeable settings on webpage

1) Selection of model;

2) Selection of period;

3) Selection of longitude and latitude. rlonlatdata: [4,13,44,53] [lon1,lon2,lat1,lat2] with lon(0/360) Subsetting of region where calculation is to be performed. The selected region needs to have equal number of longitude and latitude grid points;

4) Regridding (preprocessing option): default option false;

5) slope: 1.7  # spatial spectral slope adopted to produce data at local scale;

6) nens: 2  # number of ensemble members to be calculated;

7) nf: 8  # number of subdivisions for downscaling
