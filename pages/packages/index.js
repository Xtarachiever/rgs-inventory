import Layout from "@/component/Layout";
import TextAreaInput from "@/component/inputs/TextArea";
import TextInput from "@/component/inputs/TextInput";
import SearchButton from "@/component/reusable-search/SearchButton";
import ImageHook from "@/hooks/ImageHook";
import React, { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Packages = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [imagesLoading, setImagesLoading] = useState(false)

  const [packages, setPackages] = useState([]);

  const {
    description,
    title,
    image,
    errors,
    handleSubmit,
    handleValueOnChange,
    reset,
  } = ImageHook();

  const handleImagePick = ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      setPreview(URL?.createObjectURL(file));
      setImageFile(file);

      handleValueOnChange("image", `${title}_productImage_.`);
    }
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    return () => {
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, [openModal]);

  const getProductImages = async () => {
    try {
        setImagesLoading(true)
      const res = await fetch("/api/products/get-product-images/", {
        method: "GET",
      });
      setImagesLoading(false)
      const data = await res.json();
      setPackages(data?.images);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductImages();
  }, [!openModal]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (preview !== "") {
        formData.append("productImages", imageFile, image);
        formData.append("description", values.description);
        formData.append("image", values.image);
        formData.append("title", values.title);
      }
      // const formDataArray = Array.from(formData.entries());
      // console.log(formDataArray);
      const res = await fetch("/api/products/upload-images/", {
        method: "POST",
        body: formData,
      });
      setLoading(false);
      const data = await res.json();
      if (res?.ok) {
        setPreview("");
        reset();
        setOpenModal(false);
        toast.success(data?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleImageDeletion = async (id) =>{
    try{
      const res = await fetch(`/api/products/delete-image?id=${id}`,{
        method:"DELETE"
      })
      const data = await res.json();
      if(data?.status){
        toast.success(data?.message);
        router.reload();
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <div className="">
        <ToastContainer limit={1}/>
        <SearchButton
          name={"images"}
          buttonName={"Add Images"}
          placeholder={"Search for Images"}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <div>
          {
            imagesLoading ? (
              <div className="loader"></div>
            ) : !loading && packages?.length === 0 ? (
              <p>No image Found</p>
            ) : packages?.length !== 0 ? (
              <div className="product_images mt-4 pt-8">
                {
                  packages?.map(({ productPic, title, _id }) => (
                    <div key={_id} className="relative images_container">
                      <div className="text-center max-w-[250px] h-[200px] overflow-hidden m-auto">
                        <img
                          src={productPic}
                          alt="product"
                          className="w-full h-[70%] object-contain"
                        />
                        <p className="py-3">{title}</p>
                      </div>
                      <div className="absolute left-0 py-4 top-0 h-full bg-bgLightBlack2 w-full delete_images" onClick={()=>handleImageDeletion(_id)}>
                        <RiDeleteBin5Line className="m-auto translate-y-[70px]" fontSize={'1.7rem'} color="white"/>
                      </div>
                    </div>
                ))
                }
              </div>
            ) : (
              <p>Something went wrong, please try again.</p>
            ) // Default fallback
          }
        </div>
        {openModal && (
          <div className="absolute w-full left-0 top-0 bg-bgLightBlack z-[10] h-[100vh]">
            <div className="bg-white top-[80px] relative w-[60%] m-auto px-8 py-10 h-[80%] overflow-scroll modal">
              <VscChromeClose
                className="absolute right-[25px] top-[20px] cursor-pointer"
                onClick={() => setOpenModal(false)}
              />
              <form
                className="w-[85%] m-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                {preview ? (
                  <div>
                    <img src={preview} alt="product" />
                    <div>
                      <button
                        type="submit"
                        className="bg-primary px-4 py-2 mt-3 text-white z-[1] relative cursor-pointer overflow-hidden"
                      >
                        Change Image
                        <input
                          type="file"
                          name="image"
                          className="absolute left-0 h-full w-full cursor-pointer opacity-0 top-0 z-[2]"
                          onChange={handleImagePick}
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative border-primary border-2 cursor-pointer border-dotted rounded-md text-center py-4 h-[150px] m-auto">
                    <p className="z-[-1] translate-y-[35%] text-center h-full">
                      <BsUpload
                        className="inline mr-2 font-semibold"
                        fontSize={"1.5rem"}
                      />
                      Upload an image
                    </p>
                    <input
                      type="file"
                      name="image"
                      className="absolute left-0 h-full w-full cursor-pointer bg-red-500 opacity-0 top-0 z-[2]"
                      onChange={handleImagePick}
                    />
                  </div>
                )}
                {errors?.image && <p>{errors?.image?.message}</p>}
                <div className="py-2 mt-3">
                  <TextAreaInput
                    name={"description"}
                    placeholder={"Description"}
                    value={description}
                    onChange={(e) =>
                      handleValueOnChange("description", e.target.value)
                    }
                  />
                </div>
                <div>
                  <TextInput
                    name={"title"}
                    placeholder={"Title"}
                    value={title}
                    onChange={(e) =>
                      handleValueOnChange("title", e.target.value)
                    }
                  />
                  {errors?.title && <p>{errors?.title?.message}</p>}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary px-6 py-2 mt-3 rounded-md text-white"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Packages;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
