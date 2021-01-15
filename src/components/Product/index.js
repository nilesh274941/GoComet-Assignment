import React, {Component} from 'react';
import './styles.css';

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state={
			slideShowRunning: false,
			intervalId: null,
			activeImageIndex: 0,
		}
		this.startSlideShow=(evt)=>{
			if(!this.state.slideShowRunning) {
				this.state.intervalId=setInterval((evt)=>{
					let index=this.state.activeImageIndex+1;
					if(index===4) index=0;
					this.setState({activeImageIndex: index});
				},1000);
				this.setState({
					slideShowRunning: true,
				});
			}
		}
		this.stopSlideShow=(evt)=>{
			if(this.state.slideShowRunning) {
				clearInterval(this.state.intervalId);
				this.setState({
					activeImageIndex: 0,
					intervalId: null,
					slideShowRunning: false,
				});
			}
		}
		this.redirectToDetails=(evt)=>{
			this.props.history.push(`/details/${this.props.piece.id}`);
		}
	}
	render() {
		return (
			<div className="product">
				<div className="product-wrapper"  onMouseOver={this.startSlideShow} onMouseOut={this.stopSlideShow} onClick={this.redirectToDetails}>
					<div className="image-wrapper">
						<img className="product-image" src={this.props.piece.url[this.state.activeImageIndex]} />
					</div>
					<div className="product-details">
						<div className="brand">
							{this.props.piece.brand}
						</div>
						<div className="type">
							{this.props.piece.type}
						</div>
						<div className="price-wrapper">
							<span className="price">{this.props.piece.price} </span> 
							<span className="original-price"><s>{this.props.piece.originalPrice}</s> </span>
							<span className="discount"> {parseInt(100-(this.props.piece.price/this.props.piece.originalPrice)*100)}% OFF</span>
						</div>
						<div className="hover-options">
							<div className="hover-options-wrapper">
								<div className="part1">
									<button className="show-similar-button"><i className="fa fa-clone"></i> VIEW SIMILAR</button>
								</div>
								<div className="part2">
									<div className="slide-show-dots">
										{
											[0,1,2,3].map((i)=>{
												const className=(i===this.state.activeImageIndex)?"fa fa-circle":"fa fa-circle-o";
												return <span> <i className={className}></i> </span>
											})
										}
										<span></span>
									</div>
									<button className="add-to-wishlist-button">WISHLIST</button>
									<div className="size-container">Sizes: 
									{
										this.props.piece.sizes.map((size)=>{return <span> {size}, </span>})
									}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}