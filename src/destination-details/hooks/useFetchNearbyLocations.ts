import { useEffect, useState } from "react";
import { DestinationService } from "../../services/DestinationService";
import { Destination } from "../../types/Destination";

interface Props {
  destinationService: DestinationService
  destination?: Destination
  setDestination: (destination: Destination) => void;
}

export function useFetchNearbyLocations({ destinationService, destination, setDestination }: Props) {
  const [nearbyDestinations, setNearbyDestinations] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function fetchNearbyDestinations() {
    if (!destination) return;
    try {
      setIsLoading(true)
      const destinations = await destinationService.findNearbyDestinations(destination.id)
      setNearbyDestinations(destinations)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }

  }

  function handleNearbyDestinationSelection(destination: Destination) {
    setDestination(destination)
  }

  useEffect(() => {
    fetchNearbyDestinations()
  }, [destination])

  return { nearbyDestinations, handleNearbyDestinationSelection, isLoading }
}