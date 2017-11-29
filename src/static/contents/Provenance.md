# Provenance

Video previewing provenance interface.

<iframe width="700" height="400" src="https://www.youtube.com/embed/8dm7C-auIdY" frameborder="0" allowfullscreen></frame>

## S-ProvFlow
The provenance system incorporated in C3S-Magic is based on the <strong>S-ProvFlow</strong> framework. 
S-ProvFlow combines a set of components in support of Reproducibility as a Service (RaaS). It includes a NoSQL document-store (MongoDB) for the storage of the provenance and lineage metadata, a service layer in the form of a Web API and a suite of interactive provenance access tools. The data-model specialises the W3CPROV recommendation for data-intensive application (S-PROV). 

RaaS addresses the limitations of grids and computational infrastructures in terms of flexible lineage metadata management services and tools, from its acquisition and representation to its rapid exploitation. 

Data lineage information, stored and accessible through the RaaS layer, can be used at any stage of the cycle. During the usage of experimenting tools and analysis software, for the iterative and preliminary validation, until the production of outreach and summarisation reports. 

The system can be deployed using docker technology. Current development branch with full dockerisation available at:
https://github.com/andrejsim/s-provenance/


<img src="/contents/images/sprov-gui-overview.png" width="700px">
