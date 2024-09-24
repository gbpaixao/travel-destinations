import { Select, Spin, Typography } from "antd";
import { DestinationDetails } from "../destination-details";
import { DestinationsFakeAPI } from "../fake-api";
import { DestinationService } from "../services/DestinationService";
import { CalculateDistance } from "../usecases/CalculateDistance";
import { useDestinationSearch } from "./hooks/useDestinationSearch";

export function DestinationSearch() {
  const calculateDistance = new CalculateDistance()
  const destinationsAPI = new DestinationsFakeAPI(calculateDistance);
  const destinationService = new DestinationService(destinationsAPI)
  const {
    selectedDestination,
    handleDestinationChange,
    handleDestinationSearch,
    handleDestinationClear,
    dataOptions,
    isLoading,
    error
  } = useDestinationSearch(destinationService)

  return (
    <div className="flex flex-col justify-center items-center m-6">
      <div className="flex flex-col bg-gray-300 p-10 rounded-lg w-96 gap-2">
        <Typography.Text>Location</Typography.Text>
        <Select
          showSearch
          value={selectedDestination?.id}
          placeholder="Search for a location..."
          defaultActiveFirstOption={false}
          suffixIcon={null}
          filterOption={false}
          onSearch={handleDestinationSearch}
          onChange={handleDestinationChange}
          onClear={handleDestinationClear}
          notFoundContent={isLoading ? <Spin size="small" /> : null}
          options={dataOptions}
          allowClear
        />
        <small className="text-red-500">{error?.message}</small>
      </div>

      <DestinationDetails destination={selectedDestination} destinationService={destinationService} />
    </div>
  )
}
