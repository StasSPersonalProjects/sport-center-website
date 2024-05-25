import { useEffect, useState } from "react";
import { PURCHASED_SERVICES_URL } from "../utils/urls";
import { getAuthToken } from "../utils/auth";
import styles from '../styles/PurchasedServices.module.css';
import AccordionItem from "./AccordionItem";

export default function PurchasedServices({ cartChanged }) {

  const [fetchedPurchasedServices, setFetchedPurchasedServices] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    async function fetchPurchaseServices() {
      try {
        const response = await fetch(PURCHASED_SERVICES_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        if (response.ok) {
          const resData = await response.json();
          setFetchedPurchasedServices(resData)
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchPurchaseServices();
  }, [cartChanged]);

  return (
    <div className={styles.accordion}>
      <h2>Purchased Services</h2>
      <div>
        {fetchedPurchasedServices.map((service, index) => (
          <AccordionItem key={index} content={service} />
        ))}
      </div>
    </div>
  );
}