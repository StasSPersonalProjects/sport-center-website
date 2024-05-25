import { useState } from "react";
import styles from '../styles/AccordionItem.module.css';

export default function AccordionItem({ content }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['accordion-item']}>
      <div className={styles['accordion-title']} onClick={toggleOpen}>
        <h3>{content.name}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className={styles['accordion-content']}>
          <p>You purchased this service {content.timesBought} Times</p>
          <p>Total quantity purchased: {content.totalQuantity}</p>
        </div>
      )}
    </div>
  );
}