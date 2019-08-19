import React, { Component } from "react";
import { get } from 'lodash';


export class Products extends Component {
  state = {
    products: [],
    value: "",
    loading: false
  };
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.callApi = this.callApi.bind(this);
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  callApi(event) {
    this.setState({ loading: true });
    const value = this.state.value 
    fetch(`https://api.mercadolibre.com/sites/MLU/search?q=${value}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data.results, loading: false });
      })
      .catch(console.log);
  }

  componentDidMount() {
    
  }

  render() {
    const { products, loading } = this.state;

    return (
      <div className="container">
        <div className="ui action input">
          <input type="text" placeholder="Search..." onChange={this.handleChange} />
          <button className="ui button" onClick={this.callApi} >Search</button>
        </div>
        { loading && <div>Cargando resultados...</div>}
    
        <h1>Products</h1>
        <div className="ui nine column grid">
          {products.map((product, i) => (
            <div className="column" key={i}>
              <div className="ui fluid card">
                <div className="image">
                  <img src={product.thumbnail} />
                </div>
                <div className="content">
                  <div className="header">{product.title}</div>
                  <div className="description">
                    {get(product, 'installments.currency_id')}
                    {get(product, 'installments.amount')}
                    <a href={product.permalink}> IR </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
