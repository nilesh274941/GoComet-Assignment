import React, { Component } from 'react';
import data from './../../data';
import Modal from 'react-modal';

export default class Details extends Component {
	constructor(props) {
		super(props);
		this.id=this.props.match.params.id;
		this.piece=(data.filter(p=>p.id==this.id))[0];
		this.state={
			size: -1,
			showPhotoModal: false,
			activeImageIndex: 0,
		}
		this.setSize=(size)=>{
			this.setState({
				size,
			});
		}
		this.addToBag=(evt)=>{
			if(this.state.size===-1) {
				alert("Please specify the size");
				return;
			}
			const product={
				...this.piece,
				selectedSize: this.state.size,
			};
			this.props.addToBag(product);			
			alert("Product added into the bag.");
		}
		this.previewClicked=(evt)=>{
			if(this.state.activeImageIndex===0) return;
			this.setState({activeImageIndex: this.state.activeImageIndex-1});
		}
		this.nextClicked=(evt)=>{
			if(this.state.activeImageIndex===3) return;
			this.setState({activeImageIndex: this.state.activeImageIndex+1});
		}
	}
	render() {
		return  (
		<div className="details">
			<div className="details-wrapper">
				<div className="images">
				{
					this.piece.url.map((imageUrl,index)=>{
						return <img key={index}  src={imageUrl} onClick={evt=>{this.setState({activeImageIndex: index, showPhotoModal: true})}}/>
					})
				}
				</div>
				<div className="piece-data">
					<div className="brand">
						<h2 style={{margin: "2px"}}>
						{this.piece.brand}
						</h2>
					</div>
					<div className="type">
						{this.piece.type}
					</div>
					<div className="price-wrapper">
						<span className="price">{this.piece.price} </span> 
						<span className="original-price"><s>{this.piece.originalPrice}</s> </span>
						<span className="discount"> {parseInt(100-(this.piece.price/this.piece.originalPrice)*100)}% OFF</span>
					</div>
					<div className="size-choice-container" style={{padding: "10px"}}>
					<h5  style={{margin: "2px"}}>Select Size</h5>
					{
						this.piece.sizes.map((size,sizeIndex)=>{
							const className=(this.state.size===size)?"size-button active":"size-button";
							return (<button className={className} onClick={evt=>this.setSize(size)}>{size}</button>);
						})
					}
					<br/>
					<br/>
					<button onClick={this.addToBag}>Add to Bag</button>
					</div>
				</div>
			</div>
			<Modal
			  isOpen={this.state.showPhotoModal}
			  contentLabel="Example Modal"
				  style={{ content: {top: "0", bottom: "0", width: "100%",left: "0"} }}
			>
				<button className="modal-close-button margin5" onClick={evt=>this.setState({showPhotoModal: false})}>CLOSE</button> 
				<button className="margin5" onClick={this.previewClicked}>Prev</button> 
				<button className="margin5" onClick={this.nextClicked}>Next</button> 
				<img style={{width: "100%"}} src={this.piece.url[this.state.activeImageIndex]} />
			</Modal>			
		</div>);
	}
}