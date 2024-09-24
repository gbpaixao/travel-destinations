import { DestinationsAPI } from "../fake-api";
import { Destination } from "../types/Destination";
import { CacheService } from "./CacheService";

interface IDestinationsDAO {
  searchDestinationByName: (name: string) => Promise<Destination[]>
  findNearbyDestinations: (id: number) => Promise<Destination[]>
}

export class DestinationService implements IDestinationsDAO {
  cacheService: CacheService = new CacheService

  constructor(private destinationsAPI: DestinationsAPI) { }

  async searchDestinationByName(name: string): Promise<Destination[]> {
    return this.cacheService.getOrSetItem<Destination[]>(`destinations_${name}`, this.destinationsAPI.searchDestinationByName(name))
  }

  async findNearbyDestinations(id: number): Promise<Destination[]> {
    return this.cacheService.getOrSetItem<Destination[]>(`nearby_destinations_${id}`, this.destinationsAPI.findNearbyDestinations(id))
  };
}