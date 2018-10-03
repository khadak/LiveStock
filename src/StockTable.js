import React, { Component } from 'react';
import StockRow from './StockRow';
import './style/Global.css';
import cssStyle from './style/StockData.css';

class StockTable extends Component{
    render() {

        const {stocksCurrentData} = this.props;
        let tableContent;
        if(stocksCurrentData.length ===0){
            tableContent = (<div className="loader"> </div>)
        }
        else{
            tableContent = stocksCurrentData.map((stock, index)=>{
                const {name, price, diff, lastUpdatedSince } = stock;
                const onClick = ()=>{
                    this.props.onStockClick(name);
                };
                return (<StockRow key={name} isOdd={index%2} name={name} price={price} diff={diff} lastUpdatedSince={lastUpdatedSince} onClick={onClick}/>);
            });
        }



        return (

            <div className="stock-data">
                <div className={cssStyle.header}>
                    <div className={cssStyle.ticker}>Ticker</div>
                    <div className={cssStyle.price}>Price</div>
                    <div className={cssStyle.diff}>Diffrence</div>
                    <div className={cssStyle.time}>Last Update</div>
                </div>
                <div className={cssStyle.bodywrap}>
                    <div className={cssStyle.body}>
                        {tableContent}
                    </div>
                </div>
            </div>

        );
    }

}

export default StockTable;