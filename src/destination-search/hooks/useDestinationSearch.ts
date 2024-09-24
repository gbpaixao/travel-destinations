import { SelectProps } from "antd";
import debounce from 'lodash.debounce';
import { useMemo, useState } from "react";
import { DestinationService } from "../../services/DestinationService";
import { Destination } from "../../types/Destination";

export function useDestinationSearch(destinationService: DestinationService) {
  const [selectedDestination, setSelectedDestination] = useState<Destination>()
  const [data, setData] = useState<Destination[]>([]);
  const [dataOptions, setDataOptions] = useState<SelectProps['options']>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const handleDebounce = useMemo(() => {
    const handleDestinationSearch = async (name: string) => {
      setIsLoading(true)
      setDataOptions([])
      try {
        if (!name) return;
        const destinations = await destinationService.searchDestinationByName(name)
        setDataOptions((destinations).map((d) => ({
          value: d.id,
          label: d.name,
        })))
        setData(destinations)
        setError(undefined)
      } catch (error) {
        console.log('error', error)
        if (error instanceof Error) {
          setIsLoading(false)
          setError(error)
          setSelectedDestination(undefined)
        }
      } finally {
        setIsLoading(false)
      }
    }

    return debounce(handleDestinationSearch, 800);
  }, [destinationService])

  async function handleDestinationChange(destinationNumber: number) {
    const selectedDestination = data.find((dest) => dest.id === destinationNumber)
    setSelectedDestination(selectedDestination)
  }

  async function handleDestinationClear() {
    setSelectedDestination(undefined)
    setData([])
    setDataOptions([])
  }

  return { selectedDestination, data, dataOptions, handleDestinationSearch: handleDebounce, handleDestinationChange, handleDestinationClear, isLoading, error };
}