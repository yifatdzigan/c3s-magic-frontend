# Provenance

Video previewing provenance interface.

<iframe width="700" height="400" src="https://www.youtube.com/embed/8dm7C-auIdY" frameborder="0" allowfullscreen></frame>

## S-ProvFlow
The provenance system incorporated in C3S-Magic is based on the <strong>S-ProvFlow</strong> framework. 
S-ProvFlow combines a set of components in support of Reproducibility as a Service (RaaS). It includes a NoSQL document-store (MongoDB) for the storage of the provenance and lineage metadata, a service layer in the form of a Web API and a suite of interactive provenance access tools. Data lineage information, stored and accessible through the RaaS layer, can be used at any stage of the cycle. During the usage of experimenting tools and analysis software, for the iterative and preliminary validation, until the production of outreach and summarisation reports. The data-model specialises the W3C-PROV recommendation for data-intensive application (S-PROV). 

### Monitoring and Validation Visualiser (MVV)
The S-ProvFlow system offers a visual tool (Monitoring and Validation Visualiser- MVV) that allows different sorts of operations through the interactive access and manipulation of the provenance information. These include monitoring of the progress of the execution with runtime indication on the production of data and the occurrence of errors, dependency navigation, data discovery, data preview, download and selective staging.

### The Bulk Dependencies Visualiser (BDV)
The BVD produces comprehensive views for a single execution of a scientific data-intensive task or involving many runs and users. It exploits an approach to visual-analytics of the information captured that combines radial diagrams, selective grouping and Edge Bundles technique. Views of the provenance repository are generated interactively for multiple levels of granularity and for different kinds of expertise and roles. It offers facilities to tune and organise the views. We consider two classes of usage, respectively addressing details of a single computational tasks or the interaction between more tasks and users, according to specific data properties.

The system can be deployed using docker technology. Current development branch with full dockerisation available at:
https://github.com/andrejsim/s-provenance/


<img src="/contents/images/sprov-gui-overview.png" width="700px">
