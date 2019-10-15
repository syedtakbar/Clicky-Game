import React, { Component } from "react";
import "./PictureCard.css";

export default class PictureCard extends Component {
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick = () => {
    this.props.cardClickMethod();
  }

  render() {
    return (
      <div className="card" onClick={() => this.handleCardClick(this.props.id)}>
        <div className="img-container">
          <img alt={this.props.name} src={this.props.image} />
        </div>
        <div className="content">
          <ul>
            <li>
              <strong>Name:</strong> {this.props.name}
            </li>
            <li>
              <strong>Occupation:</strong> {this.props.occupation}
            </li>
            <li>
              <strong>Location:</strong> {this.props.location}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
