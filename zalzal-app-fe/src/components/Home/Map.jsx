import React, { useEffect, useState } from "react";
import BingMapsReact from "bingmaps-react";
import Papa from 'papaparse'
import VillageData from './Douars50km.csv' 

function Map() {
  const [pushPins, setPushPins] = useState([]);
  const [bingMapReady, setBingMapReady] = useState(false);

 const CenterEarthQuake =  {
  latitude: 31.07317457220632,
  longitude: -8.406957080277902,
}

  const handlePushpinClick = () => {
    console.log("handlePushpinClick");
  };

  const handleMoreInfoClick = () => {
    console.log("handleMoreInfoClick");
  };

  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(VillageData, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            latitude: parseFloat(row[1]),
            longitude: parseFloat(row[0]),
            name: row[2],
          }));

          const pushPinsData = parsedData.map((village) => ({
            center: {
              latitude: village.latitude,
              longitude: village.longitude,
            },

            options: {
              title: village.name,
              color: "red",
              icon: "",
              enableHoverStyle: true,
              label: village.name,
            },
            infobox: {
              title: "Information",
              description: "This is an infobox for the pushpin.",
              actions: [
                {
                  label: "More Info",
                  eventHandler: handleMoreInfoClick,
                },
              ],
            },
            events: {
              click: handlePushpinClick,
            },
          }));

          setPushPins(pushPinsData);
          setBingMapReady(true); 
        },
      });
    };
    fetchParseData();
  }, []);

  return (
    <BingMapsReact
      bingMapsKey="AhWIRQ2jlGpIYCjYkTns5knl56C05ervAIg4S_6cekLW_Gy864oVc8b4LBphnGLK"
      height="700px"
      onMapReady={() => {
      }}
      mapOptions={{
        navigationBarMode: "compact", //compact
        showBreadcrumb: true,
        colorScheme: {
          primaryColor: "white"
        },
      }}
      width="100%"
      pushPins={bingMapReady ? pushPins : []} 
      viewOptions={{
        mapTypeId: "aerial",
        labelOverlay: "visible",
        zoom: 9.5,
        center: CenterEarthQuake
      }}
    />
  );
}

export default Map;
