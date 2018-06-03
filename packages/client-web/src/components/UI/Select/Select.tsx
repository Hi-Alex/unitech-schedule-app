import * as React from 'react';

export interface InputProps {
  label: string;
  value?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: any;
};

export class Select extends React.Component<InputProps>{
   render() {
     const { label, value, options, onChange } = this.props;
     return (
       <div>
         <label>{label}</label>
         <select
           value={value}
           onChange={onChange}>
           {options.map(option => (
             <option key={option.value} value={option.value}>
               {option.label}
             </option>
           ))}
         </select>
       </div>
     );
   }
}