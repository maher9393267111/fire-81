import React from "react";
//import AdminLayout from "../../components/admin/adminLayout";
import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../functions/category";
import {
  useCollectionData,
  useDocumentData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { query, collection, orderBy,getFirestore } from "firebase/firestore";
import { db,app } from "../../firebase";
import { globaluse, useAuth } from "../../context/index";

const Category = () => {
  const [isupdate, setIsupdate] = useState(false);
  const [catid, setCatid] = useState("");

  const { } =useAuth();


  const q = query(
    collection(db, "Categories3"),
    orderBy("createdAt", "desc"),
    
  );
 // const [Cats, loading] = useCollectionData(q,{ idField: 'id' });

//console.log('Cats  ✈✈✈', Cats);


const [Cats, error] = useCollection(
  collection(getFirestore(app), 'Categories3'),
  {
    snapshotListenOptions: { includeMetadataChanges: true,idField: 'id'},
  }
);




  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const Createorupdate = async (values) => {
    // e.preventDefault();

    const { category } = values;
    console.log("Category--->>>", category);

    if (!isupdate) {
      createCategory(category);
     // setRefreshcategory(!refreshcategory);
    } 
    // else if (isupdate) {
    //   updateCategory(catid, category);
    //   setRefreshcategory(!refreshcategory);
    // }
  };

  return (
    <div>
      {/* <AdminLayout> */}
        <h1 className=" text-2xl mb-12 ml-20"> Create Category </h1>

        <div className=" sm:w-[300px]  ml-24 lg:w-[450px]">
          <Form
            onFinish={Createorupdate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Category Name " name="category">
              <Input placeholder="Category name" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                {isupdate ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* --maap all categories */}

        <div className="mt-12 ml-24 mb-12 pb-12">
          <div className=" ">
            {Cats?.docs.map((category, index) => {
              return (
                <div
                  key={index}
                  className=" my-2 font-bold  text-xl text-[#096dd9] "
                >
                  <div className=" w-[144px] flex gap-2">
                    <p
                      onClick={() => {
                        setCatid(category?.id);
                        console.log("catid--->>>", catid);
                        setIsupdate(!isupdate);
                      }}
                      className=" w-[85px]"
                    >
                      {category?.id}
                      {category.data().name}
                    </p>
                    <p
                      onClick={() => {
                        deleteCategory(category?.id);
                      //  setRefreshcategory(!refreshcategory);
                      }}
                      className=" ml-[13px] mt-[7px]"
                    >
                      <img
                        className=" w-4 h-4 rounded-full"
                        src="https://cdn1.iconfinder.com/data/icons/smallicons-controls/32/614397-x-256.png"
                        alt=""
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      {/* </AdminLayout> */}
    </div>
  );
};

export default Category;