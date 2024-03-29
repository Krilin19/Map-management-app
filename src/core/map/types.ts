export interface GisParameters {
  container: HTMLDivElement;
  accessToken: string;
  zoom: number;
  center: [number, number];
  pitch: number;
  bearing: number;
 
  buildings: Building[];
}


export interface Building {
  uid: string;
  userID: string;
  lat: number;
  lng: number;
  name: string;
  models: Model[];

}

export interface Model {
  name: string;
  id: string;
}


export interface LngLat {
  lng: number;
  lat: number;
}