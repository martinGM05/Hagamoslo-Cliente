// import React from 'react'
// import { decode } from "@mapbox/polyline";
// export const getDirections = async (startLoc: string, destinationLoc: string) => {
//     try {
//         const KEY = "AIzaSyC0PZVZz6Pxy74Hal64-VtZSDOyYrqTMEE"; //put your API key here.
//         //otherwise, you'll have an 'unauthorized' error.
//         let resp = await fetch(
//             `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
//         );
//         let respJson = await resp.json();
//         let points = decode(respJson.routes[0].overview_polyline.points);
//         console.log(points);
//         let coords = points.map((point: any, index: any) => {
//             return {
//                 latitude: point[0],
//                 longitude: point[1]
//             };
//         });
//         return coords;
//     } catch (error) {
//         return error;
//     }
// };

import * as React from 'react';
