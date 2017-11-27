# Metrics of model performance to assess climate variability

Demonstration is in the video below.


# Description
Modes of natural climate variability from interannual to multi-decadal time scales are important as they have large impacts on regional and even global climate with attendant socio-economic impacts. Characterization of internal (i.e., unforced) climate variability is also important for the detection and attribution of externally-forced climate change signals. 
Internally-generated modes of variability also complicate model evaluation and intercomparison. As these modes are spontaneously generated, they need not exhibit the same chronological sequence in models as in nature. However, their statistical properties (e.g., time scale, autocorrelation, spectral characteristics, and spatial patterns) are captured to varying degrees of skill among climate models. 
In order to assess natural modes of climate variability in models, the NCAR Climate Variability Diagnostics Package (CVDP) has been implemented into the ESMValTool. 
CVDP evaluates the major modes of climate variability in models and observations, including ENSO, Pacific Decadal Oscillation, Atlantic Multi-decadal Oscillation, Northern and Southern Annular Modes, North Atlantic Oscillation, Pacific North and South American teleconnection patterns. 
It includes the calculations of related performance metrics which will be part of the delivered results and ESMValTool software. 
NCAR CVDP relies however solely on spatial average and empirical orthogonal function decomposition to assess variability modes. 
Clustering/classification methods offer an alternative way of identifying variability modes which is more robust in a physical sense and capable of taking into account the possible nonlinear characteristics of a climate field. 
Well-known applications are the identification of the North Atlantic and North Pacific weather regimes or the Arctic sea ice Central Arctic Thinning (CAT), Atlantic-Pacific Dipole (APD) and Canadian-Siberian Dipole (CSD) modes (e.g. 24, 15). 
Through the implementation of an interface with the s2dverification package, the calculations of performance metrics over the spatial structure, the frequency of occurrence and the persistence of these modes will be made available within the ESMValTool for any month or season of interest. 
These metrics will provide a thorough assessment of the performance of each model in reproducing the observed variability in terms of patterns, spectra and teleconnections.

