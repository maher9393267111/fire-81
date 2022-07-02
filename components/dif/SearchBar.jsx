import React from 'react';
import { useAuth } from '../../context';
import {useDispatch} from 'react-redux';
import {setsearchmode} from '../../store/global';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const SearchBar = () => {

    const dispatch = useDispatch();
const {setSearchText,searchText,SearchbyText,set}  = useAuth();


    const onSearch = (value) => {setSearchText(value)
      
dispatch(setsearchmode(true));
    SearchbyText(value)
    console.log("value is--->", searchText);
    console.log("value is--->", value);
    }


    return (
        <div>
            

<div className='sm:mt-2 lg:mt-4'>
<Search
className='w-24'
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
</div>

        </div>
    );
}

export default SearchBar;
