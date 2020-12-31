declare namespace mapboxgl {
  let accessToken: string;

  type LngLat = [
    number, // lng
    number // lat
  ];
  class Map {
    constructor(parameters: { container: HTMLElement; center?: LngLat; style?: string });
    public remove(): void;
  }

  class Marker {
    public setLngLat(coordinates: LngLat): void;

    public addTo(map: Map): void;
    public remove(): void;
  }
}
