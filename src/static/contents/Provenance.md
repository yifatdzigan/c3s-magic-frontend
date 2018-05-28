# Provenance

Video previewing provenance interface.

<iframe width="700" height="400" src="https://www.youtube.com/embed/78L-rmrkz2U" frameborder="0" allowfullscreen></frame>


The provenance system incorporated in C3S-Magic is based on the S-ProvFlow framework. 

S-ProvFlow combines a set of components in support of Reproducibility as a Service (RaaS). It includes a
NoSQL document-store (MongoDB) for the storage of the provenance and lineage metadata, a service layer in the form
of a Web API and a suite of interactive provenance access tools. The data-model specialises the W3CPROV
recommendation for data-intensive application (S-PROV). RaaS addresses the limitations of grids
and computational infrastructures in terms of flexible lineage metadata management services and tools, from
its acquisition and representation to its rapid exploitation. 

Data lineage information, stored and accessible through the RaaS layer, can be used at any stage of the cycle. During the usage of experimenting tools and analysis software, for the iterative and preliminary validation developed with the DARE technology, until the production of outreach and summarisation reports. 


See
https://github.com/knmi/s-provenance for more info.
=======
## S-ProvFlow
The provenance system incorporated in C3S-Magic is based on the <strong>S-ProvFlow</strong> framework.
S-ProvFlow combines a set of components in support of Reproducibility as a Service (RaaS). It includes a NoSQL document-store (MongoDB) for the storage of the provenance and lineage metadata, a service layer in the form of a Web API and a suite of interactive provenance access tools. Data lineage information, stored and accessible through the RaaS layer, can be used at any stage of the cycle. During the usage of experimenting tools and analysis software, for the iterative and preliminary validation, until the production of outreach and summarisation reports. The data-model specialises the W3C-PROV recommendation for data-intensive application (S-PROV).

<img src="/contents/images/sprovflowpnf.png" width="700px">

### Monitoring and Validation Visualiser (MVV)
The S-ProvFlow system offers a visual tool (Monitoring and Validation Visualiser- MVV) that allows different sorts of operations through the interactive access and manipulation of the provenance information. These include monitoring of the progress of the execution with runtime indication on the production of data and the occurrence of errors, dependency navigation, data discovery, data preview, download and selective staging.

### The Bulk Dependencies Visualiser (BDV)
The BVD produces comprehensive views for a single execution of a scientific data-intensive task or involving many runs and users. It exploits an approach to visual-analytics of the information captured that combines radial diagrams, selective grouping and Edge Bundles technique. Views of the provenance repository are generated interactively for multiple levels of granularity and for different kinds of expertise and roles. It offers facilities to tune and organise the views. We consider two classes of usage, respectively addressing details of a single computational tasks or the interaction between more tasks and users, according to specific data properties.


<img src="/contents/images/sprov-gui-overview.png" width="700px">


### The API
S-ProvFlow system exposes a RESTful web API which offers high-level services on top of the storage backend. The API methods are classified in <i>provenance acquisition</i>, <i>monitoring</i>, <i>discovery</i>, <i>validation and traceability</i>, <i>comprehensive-summaries</i>, <i>export</i>. This is the service layer on top of which all the above visualisation and exploration tools are built.

The API returns information in JSON-LD, which includes PROV and S-PROV semantics and references to external controlled vocabularies for the domain metadata describng the data entities. It allows clients to selectively export provenance traces in PROV-XML and RDF for a single data results, as well as for the entire computation.

The system can be deployed using docker technology. Current development branch with full dockerisation available at:
https://github.com/andrejsim/s-provenance/
