import React from 'react'
import { IconContext, IconType } from "react-icons";

type MyProps = {
  // using `interface` is also ok
  Icon: IconType;
  size: string;
  color: string;
  iconstyle?:string;
  iconAction?: () => any;
};
type MyState = {
  iconstyle: string;
};
export class TheIcon extends React.Component<MyProps, MyState> {
   constructor(props:MyProps) {
    super(props)
    this.state = { iconstyle:this.props?.iconstyle?this.props?.iconstyle:"" };
    this.clickAction = this.clickAction.bind(this); 
    }
    clickAction(){
      if(this.props.iconAction){
      console.log("click action")
      return this.props.iconAction()
      }
      return console.log("")
      }
     render() {
    return (

      <div>
        <IconContext.Provider value={{ size:this.props.size,color:this.props.color,
          className:this.state.iconstyle}}>
            <this.props.Icon onClick={()=>this.clickAction()}/>
        </IconContext.Provider>
    
      </div>
    );
  }
}
