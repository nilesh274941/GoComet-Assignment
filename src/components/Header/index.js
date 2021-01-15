import React, {Component} from 'react';
import Modal from 'react-modal';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state={
			showBagModal: false,
		}
	}
	render() {
		return (
			<div className="header1">
				<input type="text" className="margin5" placeholder="Search" />
				<button className="margin5">Search</button>
				<button className="icon-button margin5" title="WISHLIST"><i className="fa fa-bookmark"></i> WISHLIST</button>
				<button className="icon-button margin5" title="BAG" onClick={evt=>this.setState({showBagModal: true})}><i className="fa fa-shopping-bag"></i> BAG</button>
				<Modal
				  isOpen={this.state.showBagModal}
				  contentLabel="Example Modal"
//				  style={{ content: {height: "max-content",top: "100", bottom: "0", width: "100%",left: "0"} }}
				>
					<h3 style={{margin: "5px"}}>
						BAG
					</h3>
					{
						this.props.bag.map((product,productIndex)=>{
							return (<div key={productIndex} className="bag-item" style={{display: "flex"}}>
								<div className="imagesx">
									<img src={product.url[0]} style={{maxHeight: "200px"}}/>
								</div>
								<div className="piece-datax">
									<div className="brand">
										<h2 style={{margin: "2px"}}>
										{product.brand}
										</h2>
									</div>
									<div className="type">
										{product.type}
									</div>
									<div className="price-wrapper">
										<span className="price">{product.price} </span> 
										<span className="original-price"><s>{product.originalPrice}</s> </span>
										<span className="discount"> {parseInt(100-(product.price/product.originalPrice)*100)}% OFF</span>
										<br/>
										<span>Size: {product.selectedSize}</span>
									</div>								
									<button onClick={evt=>this.props.removeFromBag(product.id)} style={{margin: "10px"}}>REMOVE FROM BAG</button>
								</div>
							</div>);
						})
					}
					<button className="modal-close-button" onClick={evt=>this.setState({showBagModal: false})}>CLOSE</button>
				</Modal>				
			</div>
		);
	}
}