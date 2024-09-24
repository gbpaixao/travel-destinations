import { useEffect, useState } from "react";
import { Destination } from "../../types/Destination";

interface Props {
  inputDestination?: Destination
}

export function useFetchDestinationDetails({ inputDestination }: Props) {
  const [destination, setDestination] = useState<Destination | undefined>(inputDestination)

  useEffect(() => {
    setDestination(inputDestination)
  }, [inputDestination])

  return { destination, setDestination }
}