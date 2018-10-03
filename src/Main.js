import React, { Component } from 'react';
import './style/Main.css';
import StockTable from "./StockTable";
import StockGraph from "./StockGraph";

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stocks: {},
            currentStockGraph: null
        };
        this.onStockClick = this.onStockClick.bind(this);
    }
    onStockClick(name){
        this.setState((prevState)=>{
            return {
                ...prevState,
                currentStockGraph: name
            }
        });
    };

    render(){
        const {stocks, currentStockGraph} = this.state;
        const currentStockGraphData = (stocks[currentStockGraph] && stocks[currentStockGraph].history);
        return (
            <div className="main">
                <StockTable stocksCurrentData = {Object.values(this.state.stocks)} onStockClick={this.onStockClick}/>
                <StockGraph historyData = {currentStockGraphData || []} stockName={currentStockGraph} diff={stocks[currentStockGraph] && stocks[currentStockGraph].diff}/>
            </div>
        );
    }

    componentDidMount(){
        const webSocketURL = "ws://stocks.mnet.website";
        const webSocket = new WebSocket(webSocketURL);
        webSocket.onmessage = (messageEvent) => {
            const data = (JSON.parse(messageEvent.data));
            this.setState((prevState)=>{
                let newStocks ={
                    ...prevState.stocks
                };
                data.forEach((stockData)=>{
                    const name =  stockData[0];
                    const price = stockData[1];
                    const prevStockObj = prevState.stocks[name] || {};
                    newStocks[name]=  {
                        name: name,
                        price: price,
                        diff: prevStockObj.price ? (price - prevStockObj.price) : null,
                        lastUpdatedSince: null,
                        lastUpdatedTime: Date.now(),
                        history: [
                            ...(prevStockObj.history || []),
                            price
                        ]
                    };
                });
                return {
                    ...prevState,
                    currentStockGraph: (prevState.currentStockGraph || data[0][0]),
                    stocks: newStocks
                };
            });
        };
        setInterval(() => {
            this.setState((prevState) => {
                let newStocks ={
                    ...prevState.stocks
                };
                Object.keys(newStocks).forEach((key) =>{
                    newStocks[key] = {
                        ...newStocks[key],
                        lastUpdatedSince : (Date.now() - prevState.stocks[key].lastUpdatedTime)/1000
                    }
                });
                return {
                    ...prevState,
                    stocks: newStocks
                };
            });
        }, 5000)
    }

}

export default Main;