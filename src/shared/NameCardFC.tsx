import React, { FunctionComponent, useState, useEffect } from "react";

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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {contact.email}</p>
      <p>phone: {contact.phone}</p>
      <p>screenWidth: {screenWidth} </p>
    </div>
  );
};

export default NameCard;
