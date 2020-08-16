import React, { Component } from 'react';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import UserItem from '../UserItem/UserItem';
import { getData } from '../../api';
import styles from './UserList.module.scss';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isFetching: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      this.setState({
        isFetching: true,
      });

      const newUsers = await getData();

      console.log(newUsers);

      this.setState({
        users: [...this.state.users, ...newUsers],
        isFetching: false,
      });
    } catch (err) {
      this.setState({
        isFetching: false,
        error: { txt: err.message },
      });
      console.dir(err.message);
    }
  };

  mapUsers = () => {
    return this.state.users.map((user) => (
      <UserItem {...user} key={user.cell} deleteUser={this.deleteUser} />
    ));
  };

  logElement = (event) => {
    console.log(event.currentTarget);
  };

  clearError = () => {
    this.setState({
      error: null,
    });
    this.fetchUsers();
  };

  deleteUser = (cell) => {
    this.setState({
      users: this.state.users.filter((item) => item.cell !== cell),
    });
  };

  render() {
    const { users, isFetching, error } = this.state;

    return (
      <div className={styles.container}>
        {error && <Error txt={error.txt} clearError={this.clearError} />}

        {isFetching && <Spinner />}

        {users.length > 0 && this.mapUsers()}

        <div onClick={this.fetchUsers} className={styles.loadButton}>
          LOAD
        </div>
      </div>
    );
  }
}
