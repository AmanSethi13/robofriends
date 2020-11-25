import React, {Component} from 'react';
import CardList from '../component/CardList';
// import {robots} from './robots';
import './App.css'
import Scroll from '../component/Scroll';
import SearchBox from '../component/SearchBox';
import ErrorBoundary from '../component/ErrorBoundary';

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: '',
        }
    }
    componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
           return response.json();
		}).then(users => {
			this.setState({ robots: users })
		})
       
	}
   
	onsearchChange = (event) =>{
		this.setState({searchfield : event.target.value});
	 }

   render(){
	   const {robots, searchfield} = this.state;
	   const filteredRobots = robots.filter(robot => {
		   return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	   });
	   if(!robots.length){
		  return <h1 className="f6 f2-m f-subheadline-l fw6 tc">Loading</h1>
	   }
     else{
		   return (
			   <div className='tc'>
				   <h1 className='f1'>ROBOFRIENDS</h1>
				   <SearchBox searchChange={this.onsearchChange} />
				   <Scroll>
					   <ErrorBoundary>
						   <CardList robots={filteredRobots} />
					   </ErrorBoundary>
				   </Scroll>
				   
			   </div>


		   )
	 }
   }
}

export default App;