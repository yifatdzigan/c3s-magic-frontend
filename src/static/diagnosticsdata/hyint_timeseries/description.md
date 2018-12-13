The HyInt timeseries metric calculates joint timeseries and trend calculation for the HyInt hydroclimatic indices and ETCCDI climate extremes indices over pre-selected continental scale regions or user defined regions. The hydroclimatic indices were selected following Giorgi et al. (2014)':' 
* the simple precipitation intensity index (SDII), 
* the maximum dry spell length (DSL) and wet spell length (WSL), 
* the hydroclimatic intensity index (HY-INT = normalized(SDII) x normalized(DSL)), 
* a measure of the overall behaviour of the hydroclimatic cycle (Giorgi et al., 2011) and the 
* precipitation area (PA), i.e. the area over which at any given day precipitation occurs, (Giorgi et al., 2014). 

The 27 ETCCDI indices are included in the analysis upon selection from the user. Trends are calculated using the R lm function and significance testing performed with a Student T test on non-null coefficients hypothesis. Trend coefficients are stored together with their statistics which include standard error, t value and Pr(>|t|). The tool produces a variety of types of plots including timeseries with their spread, trend lines and summary plots of trend coefficients.

Figure: output figure type 12 for selected indices and regions calculated for EC-Earth rcp85 over 1976-2100
![example output](diagnosticsdata/hyint_timeseries/hyint_timeseries.png "Example Output")

Figure: output figure type 14 for selected indices and regions calculated for EC-Earth rcp85 over 1976-2100
![example output](diagnosticsdata/hyint_timeseries/hyint_trends1.png "Example Output")
![example output](diagnosticsdata/hyint_timeseries/hyint_trends2.png "Example Output")
