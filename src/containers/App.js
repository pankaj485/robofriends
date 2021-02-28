import React, { Component } from 'react';
import CardList from '../components/Cardlist';
import SearchBox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: '',
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				return response.json();
			})
			.then((users) => {
				this.setState({ robots: users });
			});
	}
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	};

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		return !robots.length ? (
			<div className="tc">
				<h1>Loading !!!</h1>
			</div>
		) : (
			<div className="tc">
				<h1 className="f1"> Hi , I'm Robo </h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
		);
	}
}

export default App;
