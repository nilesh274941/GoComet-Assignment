import './styles.css';
import data from './../../data';
import {useState} from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Details from './../Details';
import Search from './../Search';
import Header from './../Header';

function App(props) {
  const [bag,setBag]=useState([]);
  const addToBag=(product)=>{
	if(bag.includes(product)) return;
	setBag([...bag,product]);
  }
  const removeFromBag=(id)=>{
	for(let i=0;i<bag.length;++i) {
		const product=bag[i];
		if(product.id===id) {
			const temp=[...bag];
			temp.splice(i,1);
			setBag(temp);
			break;
		}
	}
  }
  return (
	<div className="app">
		<BrowserRouter>
			<Header  removeFromBag={removeFromBag} bag={bag} />
			<Switch>
			<Route exact path="/details/:id" render={(props)=><Details {...props} addToBag={addToBag}/>} />
			<Route path="/">
				<Search />
			</Route>
		</Switch>
	</BrowserRouter>	
	</div>
  );
}

export default App;
