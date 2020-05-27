import React from "react";
import PropTypes from "prop-types";

// Define the shape of props
NameCard.PropTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  age: PropTypes.number,
  contact: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

class NameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", handleResize);
  }
  handleResize() {
    setScreenWidth(window.innerWidth);
  }

  render() {
    const { name, age, contact } = this.props;
    const { screenWidth } = this.state;
    return (
      <div style={{ width: screenWidth }}>
        <p>{name}</p>
        <p>{age}</p>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
      </div>
    );
  }
}

export default NameCard;
