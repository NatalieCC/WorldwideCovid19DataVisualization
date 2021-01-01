# TheWorldwideCoronavirusData

[TheWorldwideCoronavirusData site](https://natalieCC.github.io/WorldwideCovid19DataVisualization/)

`TheWorldwideCoronavirusData` is a data visualization that uses total cases of Coronavirus, differentiated by day and country, which allows users to view the accmulated Coronavirus cases per country, since the day of February the 24th,2020 to December the 15th,2020. Users are able to see the data on a global scale, and the overall progression since the beginning of this epidemic.
This application was built with D3, Vanilla Javascript & HTML5, using data from https://ourworldindata.org/.

## Technology used:
* D3 Javascript Library
* Vanilla Javascript

## Features
* D3 was used to create a world map using geoJson mapping and csv data, with each country's color representing the amount of accumulated cases. Javascript was used to create a slidebar that allows the map to re-paint itself based on the date being chosen.

* To create a timelapse effect, and rather than having to create a new map with different colors each time--because that process savierly slowed down the application--the colors are simply re-painted based on what date is being selected. This Allows the program to run in an efficient manner.  


