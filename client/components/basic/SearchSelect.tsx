import Select from "react-select";
import {FC} from "react";
import {Props as SelectProps} from "react-select"

// <select> element that also allows searching the available options
const SearchSelect: FC<SelectProps> = (props) => {
    return <Select {...props} className={"search-select"} classNamePrefix={"search-select"}></Select>;
}


export default SearchSelect;