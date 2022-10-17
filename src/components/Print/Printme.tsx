import React from 'react'
import { TheTable } from 'table-for-react';



type MyProps = {
  // using `interface` is also ok
title:string  
ref: React.MutableRefObject<null>
header:{name:string,prop:string,type:string,editable:boolean}[],
rows:any[]
};
type MyState = {
  title:string
  header:{name:string,prop:string,type:string,editable:boolean}[],
  rows:any[]
}

export class PrintThis extends React.Component<MyProps, MyState> {
    constructor(props:any){
        super(props);
        this.state={
            header:this.props.header,
            rows:this.props.rows,
            title:this.props.title
        }

    }

    render() {

      return (
        <div className='m-5 text-black'>
         <div  className="capitaliza text-xl font-bold m-1">{this.state.title}</div> 
        <TheTable
         rows={this.state.rows}
         header={this.state.header}
          />
      </div>
      );
    }
  }
