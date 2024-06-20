import * as React from 'react';
import Select, { GroupBase, MenuProps, components } from 'react-select';
import { useEffect, useState } from 'react';
import { IHelloWorldProps } from './IProps';
import { Icon } from '@fluentui/react/lib/Icon';


// Define the Option interface
interface Option {
    value: string;
    label: string;
  }
  
  // const options: Option[] = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ];
  
  export const MySelectComponent: React.FunctionComponent<IHelloWorldProps> = (props) => {
     const [defaultValue, setDefaultValue] = useState<Option | null>(null); // State to hold default value
  
    // const handleChange = (selectedOption: Option | null) => {
    //   setSelectedOption(selectedOption);
    //   console.log(`Option selected:`, selectedOption);

    // };
   const {onSelected}=props;

   let hoverBGColor = "Lightgrey";
   if(props.context.parameters.hoverBgColor.raw){
    hoverBGColor=props.context.parameters.hoverBgColor.raw;
   }
   let hoverBorderLeftWidth = "5";
   if(props.context.parameters.hoverBorderLeftWidth.raw){
    hoverBorderLeftWidth=props.context.parameters.hoverBorderLeftWidth.raw + "px";
   }
   let fontSize = "15";
   if(props.context.parameters.fontSize.raw){
    fontSize=props.context.parameters.fontSize.raw;
   }
   let HoverColour = "purple";
   if(props.context.parameters.HoverColour.raw){
    HoverColour=props.context.parameters.HoverColour.raw;
   }
   let varFontColour = "black";
   if(props.context.parameters.fontColor.raw){
    varFontColour=props.context.parameters.fontColor.raw;
   }
   let HoverBorderLeftColor = "purple";
   if(props.context.parameters.HoverBorderLeftColor.raw){
    HoverBorderLeftColor=props.context.parameters.HoverBorderLeftColor.raw;
   }
   let chevronBGColour = "purple";
   if(props.context.parameters.chevronBackgroundColour.raw){
    chevronBGColour=props.context.parameters.chevronBackgroundColour.raw;
   }
   let chevronColour = "white";
   if(props.context.parameters.chevronColour.raw){
    chevronColour=props.context.parameters.chevronColour.raw;
   }
   let varIconUp = "CaretSolidUp";
   if(props.context.parameters.iconUp.raw){
    varIconUp=props.context.parameters.iconUp.raw;
   }
   let varIconDown = "CaretSolidDown";
   if(props.context.parameters.iconDown.raw){
    varIconDown=props.context.parameters.iconDown.raw;
   }
   let Width = "328";
   if(props.context.parameters.Width.raw){
    Width=props.context.parameters.Width.raw + "px";
   }
   let Height = "40";
   if(props.context.parameters.Height.raw){
    Height=props.context.parameters.Height.raw + "px";
   }
   let dropdownMenuHeight = "200";
   if(props.context.parameters.DropdownMenuHeight.raw){
    dropdownMenuHeight=props.context.parameters.DropdownMenuHeight.raw + "px";
   }
   let borderRadius = "5";
   if(props.context.parameters.borderRadius.raw){
    borderRadius=props.context.parameters.borderRadius.raw + "px";
   }
   let PlaceHolder = "Select";
   if(props.context.parameters.PlaceHolder.raw){
    PlaceHolder=props.context.parameters.PlaceHolder.raw;
   }
   let textAlignment ="Left";
  if(props.context.parameters.TextAlignment.raw){
    textAlignment = props.context.parameters.TextAlignment.raw;
  }
  let isMultiSelect = false; // Initialize with a default value

  if (props.context.parameters.IsMultiSelect.raw) {
     // Convert boolean value to string and then lowercase
    isMultiSelect = props.context.parameters.IsMultiSelect.raw.toString().toLowerCase() === 'true';
  }
  let isVisible = true; // Initialize with a default value

  if (props.context.parameters.Visible.raw) {
     // Convert boolean value to string and then lowercase
    isVisible = props.context.parameters.Visible.raw.toString().toLowerCase() === 'true';
  }
  let isReset = false; // Initialize with a default value

  if (props.context.parameters.Reset.raw) {
     // Convert boolean value to string and then lowercase
     isReset = props.context.parameters.Reset.raw.toString().toLowerCase() === 'true';
  }

  // Convert numeric value to CSS text-align property
  let textAlignStyle = 'left';
  switch (textAlignment) {
    case '0':
      textAlignStyle = 'center';
      break;
    case '1':
      textAlignStyle = 'left';
      break;
    case '2':
      textAlignStyle = 'right';
      break;
    default:
      textAlignStyle = 'left'; // Default to left alignment
      break;
  }

   //alert(hoverBorderLeftWidth);

  //  const renderSelected = (selected: any[], onRemove: (arg0: any) => void) => {
  //   const width = 200; // Width of your container
  //   const itemWidth = 100; // Width of each item
  //   const maxItemsToShow = Math.floor(width / itemWidth);
  //   const remainingCount = selected.length - maxItemsToShow;

  //   if (remainingCount <= 0) {
  //     // If all items fit within the width, display all items
  //     return selected.map(option => (
  //       <div key={option.value} className="selected-item">
  //         {option.label}
  //         <span onClick={() => onRemove(option)}>&times;</span>
  //       </div>
  //     ));
  //   } else {
  //     // If there are more items than can fit, show some and display the count
  //     return (
  //       <>
  //         {selected.slice(0, maxItemsToShow).map(option => (
  //           <div key={option.value} className="selected-item">
  //             {option.label}
  //             <span onClick={() => onRemove(option)}>&times;</span>
  //           </div>
  //         ))}
  //         <div className="selected-item">
  //           +{remainingCount}
  //         </div>
  //       </>
  //     );
  //   }
  // };

  const calculateTextWidth = (text: string, fontSize: string) => {
    // Assume an average character width of 0.5 times the font size
    const averageCharWidth = 0.5 * parseInt(fontSize);
    // Calculate the width based on the number of characters
    const width = text.length * averageCharWidth;
    return width;
  };
  

  // const ValueContainer = ({ children, getValue, ...props }: any) => {
  //   const maxToShow = 3;
  //   const selectedValues = getValue(); // Retrieve currently selected values
  //   const displayChips = React.Children.toArray(children).slice(0, maxToShow);
  //   const shouldBadgeShow = selectedValues.length > maxToShow;
  //   const displayLength = selectedValues.length - maxToShow;
  
  //   // Calculate the length of each selected item
  //   const selectedItemsLengths = selectedValues.map((option: Option) => option.label.length);
  //   // Sum of lengths of all selected items
  //   const totalSelectedItemsLength = selectedItemsLengths.reduce((sum: any, length: any) => sum + length, 0);
  
  //   return (
  //     <>
  //     <components.ValueContainer {...props}>
  //       {displayChips}
  //       <div className="root">
  //         {shouldBadgeShow && `+ ${displayLength}`}
  //       </div>
  //     </components.ValueContainer>
  //     </>
  //   );
  // };

  const ValueContainer = ({ children, getValue, ...props }: any) => {
    const maxToShow = 3;
    const selectedValues = getValue(); // Retrieve currently selected values
    const displayChips = React.Children.toArray(children).slice(0, maxToShow);
    const shouldBadgeShow = selectedValues.length > maxToShow;
    const displayLength = selectedValues.length - maxToShow;
    const isFocused = props.selectProps.menuIsOpen; // Check if the control is focused (menu is open)
    const [menuIsOpen, setMenuIsOpen] = React.useState(false); // State to track menu open/close
    const [containerHeight, setContainerHeight] = React.useState(isFocused ? 'none' : '40px'); // State to track container height
  
    // Calculate the length of each selected item
    const selectedItemsLengths = selectedValues.map((option: Option) => (option && option.label ? option.label.length : 0));
    // Sum of lengths of all selected items
    const totalSelectedItemsLength = selectedItemsLengths.reduce((sum: any, length: any) => sum + length, 0);
  
    React.useEffect(() => {
      // Update the menu open/close state when the menu is opened or closed
      setMenuIsOpen(props.selectProps.menuIsOpen);
    }, [props.selectProps.menuIsOpen]);
  
    React.useEffect(() => {
      // Set container height to 40px after selecting and closing
      if (!isFocused && !menuIsOpen) {
        setContainerHeight('40px');
      }
    }, [isFocused, menuIsOpen]);
  
    return (
      <>
        <components.ValueContainer {...props}>
          {menuIsOpen ? ( // If menu is open, display all selected items
            <>
              {children}
            </>
          ) : ( // If menu is closed
            <>
              {displayChips}
              <div className="root" style={{ maxHeight: containerHeight }}>
                {shouldBadgeShow && `+ ${displayLength}`}
              </div>
            </>
          )}
        </components.ValueContainer>
      </>
    );
  };

  const wrapperStyle = {
    backgroundColor: 'white',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    marginTop: '5px',
    borderLeft: '5px solid purple'
  };
  
  const optionStyle = {
    color: 'black',
    marginLeft: '5px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  };
  
    //custom styles for react select control
    const customStyles = {
        control: (base: any, state: any) => ({
          ...base,
          fontSize: `${fontSize}px`,
          fontWeight: '500',
          width: Width,
          height:state.isFocused ? 'none' : '40px', // Conditionally set Height
          maxHeight: state.isFocused ? 'none' : '40px', // Conditionally set maxHeight
          overflowY: 'hidden', // Enable vertical scrolling if the content exceeds the max height
          minWidth:'328px',
          color:varFontColour,
          borderRadius:borderRadius,
          backgroundColor: 'white', // Background color of the dropdown container
          border: `1px solid ${state.isFocused ? "purple" : "purple"}`, // Border color based on state
        }),
        indicatorSeparator: (base: any) => ({
          ...base,
          // Hide the separator between dropdown indicator and placeholder
          display: 'none',
        }),
        indicatorsContainer: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: chevronBGColour, // Add your desired background color here
        }),
        option: (base: any, { data, isDisabled, isFocused, isSelected }: any) => {
          const color = varFontColour; // Example color logic
          return {
            ...base,
            //paddingLeft: isSelected ? '10px' : '0',
            backgroundColor: isSelected ? 'lightgray' : 'white',
            color: isSelected ? 'purple' : color,
            borderLeft: isSelected ? `${hoverBorderLeftWidth} solid ${HoverBorderLeftColor}` : color,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            fontSize: `${fontSize}px`,
            width: Width,
            fontWeight: '700',
            marginTop:'4px',
            marginBotton:'4px',
            maxWidth: Width, // Set your desired maxWidth here
            wordWrap: 'break-word', // Allow text wrapping
            ':hover': {
              fontSize: `${parseInt(fontSize) + 1}px`,
              fontWeight: 'bold',
              color: HoverColour,
              paddingLeft:'10px',
              boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
              borderLeft: `${hoverBorderLeftWidth} solid ${HoverBorderLeftColor}`,
              backgroundColor: hoverBGColor,
             // marginTop:'4px',
              //marginBotton:'4px',
              
            },
          };
        },
        separator: { // Styles for the separator
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '2px', // Adjust the width of the separator as needed
          backgroundColor: 'black', // Color of the separator
        },
        menu: (base: any) => ({
          ...base,
          minWidth:'328px',
          width: Width, // Set the width here for the options container
          textAlign: textAlignStyle,
          borderRadius:borderRadius,
          maxHeight: dropdownMenuHeight, // Set the max height for the menu container
          overflowY: 'auto', // Enable vertical scrolling if the content exceeds the max height
        }),
        multiValue: (base: any) => ({
          ...base,
          backgroundColor: "Lightgrey", // Change the background color of the selected option
          borderRadius: '4px', // Optional: Add border radius for rounded corners
          padding: '2px 6px', // Optional: Adjust padding for better appearance
          maxHeight: '40px', // Adjust the maximum height as needed
          overflowY: 'hidden', // Enable vertical scrolling
          maxWidth: '80px', // Adjust the maximum height as needed
          overflowX: 'hidden', // Enable vertical scrolling
          whiteSpace: 'nowrap', // Prevent text from wrapping
          textOverflow: 'ellipsis', // Display ellipsis (...) if the text exceeds the maximum width
        }),
        MultiValueLabel: ({ children, ...props }: any) => ({
          ...props,
          maxHeight: '40px', // Set the maximum height of the multi-value label
          overflowY: 'hidden', // Hide vertical overflow
          whiteSpace: 'nowrap', // Prevent text from wrapping
          textOverflow: 'ellipsis', // Display ellipsis (...) if the text exceeds the maximum width
        }),
        multiValueRemove: (base: any, state: any) => ({
          ...base,
          ':hover': {
            backgroundColor: 'purple', // Change the hover color here
            color: 'white', // Change the text color on hover if needed
          },
        }),
       };

       const [isOpen, setIsOpen] = useState(false); // State to track if dropdown is open

       const onMenuOpen = () => {
        console.log('Dropdown opened');
        setIsOpen(true);
       };

       const onMenuClose = () => {
        console.log('Dropdown closed');
        setIsOpen(false);
       };
  
       const DropdownIndicator = (props: any) => {
        // Render the custom caret down or up icon based on isOpen state
        return (
          <div {...props.innerProps} style={{ padding: '8px',transition: 'transform 1s ease',color:chevronColour}}>
            {isOpen ? <Icon iconName={varIconUp} /> : <Icon iconName={varIconDown} />}
          </div>
          );
        };

  let optionsprop ="";
  if(props.context.parameters.JSONInput.raw){
    optionsprop = props.context.parameters.JSONInput.raw;
  }
  let fieldName ="";
  if(props.context.parameters.FieldName.raw){
    fieldName = props.context.parameters.FieldName.raw;
  }

  const [options, setOptions] = useState<Option[]>([]);

  // Default options when the component is added
  const defaultOptions: Option[] = [
    { value: 'testoption1', label: 'Option 1' },
    { value: 'testoption2', label: 'Option 2' },
    { value: 'testoption3', label: 'Option 3' },
    { value: 'testoption4', label: 'Option 4' },
    { value: 'testoption5', label: 'Option 5' }
  ];

  const handleReset = () => {
    // Reset the selected value or any other state to default
    setDefaultValue(null);
   };

   const onSelectedFunction = props.onSelected ?? (() => {});

  const onSelectChoice = (selectedchoice: any) => {
    onSelectedFunction(selectedchoice);
  };

  useEffect(() => {
    // Set default options when component mounts
    setOptions(defaultOptions);
  }, []);

  useEffect(() => {
    setDefaultValue(null);
    // console.log('DefaultOptionInput changed:', props.context.parameters.DefaultOptionInput.raw);
    // if (props.context.parameters.DefaultOptionInput.raw) {
    //   const newValue = { label: props.context.parameters.DefaultOptionInput.raw, value: props.context.parameters.DefaultOptionInput.raw };
    //   setDefaultValue(newValue);
    //   console.log('New default value:', newValue);
    // }
    console.log('DefaultOptionInput changed:', props.context.parameters.DefaultOptionInput.raw);
    const input = props.context.parameters.DefaultOptionInput.raw;
    
    if (input && input.trim() !== "" && input !== "val") {
      try {
        // Attempt to parse the input as a JSON object
        const record = JSON.parse(input);
          // Extract the value for the specified fieldName from the record
          //let defaultValue = { label: record[0][fieldName], value: record[0][fieldName] };
          const defaultValue = record.map((record: any) => ({
            label: record[fieldName],
            value: record[fieldName]
          }));
          console.log(defaultValue);
          setDefaultValue(defaultValue as Option);
          console.log('Setting default value based on entire record:', defaultValue);
          onSelectChoice(defaultValue);
      } catch (error) {
        // Log a message or handle if there's an error parsing the input
        console.error('Error parsing input record:', error);
      }
    } else {
      // Log a message or handle if the input is null
      console.error('DefaultValueInput is null.');
    }
    
  //setting the fieldName values as options to the dropdown
    try {
      if(optionsprop.trim() !== "" && optionsprop != "val"){
        //if(optionsprop){
         const parsedOptions = JSON.parse(optionsprop)
         const fieldNames = Object.keys(parsedOptions[0]);
         //console.log(fieldNames);
         //console.log(fieldNames.includes(fieldName));
          if (fieldNames.includes(fieldName)) {
            // Map the options to the Option format using the input fieldName
              const mappedOptions = parsedOptions.map((item: any) => ({
              value: item[fieldName],
              label: item[fieldName],
          }));
             setOptions(mappedOptions); // Set the mapped options
          }
          else {
            // If the input fieldName is not present, alert a warning
            const invalidOption = [{ label: 'Invalid Field Name', value: 'Invalid Field Name',isDisabled: true }];
            setOptions(invalidOption);
          }
        }
        else{
          setOptions(defaultOptions);
        }
  
        } catch (error) {
          console.error("Error parsing options:", error);
          setOptions([]);
        }
        if(isReset){
          setDefaultValue(null);
        }
  }, [props.context.parameters.DefaultOptionInput.raw,props.context.parameters.JSONInput.raw,fieldName,isReset]);


  // let defaultvalue:any = { label: defaultOption, value: defaultOption };
  //alert(JSON.stringify(defaultValue));

  // Handle change in Select component
  //const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(null);
  // const handleChange = (selectedOptions: Option | Option[] | null) => {
  //   setSelectedValue(selectedOptions as Option | null);

  // Handle change in Select component
  // const handleChange = (selectedOptions: Option | Option[] | null) => {
  //   setSelectedValue(selectedOptions as Option | null);

  //   // Execute onchange logic from multiline text property
  //   if (props.context.parameters.Onchange.raw) {
  //     try {
  //       // Format the selected options into a readable string
  //       const selectedValueString = formatSelectedOptions(selectedOptions);
  //       // Evaluate the JavaScript code from the property bag with the selected value as a parameter
  //       eval(props.context.parameters.Onchange.raw.replace('${selected}', selectedValueString));
  //     } catch (error) {
  //       console.error("Error executing onchange logic:", error);
  //     }
  //   }
  // };

  // // Function to format selected options into a readable string
  // const formatSelectedOptions = (selectedOptions: Option | Option[] | null): string => {
  //   if (!selectedOptions) return ''; // Return an empty string if no options are selected

  //   if (Array.isArray(selectedOptions)) {
  //     // If multiple options are selected, format each option
  //     return selectedOptions.map(option => `${option.value}`).join(', ');
  //   } else {
  //     // If only one option is selected, format it
  //     return `${selectedOptions.value}`;
  //   }
  // };

  // Return null if component is not visible
    if (!props.context.parameters.Visible) {
    return null;
   }

   const MultiValueLabel = ({ children, innerProps }: any) => {
    const title = typeof children === 'string' ? children : undefined;
    return (
      <div {...innerProps} className="multi-value-label" title={title}>
        {children}
      </div>
    );
  };



 // console.log(defaultValue);
