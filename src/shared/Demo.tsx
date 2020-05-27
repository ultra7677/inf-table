import React, { FunctionComponent, useState, useEffect } from "react";
import useScreenWidth from "./UseScreenWidth";
// Define the shape of props
interface NameCardProps {
  id: number;
  name: string;
  age: number;
  contact: {
    email: string;
    phone: string | number;
  };
}

const NameCard: FunctionComponent<NameCardProps> = (props) => {
  const { name, age, contact } = props;
  let screenWidth = useScreenWidth();
  return (
    <div style={{ width: screenWidth }}>
      <p>{name}</p>
      <p>{age}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
    </div>
  );
};

export default NameCard;
