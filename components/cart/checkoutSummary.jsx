import React from 'react';

const CheckoutSummary = ({userdata}) => {
    return (
        <div>
<div>

<div className="w-full ml-12   sm:ml-22  mr-12">
              {/* ----content start--- */}
              <div>
                {/* ---header-- */}

                <div>
                  <h1 className=" mb-6 sm:text-xl  lg:text-3xl font-bold">
                    Cart Summary
                  </h1>
                </div>

                {/* info products-- */}

                <div>
                  {userdata?.cart?.map((item, index) => {
                    return (
                      <div key={item.id} className="flex  gap-2 font-bold ">
                        <p>{item.name} x</p>

                        <p>{item.quantity}</p>

                        <p> = {item.price * item.quantity}</p>
                      </div>
                    );
                  })}

                  {/* ----total-- */}

                  <div className=" mt-4 border-t-2">
                    <h1 className=" pt-2 text-2xl ">
                      {" "}
                      Total Price:{userdata?.totalprice}
                    </h1>
                  </div>
                  </div>
                  </div>
                  </div>

</div>



        </div>
    );
}

export default CheckoutSummary;