//alert(isVisible)
  return (
    <div style={{ width: '200px',display: isVisible ? 'block' : 'none' }}>
        <Select
          //onChange={handleChange}
          //onChange={onSelectDate}
          value={defaultValue}
          styles={customStyles}
          options={options}
          isMulti={isMultiSelect}
          placeholder={PlaceHolder}
          onMenuOpen={() => setIsOpen(true)} // Set isOpen to true when menu is opened
          onMenuClose={() => setIsOpen(false)} // Set isOpen to false when menu is closed
          //components={{ DropdownIndicator}} // Pass isOpen to DropdownIndicator
          components={{
            // MultiValueLabel: ({ children, ...props }) => (
            //   <div
            //     {...props}
            //     className="multi-value-label"
            //     title={typeof children === 'string' ? children : undefined}
            //   >
            //     {children}
            //   </div>
            // ),
            // Option: (props) => (
            //   <div
            //     style={wrapperStyle}
            //     onMouseEnter={props.innerProps.onMouseEnter}
            //     onMouseLeave={props.innerProps.onMouseLeave}
                
            //   >
            //     <div style={optionStyle}>
            //       <components.Option {...props} />
            //     </div>
            //   </div>
            // ),
            MultiValueLabel,
           // Menu: CustomMenu,
            DropdownIndicator: ({ ...props }) => (
              <DropdownIndicator {...props} isOpen={isOpen} />
            ),
           ValueContainer
          }}
          hideSelectedOptions={false}
          //isSearchable // Enable search bar within the control
          isClearable={false}
          closeMenuOnSelect={false}
          onChange={(selectedOption, actionMeta) => {
            onSelectChoice(selectedOption);
            if (selectedOption) {
              setDefaultValue(selectedOption as Option); // Assuming newValue is an Option
            }
          }}
          getOptionLabel={(option: { label: any; }) => option.label} // Ensure this returns a string
          getOptionValue={(option: { value: any; }) => option.value}
        />
    </div>
  );
  };