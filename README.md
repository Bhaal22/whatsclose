whatsclose
==========

Search engine for Bands !

For the moment :

 - Andreas & Nicolas
 - Arch Enemy
 - Dark Tranquility
 - Dropkick Murphys
 - Rise Against
 - Sabaton 
 - Social Distortion
 - Tagada Jones
 - Volbeat
 
#Indexer
## ElasticSearch version : 1.4

##Structure
	* main.js : entry point. retrieve the crawling modules and launch the data extract process
	* crawlers : folder containing the crawling modules. New files are automatically integrated into the process
	* model : folder containing the Base classes
	* services : folder containing the services 
		* ServiceHandler : main class used for initialising the events


#www
##Location
  * Front end is hosted on the following web server : [http://whatsclose.drylm.org:81]

## Docker :

  * in src/www directory
  * Build Container Image :
    * docker build -t whatsclose .
  * Run Containers :
    * docker run  -p 3000:3000 --name whatsclose1 --env NODE_ENV=dev whatsclose
    * docker run  -p 4000:3000 --name whatsclose2 --env NODE_ENV=dev whatsclose
  