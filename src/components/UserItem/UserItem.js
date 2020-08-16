import React, { Component } from 'react';
import styles from './UserItem.module.scss';

export default class UserItem extends Component {
  constructor(props) {
    super(props);
  }

  deleteHandler = () => {
    this.props.deleteUser(this.props.cell);
  };

  render() {
    const {
      name,
      location,
      phone,
      email,
      cell,
      picture: { medium: imgSrc },
    } = this.props;

    return (
      <div className={styles.userItemContainer}>
        <img className={styles.userAvatar} src={imgSrc} />
        <div>{`${name.first} ${name.last}`}</div>
        <div>{`Telephone number: ${phone}`}</div>
        <div>{`${location.country}, ${location.city}`}</div>
        <div onClick={this.deleteHandler}>DELETE</div>
      </div>
    );
  }
}
