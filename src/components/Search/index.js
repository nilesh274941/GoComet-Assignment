import React, { Component } from 'react';
import Product from './../Product';
import data from './../../data';
import Modal from 'react-modal';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';


function Search(props){
  const history=useHistory();
  console.log(history);
  let filteredData=[...data];	
  const [gender,setGender]=useState("");
  const [brands,setBrands]=useState([]);
  const [priceRanges,setPriceRanges]=useState([]);
  const [sortBy,setSortBy]=useState("BD");
  const [showFilterModal, setShowFilterModal]=useState(false);
  const [showSortModal, setShowSortModal]=useState(false);
  const applyFilter=()=>{
	  let fd=[...data];
	  // filter by gender
	  if(gender!=="") {
		fd=fd.filter(piece=> piece.gender===gender);
	  }
	  // filter by brand
	  if(brands.length!==0) {
		  fd=fd.filter(piece=>brands.includes(piece.brand));
	  }
	  // filter by price
	  if(priceRanges.length!==0) {
		fd=fd.filter(piece=>{
			for(let i=0;i<priceRanges.length;++i) {
				const pr=priceRanges[i];
				if(piece.price>=pr.min && piece.price<=pr.max) return true;
			}
			return false;
		});
	  }
	  filteredData=fd;
  }
  const applySort=()=>{
	let sd=[...filteredData];
	if(sortBy==="BD") {
		sd=sd.sort((a,b)=>{
			const discountA=parseInt(100-(a.price/a.originalPrice)*100);
			const discountB=parseInt(100-(b.price/b.originalPrice)*100);
			return discountB-discountA;
		});		
	}
	else if(sortBy==="LtoH") {
		sd=sd.sort((a,b)=>a.price-b.price);
	}
	else if(sortBy==="HtoL") {
		sd=sd.sort((a,b)=>b.price-a.price);
	}
	filteredData=sd;
  }
  applyFilter();
  applySort();
  const onGenderChange=(g)=>{
	  setGender(g);
  }
  const onBrandChange=(evt,brand)=>{
	if(evt.target.checked) {
		setBrands([...brands,brand]);
	}
	else {
		const index=brands.indexOf(brand);
		if(index>=0) {
			const temp=[...brands];
			temp.splice(index,1);
			setBrands(temp);
		}
	}
  }
  const onPriceRangeChange=(evt,min,max)=>{
	  if(evt.target.checked) {
		setPriceRanges([...priceRanges,{min,max}]);
	  }
	  else {
		  const temp=[...priceRanges];
		  for(let i=0;i<temp.length;++i) {
			  if(temp[i].min===min) {
				  temp.splice(i,1);
				  break;
			  }
		  }
		  setPriceRanges(temp);
	  }
  }
  const onSortChange=(value)=>{
	  setSortBy(value);
  };	
	
	
	
	
	return (
		<div className="search">
			<div className="option1">
				<div className="filter-header">
					FILTERS
				</div>
				<div className="search-box">
				</div>
				<div className="sort-box">	
					<select onChange={(evt)=>onSortChange(evt.target.value)}>
						<option value="BD" checked={sortBy==="BD"}>Sort by: Better Discount</option>
						<option value="LtoH" checked={sortBy==="BD"}>Sort by: Price: Low to High</option>
						<option value="HtoL" checked={sortBy==="BD"}>Sort by: Price: High to Low</option>
					</select>
				</div>
			</div>
			<div className="app-wrapper">
				<div className="side-bar">
					<div className="filter-panel gender-filter-panel">
						<input type="radio" name="gender" onChange={(evt)=>onGenderChange("male")} value="male" /> Men <br/>
						<input type="radio" name="gender" onChange={(evt)=>onGenderChange("female")}  value="female" /> Women 
					</div>
					<div className="filter-panel brand-filter-panel">
						<span>BRAND</span><br/><br/>
						<input type="checkbox" onChange={evt=>onBrandChange(evt,"Parx")} /> Parx <br/>
						<input type="checkbox" onChange={evt=>onBrandChange(evt,"Park Avenue")} /> Park Avenue <br/>
						<input type="checkbox" onChange={evt=>onBrandChange(evt,"Roadster")} /> Roadster
					</div>
					<div className="filter-panel price-filter-panel">
						<span>PRICE</span><br/><br/>
						<input type="checkbox" onClick={evt=>onPriceRangeChange(evt,399,1000)} />  399 - 1000<br/>
						<input type="checkbox" onClick={evt=>onPriceRangeChange(evt,1000,1500)} /> 1000 - 1500 <br/>
						<input type="checkbox" onClick={evt=>onPriceRangeChange(evt,1500,2000)} /> 1500 - 2000 
					</div>

				</div>
				<div className="product-container">
					{
						filteredData.map((piece,pieceIndex)=>{
							return <Product key={pieceIndex} piece={piece} history={history} />
						})
					}
				</div>
			</div>
			<div className="option2">	
				<div className="sort-box" onClick={(evt)=>{setShowSortModal(true)}} style={{cursor: "pointer"}}>
					Sort
				</div>
				<div className="filter-box" onClick={(evt)=>{setShowFilterModal(true)}} style={{cursor: "pointer"}}>
					Filter
				</div>
			</div>
			<Modal
			  isOpen={showFilterModal}
			  onAfterOpen={null}
			  onRequestClose={null}
			  contentLabel="Example Modal"
			>
			  
				<div className="filter-bar" style={{width: "100%"}}>
					<div className="filter-panel gender-filter-panel">
						<input type="radio" name="gender" onChange={(evt)=>onGenderChange("male")} value="male" checked={gender==="male"} /> Men <br/>
						<input type="radio" name="gender" onChange={(evt)=>onGenderChange("female")}  value="female" checked={gender==="female"} /> Women 
					</div>
					<div className="filter-panel brand-filter-panel">
						<span>BRAND</span><br/><br/>
						<input type="checkbox" onChange={evt=>onBrandChange(evt,"Parx")} checked={brands.includes("Parx")}/> Parx <br/>
						<input type="checkbox" onChange={evt=>onBrandChange(evt,"Park Avenue")} checked={brands.includes("Park Avenue")} /> Park Avenue <br/>
						<input type="checkbox" onChange={evt=>onBrandChange(evt,"Roadster")} checked={brands.includes("Roadster")} /> Roadster
					</div>
					<div className="filter-panel price-filter-panel">
						<span>PRICE</span><br/><br/>
						<input type="checkbox" onClick={evt=>onPriceRangeChange(evt,399,1000)} checked={priceRanges.includes({min: 399, max: 1000})}/>  399 - 1000<br/>
						<input type="checkbox" onClick={evt=>onPriceRangeChange(evt,1000,1500)} checked={priceRanges.includes({min: 1000, max: 1500})} /> 1000 - 1500 <br/>
						<input type="checkbox" onClick={evt=>onPriceRangeChange(evt,1500,2000)} checked={priceRanges.includes({min: 1500, max: 2000})} /> 1500 - 2000 
					</div>
				</div>
				<button className="modal-close-button" onClick={(evt)=>{setShowFilterModal(false)}}>CLOSE</button>
			  
			</Modal>
			<Modal
			  isOpen={showSortModal}
			  onAfterOpen={null}
			  onRequestClose={null}
			  contentLabel="Example Modal"
			  style={{ content: {height: "max-content",top: "100", bottom: "0", width: "100%",left: "0"} }}
			>
				<h3>SORT BY</h3>
				<div onClick={(evt)=>{onSortChange("BD");setShowSortModal(false)}} style={{fontWeight: "bold",cursor: "pointer",padding: "4px 0px"}}>Better Discount</div>
				<div onClick={(evt)=>{onSortChange("LtoH");setShowSortModal(false)}} style={{fontWeight: "bold",cursor: "pointer",padding: "4px 0px"}}>Price: Low to High</div>
				<div onClick={(evt)=>{onSortChange("HtoL");setShowSortModal(false)}} style={{fontWeight: "bold",cursor: "pointer",padding: "4px 0px"}}>Price: High to Low</div>
			</Modal>			
		</div>
	);
}

export default Search;