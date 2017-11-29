# Generic metrics of model performance to assess the mean state

A starting point for the calculation of performance metrics is to assess the representation of simulated climatological mean states and the seasonal cycle for essential climate variables.

## Demonstration Video

<iframe width="700" height="400" src="https://www.youtube.com/embed/SjQ60KXfhO4" frameborder="0" allowfullscreen></frame>

## Metric Description

A namelist has been implemented in ESMValTool version 1.0 that produces a “portrait diagram” by calculating the relative space-time root-mean square error (RMSE) from the climatological mean seasonal cycle of historical simulations for selected variables. The overall mean bias can additionally be calculated. Different normalizations (mean, median, centered median) can be chosen and the multi model mean/median can also be added. With this namelist it is also possible to perform more in-depth analyses of the ECVs, by calculating seasonal cycles, Taylor diagrams, zonally averaged vertical profiles and latitude-longitude maps. This namelist has been expanded to include additional variables from monthly mean two-dimensional fields and additional observations and reanalyses products.

Parts of ESMValTool are currently being rewritten based on IRIS in order to allow an efficient pre-processing of the input data (models and observations), covering common operations such as format check, variable derivation, regridding, masking, and temporal and spatial subsetting, which need to be performed before the analysis and diagnostic codes can be applied.

The performance metrics namelist is currently being adapted and tested with this revised backend. A first test case shows the annual cycle plot of temperature at 850 hPa, see below. The results are binary identical (to single precision) to the ones obtained with the master version (v1.0) at every preprocessing step (cmorization, level selection, regridding and masking). The revised version is about 10 times faster as the previous one.

<img src="/contents/images/perfmetrics_main_ta_cycle_monthlyclim__Glob.png" width="700px">

<img src="/contents/images/perfmetrics_main_ta_cycle_monthlyclim__Glob_legend_transparent.png" width="700px">

