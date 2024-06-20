import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IHelloWorldProps } from "./IProps";
import { HelloWorld } from "./HelloWorld";
import {MySelectComponent} from "./PCFReactSelect"
import * as React from "react";

// Define the Option interface
interface Option {
    value: string;
    label: string;
  }

export class ReactSelectControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _context:ComponentFramework.Context<IInputs>;
    private _SelectedValue: any= {};

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._context=context;
        
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        let varSelectedValue = "";
        if(this._context.parameters.value.raw){
            varSelectedValue=this._context.parameters.value.raw;
        }
        const props: IHelloWorldProps = { name: 'Hello, World!',context: this._context ,selectedValue:varSelectedValue,onSelected: this.onSelect};
        return React.createElement(
            MySelectComponent, props
        );
    }
    

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
//     public getOutputs(): IOutputs {
//     if (this._SelectedValue) {
//         // Check if _SelectedValue is an array (multi-select) or a single option
//         if (Array.isArray(this._SelectedValue)) {
//             // For multi-select, map the array of selected options to their values
//             const selectedValues = this._SelectedValue.map(option => option.value);
//             return { value: selectedValues.join(',') }; // Join values into a comma-separated string
//         } else {
//             // For single-select, directly return the value of the selected option
//             return { 
//                 value: this._SelectedValue.value
//              };
//         }
//     } else {
//         // If no option is selected, return undefined or any default value you prefer
//         return { value: undefined };
//     }
//    }

public getOutputs(): IOutputs {
    let filteredRecords: any[] = []; // Adjust this type according to your input collection structure

    if (this._SelectedValue) {
        // Parse the input collection
        let varInput = "";
        if (this._context.parameters.JSONInput.raw) {
            varInput = this._context.parameters.JSONInput.raw;
        }
        const inputCollection: any[] = JSON.parse(varInput); // Adjust the type here

        // Retrieve the field name from props.context.parameters.FieldName.raw
        let fieldName = "";
        if (this._context.parameters.FieldName.raw) {
            fieldName = this._context.parameters.FieldName.raw;
        }

        // Check if _SelectedValue is an array (multi-select)
        if (Array.isArray(this._SelectedValue)) {
            // For multi-select, find all matching records in the input collection
            for (const selectedOption of this._SelectedValue) {
                const record = inputCollection.find(option => option[fieldName] === selectedOption.value);
                if (record) {
                    filteredRecords.push(record);
                }
            }
        } else {
            // For single-select, find the matching record in the input collection
            const record = inputCollection.find(option => option[fieldName] === this._SelectedValue.value);
            if (record) {
                filteredRecords.push(record);
            }
        }
    }

    return {
        value: filteredRecords.length > 0 ? JSON.stringify(filteredRecords) : undefined // Return the filtered records as a JSON string array
    };
}



    
    onSelect = (selectedValue: Option | Option[] | null): void => {
        if (selectedValue) {
            // Check if selectedValue is an array (multi-select) or a single option
            if (Array.isArray(selectedValue)) {
                // For multi-select, assign the array of selected options directly
                this._SelectedValue = selectedValue;
            } else {
                // For single-select, just assign the selected option directly
                this._SelectedValue = selectedValue;
            }
        } else {
            // If no option is selected, set _SelectedValue to null or any default value you prefer
            this._SelectedValue = null;
        }
    
        this.notifyOutputChanged();
    };
    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
