import React from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import Layout from "../../components/Layout";
import { db } from "../../firebase";
import Card from "../../components/cards/Card";
const Proid = ({ product, category }) => {
  const router = useRouter();

  console.log("🔻🔻🔻🔻", category);
  const { images } = product;

  const { proid } = router.query;

  return (
    <div>
      <Layout title={"Single Product Page"}>
        <div>
          {category?.name}
          <div>
            {/* ---prouct side--- */}
            <div className=" my-20">
              <Card product={product} show={false} key={product.id} />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Proid;

export async function getServerSideProps(context) {
  const id = context.params.proid;
  const snapshot = await getDoc(doc(db, "Pro3", id));
  const snapshotCategory = await getDoc(
    doc(db, "Categories3", snapshot.data().categoryid)
  );

  const productdata = snapshot.data();

  if (!productdata) {
    return {
      notFound: true,
    };
  }

  // productdata.id = snapshot.id;

  // strignfy the data
  const product = JSON.parse(
    safeJsonStringify({ id: snapshot.id, ...snapshot.data() }) // needed for dates
  );

  const category = JSON.parse(
    safeJsonStringify({ id: snapshotCategory.id, ...snapshotCategory.data() }) // needed for dates
  );
  return {
    props: { product, category },
  };
}
