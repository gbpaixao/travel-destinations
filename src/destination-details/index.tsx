import { Button, Spin, Typography } from "antd";
import { DestinationService } from "../services/DestinationService";
import { Destination } from "../types/Destination";
import { useFetchDestinationDetails } from "./hooks/useFetchDestinationDetails";
import { useFetchNearbyLocations } from "./hooks/useFetchNearbyLocations";


interface Props {
  destination?: Destination;
  destinationService: DestinationService
}

export function DestinationDetails({ destination: inputDestination, destinationService }: Props) {
  const { destination, setDestination } = useFetchDestinationDetails({ inputDestination })
  const {
    nearbyDestinations,
    handleNearbyDestinationSelection,
    isLoading
  } = useFetchNearbyLocations({ destination, setDestination, destinationService })

  if (!destination) return <></>

  return (
    <div className="mt-4 w-96">
      {destination.id !== inputDestination?.id ?
        <Button type="link" onClick={() => setDestination(inputDestination)} className="p-0">
          <small>🔙 {inputDestination?.name}</small>
        </Button>
        : <></>
      }
      <div>
        <Typography.Title level={3}>{destination.name}</Typography.Title>
        <p>{destination.description}</p>
        <p><b>Country:</b> {destination.country}</p>
        <p><b>Climate:</b> {destination.climate}</p>
        <p><b>Currency:</b> {destination.currency}</p>
      </div>

      <div className="mt-4">
        <Typography.Title level={4}>Nearby Locations</Typography.Title>
        <div className="flex gap-2 flex-wrap">
          {isLoading ? <Spin size="small" /> : nearbyDestinations.map((nearbyDest) =>
            <Button
              key={nearbyDest.id}
              type="primary"
              onClick={() => handleNearbyDestinationSelection(nearbyDest)}
            >
              {nearbyDest.name}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
