import React from 'react';
import cssStyle from './style/StockData.css';

const StockRow = (props) => {

    console.log(cssStyle.name);

    const {isOdd, name, price, diff, lastUpdatedSince} = props;
    let displayTime;
    if(lastUpdatedSince > 3600){
        displayTime = Math.round(lastUpdatedSince/60*60) + 'hour'

    }else if(lastUpdatedSince > 60){
        displayTime = Math.round(lastUpdatedSince/60) + 'min'

    }else if(lastUpdatedSince > 5){
        displayTime = Math.round(lastUpdatedSince) + ' sec'
    }else{
        displayTime = 'Updated few seconds ago'
    }
    const bodyClassName = cssStyle.content + ' ' + (isOdd ? "content-1" :  "content-2") +  (diff?(' ' + (diff<0? cssStyle.negative : cssStyle.positive)):'');
    return (
            <div className={bodyClassName} onClick={props.onClick}>
                <div className={cssStyle.name}>
                    {name}
                </div>
                <div className={cssStyle.price}>
                    {price.toFixed(2)}
                </div>
                <div className={cssStyle.diff}>
                    {diff?diff.toFixed(2):"-"}
                </div>
                <div className={cssStyle.time}>
                    {displayTime}
                </div>
            </div>
    )
};
export default StockRow;
