import React from 'react';
import {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setsearchmode } from '../../store/global';
import { useAuth } from '../../context/index';
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
const { SubMenu, ItemGroup } = Menu;
import { toast } from "react-toastify";
const Filterbar = ({categories}) => {

const dispatch = useDispatch();
const {searchMode} = useSelector(state => state.global);
const {userinfo} = useAuth();
const [categoryIds, setCategoryIds] = useState([]);
const [ok, setOk] = useState(false);

const { ProductsBySelectedCategories  } = useAuth();


const handlemode = () => {
dispatch(setsearchmode(!searchMode));

}


// categories //

const showCategories = () =>
categories.map((c) => (
  <div className='my-2' key={c.id}>
    <Checkbox
      onChange={handleCheck}
      className="pb-2 pl-4 pr-4"
      value={c.id}
      name="category"
      checked={categoryIds.includes(c.id)}
    >
      {c.name}
    </Checkbox>
    <br />
  </div>
));




const handleCheck = (e) => {


  //  dispatch(setsearchtext(""));
  
   // setPrice([0, 0]);
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
  //  console.log('🔷️-🔷️-🔷️-🔷️',inTheState);

    setCategoryIds(inTheState);

if (inTheState.length !== 0  || inTheState.length > 0) {
  //dispatch(setsearchtext(""));
  dispatch(setsearchmode(true));
  ProductsBySelectedCategories(inTheState);
}

else  {

    dispatch(setsearchmode(false));

}



  };












    return (
        <div>
           

<div>


{/* --filter side start--- */}

<div className=' lg:mr-12'>


<Menu defaultOpenKeys={["1", "2"]} mode="inline">


<SubMenu
            key="1"
            title={
              <span className="h6">
                {/* <DownSquareOutlined />  */}
                Categories
              </span>
            }
          >
            <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
          </SubMenu>





    </Menu>









</div>



</div>



        </div>
    );
}

export default Filterbar;
