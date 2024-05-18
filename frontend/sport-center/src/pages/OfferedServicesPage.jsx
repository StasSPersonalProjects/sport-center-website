import { useEffect, useState } from "react";
import { OFFERED_SERVICES_URL } from "../utils/urls";
import { getAuthToken } from "../utils/auth";
import OfferedServicesList from "../components/OfferedServicesList";

export default function OfferedServicesPage() {

  const token = getAuthToken();
  const [fetchedServices, setFetchedServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(OFFERED_SERVICES_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }
        const fetchedData = await response.json();
        setFetchedServices(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  return <OfferedServicesList title={'Check our available services'} services={fetchedServices} />;
}