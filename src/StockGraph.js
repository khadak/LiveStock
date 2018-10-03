import { Sparklines, SparklinesLine,SparklinesReferenceLine } from 'react-sparklines';
import React, { Component } from 'react';
import './style/Global.css';
import cssStyle from './style/StockGraph.css';

class StockGraph extends Component {

    render() {
        console.log(Sparklines);
        const {historyData, stockName, diff} = this.props;
        let color;
        if(!diff){
            color='blue';
        }
        else if(diff>0){
            color='green';
        }
        else{
            color='red';
        }
        return(
            <div className="stock-graph">
                <div className={cssStyle.caption}>Stock: {stockName}</div>
                <div className={cssStyle.body}>
                    {
                        stockName?(
                            <div className={cssStyle.content}>
                                <Sparklines data={historyData} margin={5}>
                                    <SparklinesReferenceLine style={{stroke: "#A9A9A9"}} />
                                    <SparklinesLine color={color} />
                                </Sparklines>
                            </div>
                        ):(
                            <div className="loader">

                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default StockGraph;