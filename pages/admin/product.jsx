import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { toast } from "react-toastify";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const { Option } = Select;
//import AdminLayout from "../../components/admin/adminLayout";
import {
  createProduct,
  updateproduct,
  deleteproduct,
} from "../../functions/category";

import { useState, useRef, useEffect } from "react";



import {
  getDownloadURL,
  ref,
  uploadString,
  getStorage,
  uploadBytes,
  deleteObject,
} from "firebase/storage";




  import {
    useCollectionData,
    useDocumentData,
    useCollection,
  } from "react-firebase-hooks/firestore";
  import { query, collection, orderBy,getFirestore,serverTimestamp,  addDoc,

    doc,

    updateDoc } from "firebase/firestore";
  import { db,app,storage } from "../../firebase";
  import {  useAuth } from "../../context/index";
import { Router } from "next/router";
  





const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Product = () => {
  //const {categories, subCategoies,products,categorysubs} = useSelector(state=>state.global);
const router = useRouter();
  const [Cats, error] = useCollection(
    collection(getFirestore(app), 'Categories3'),
    {
      snapshotListenOptions: { includeMetadataChanges: true,idField: 'id'},
    }
  );
  



  const [products] = useCollection(
    collection(getFirestore(app), 'Pro3'),
    {
      snapshotListenOptions: { includeMetadataChanges: true,idField: 'id'},
    }
  );
  



// const [Cat] = useCollection(
//     db.collection("Categories3")
//     //.orderBy("createdAt", "desc")
//   );




  const {} = useAuth();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subid, setSubid] = useState("");
  const [subName, setSubName] = useState("");
  const [isupdate, setIsupdate] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [productid, setProductid] = useState("");
  const [shipping, setShipping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [singleproductdata, setSingleproductdata] = useState({});
  const [discreption, setDiscreption] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
  );

  const handleproductid = (value) => {};

  const handleimages = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // generate a random string
    const filename = file?.name;
    // console.log("🕊️ 🕊️ 🕊️ 🕊️", filename);

    const testRef = ref(storage, `ecom3/${filename}`);

    await uploadBytes(testRef, file).then((snapshot) => {
      console.log("Uploaded image to storage success!");
    });

    // get image url from storage and set into state
    const down = await getDownloadURL(testRef);
    //setproductimage(down);

    setImages([...images, { image: down, name: filename }]);

    //   }
  };

  // delete image from state

  const deleteImage = async (index, photoname) => {
    const desertRef = ref(storage, `ecom3/${photoname}`);
    // console.log("🕊️ 🕊️ 🕊️ 🕊️", photoname);

    await deleteObject(desertRef)
      .then(() => {
        "Deleted! ";
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      })
      .then(() => {
        // filter out the deleted image
        setImages(images.filter((image, i) => i !== index));
      });
  };

  const handlecategoryChange = (value) => {
    console.log(`selected Category is--> ${value}`);
    setSelectedCategory(value);
  };

  const onFinish = (values) => {
    console.log("---🔴🔴 -----", values.product);

    const productdata = {
      name: values.product.name,
      price: values.product.price,
      images: images,
      quantity: values.product.quantity,
      shipping: values.product.shipping,
      categoryid: values.product.category,
     
      desc: discreption,
      rating: [
        {
          stars: 0,
          postedby: "",
        },
      ],
      sold: 0,
      color: values.product.color,
      createdAt: serverTimestamp(),
      //description:values.product.description,
    };

    createProduct(productdata);

    setImages([]);
  };

  return (
    <div className="mx-auto w-[433px]">
      {/* <AdminLayout> */}
      <h1>Product</h1>

      <>
        <div>
          <input onChange={handleimages} type="file" multiple />
        </div>

        {images.length}

        <div className=" grid  grid-cols-4">
          {images.map((image, index) => (
            <div key={index}>
              <img
                className=" w-20 h-20 rounded-full"
                src={image.image}
                alt="product"
              />
              <button onClick={() => deleteImage(index, image.name)}>
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/trash-256.png"
                  alt=""
                />
              </button>
            </div>
          ))}
        </div>

        {/* form--- */}

        <>
          <div className=" mr-16 mt-12">
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["product", "name"]}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["product", "color"]}
                label="Product Color"
                rules={[
                  {
                    type: "color",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["product", "price"]}
                label="price"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 1000,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              {/* // quantity */}

              <Form.Item
                name={["product", "quantity"]}
                label="quantity"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 1000,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item name={["product", "category"]} label="category">
                {/* <Input.TextArea /> */}
                <Select
                  defaultValue={"select some category"}
                  style={{
                    width: 220,
                    marginBottom: "17px",
                  }}
                  onChange={handlecategoryChange}
                >
                  {Cats?.docs?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category?.data().name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

           

              <Form.Item name={["product", "shipping"]} label="Shipping">
                {/* <Input.TextArea /> */}
                <Select
                  defaultValue={"select Shipping"}
                  style={{
                    width: 220,
                    marginBottom: "17px",
                  }}
                  //onChange={handleChange}
                >
                  <Option value="true">true</Option>

                  <Option value="false">false</Option>
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  {isupdate ? "update" : "create"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>

        <>
          <>
           
            <div className="mt-12 ml-4 mb-12 pb-12">
              <div className=" ">
                {products?.docs.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className=" my-2 font-bold  text-xl text-[#096dd9] "
                    >
                      <div className=" w-[400px] flex gap-4">
                        <div>
                          <img
                            className="  object-cover w-14 h-14 rounded-full"
                            src={product?.data().images[0]?.image}
                            alt=""
                          />
                        </div>

                        <p
                          onClick={() => {
                            handleproductid(product.id);
                            setProductid(product?.id);
                            console.log("sub--->>>", productid);
                      
                         //   setIsupdate(!isupdate);
                          }}
                          className=" w-[144px]"
                        >
                         <p
                        
                         
                         >{product?.data().name} </p> 
                          {/* {product?.id} */}
                        </p>
                        <p
                          onClick={() => {
                            deleteproduct(product.id);
                           setImages([])

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

                        <p
 onClick={() => {
    router.push(`/admin/${product?.id}`);

 }}

>edit</p>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        </>
      </>
      {/* </AdminLayout> */}
    </div>
  );
};

export default Product;
