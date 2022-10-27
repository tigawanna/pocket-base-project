import React from "react";
import { TheInput } from "./TheInput";
import { TheButton } from './../TheButton';
import { TheSelect } from "./TheSelect";
import { TheFileInput } from "./TheFileInput ";

type FormError = { name: string; message: string };
interface FormOptions {
  field_name: string;
  field_type: string;
  default_value: string | number
  options?: { name: string; value: string }[]
}

type Props = {
  header: string;
  validate: (input: any) => boolean;
  submitFn: (input: any) => Promise<any>
  fields: FormOptions[]

};

type State = {
  value: string;
  input: any;
  error: FormError;
};

class TheForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  const state_input = {}
  this.props.fields.forEach((item=>{
    //@ts-ignore
   state_input[item.field_name]=item.default_value
  
  }))
    this.state = {
      value: "",
      input: state_input,
      error: { name: "", message: "" },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.setError = this.setError.bind(this);
    this.setFileInput = this.setFileInput.bind(this);
  }
  setError(error: FormError) {
    this.setState({ error: error });
  }
  setFileInput(file:string,file_key:string,input:{}) {
    // @ts-ignore
    input[file_key] = file
    this.setState({ input:input});
  }

  isValid() {
    return this.props.validate({
      input: this.state.input,
      setError: this.setError,
    });
  }
  async handleChange(event: React.ChangeEvent<any>) {

    const { value } = event.target;
    this.setState({
      input: { ...this.state.input, [event.target.id]: value },
    });
    if (event.target.files) {
      this.setState({
        input: { ...this.state.input, [event.target.id]: URL.createObjectURL(event.target.files[0]) }
      })
    }
    // this.setError({name:"",message:""})
  }

  async handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
 
    console.log("is valid: ", this.isValid());
    if (!this.isValid()) {
      console.log("the error ", this.state.error);
    }
    else {
      try {
        // this.setError({ name: "", message: "" });
        const result = await this.props.submitFn(this.state.input);

        console.log("save result === ", result);
        console.log("A name was submitted: ", this.state.input);
      } catch (err: any) {
        console.log("error adding item", err.message);
        this.setError({ name: "main", message: err.message });
      }

    }
  }

  render() {
    // const inputs = Object.entries(this.state.input)
    //  console.log("key and value ===",kv)   
    //  const inputs = Object.keys(this.state.input);
    return (
      <div className="w-full h-full flex flex-col items-center 
   r overflow-y-scroll scroll-bar m-1 p-1">
        <form
          className=" min-h-fit  m-1 p-1 w-[90%] md:w-[80%] text-base 
          font-normal flex flex-col items-center justify-center 
          border-2 rounded-md shadow-md shadow-slate-600"
          onSubmit={this.handleSubmit} >
          <div className="text-2xl font-bold p-1 m-1 w-full flex items-center justify-center ">
            {this.props.header}</div>
          {
            this.props.fields && this.props.fields.map((item, index) => {
            if(item.field_type === "select"){
              return (
                <TheSelect
                  key={index + item.field_name}
                  error={this.state.error}
                  handleChange={this.handleChange}
                  item={item}
                  input={this.state.input}
                />)
            }
           if(item.field_type === "file"){
                return (
                  <TheFileInput
                    key={index + item.field_name}
                    error={this.state.error}
                    handleChange={this.handleChange}
                    input={this.state.input}
                    item={item}
                  />)
               }
              if (item.field_type !== "file") {   
              return (
              <TheInput
                key={index + item.field_name}
                error={this.state.error}
                handleChange={this.handleChange}
                input={this.state.input}
                item={item}
                 />)
              }
            })
          }
          {
            this.state.error.name === "main" ?
              <div className="text-red-900 border border-red-500 p-2 m-1 w-[80%]
              break-words bg-red-100 text-[14px] rounded-sm
            ">{this.state.error.message}</div> : null
          }
   
          <div className="w-full p-1 flex items-center justify-center">
            <button className="bg-slate-900 border-2 p-2 text-xl hover:bg-purple-900 rounded-sm">
              submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default TheForm;
