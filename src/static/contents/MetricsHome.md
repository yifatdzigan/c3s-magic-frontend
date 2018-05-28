# Metrics

Metrics of performance measure different aspects of model-data correspondence.
This can be a simple distance (bias), a measure of variability, or the correspondence between patterns.
They can take the form of a single number, a map of performance numbers or a diagram, and it can apply to daily, monthly or annual time scales.
Several metrics have been proposed in the literature, and a lot of them have been incorporated in the ESMValTool, the s2dverification package, and other software packages.

The final metrics package can be routinely run for either the historical simulation (EH1: Historical ensemble, 1850 to at least 2005, imposed changing concentrations and forcings) or the AMIP simulation (EH2: AMIP ensemble, 1979 to at least 2008, prescribed SST and sea-ice concentration, other forcings as in Historical ensemble above).

While a metric is intended to measure model quality, an index is intended to express a certain state of the model. A clear separation between “metric”  and “index” is not always easy to give.

To calculate Metrics, go to one of the tabs:
* Mean state
* Climate variability
* Extreme events
