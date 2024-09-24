interface Props {
  lat1: number;
  long1: number;
  lat2: number;
  long2: number;
}

export class CalculateDistance {
  constructor() { }

  private calculatePythagoreanDistanceBetweenCoordinates({ lat1, long1, lat2, long2 }: Props) {
    const dLat = lat2 - lat1;
    const dLon = long1 - long2;
    return Math.sqrt(dLat * dLat + dLon * dLon);
  }

  execute({ lat1, long1, lat2, long2 }: Props) {
    return this.calculatePythagoreanDistanceBetweenCoordinates({ lat1, long1, lat2, long2 })
  }
}