// EditProfileImage.js
import React, { useRef, useState } from "react";
import axios from "axios";
import { updateUser } from "@/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useGetMeMutation,
  useUpdateMeMutation,
} from "@/redux/services/userApi";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const EditProfileImage = () => {
  const [updatedProfileImg, setupdatedProfileImg] = useState<
    any | string | File | null
  >(null);
  const profileImageEle = useRef<HTMLImageElement | any | null>(null);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.auth);
  const { userInfo: user } = userData;

  const [updateMe] = useUpdateMeMutation();
  const [getMe] = useGetMeMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setupdatedProfileImg(file);
    }
  };

  const handleUpload = async () => {
    if (setupdatedProfileImg) {
      const formData = new FormData();
      formData.append("image", updatedProfileImg);
      try {
        const response: any = await axios.post(
          "http://localhost:3000/api/v1/upload/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setupdatedProfileImg(response.data.imageUrl);
        const response2: any = await updateMe({
          profileImage: response.data.imageUrl,
        }).unwrap();
        const response3: any = await getMe(" ");
        dispatch(updateUser({ fields: response3?.data?.data?.user }));
        toast({
          title: "Profile Image Updated",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Image Upload failed",
          description: error,
        });
      }
    }
  };

  return (
    <div className="max-lg:center mb-5">
      <label
        htmlFor="uploadImg"
        id="profileImgLable"
        className="relative block w-48 h-48 bg-[#F3F3F3] rounded-full overflow-hidden"
      >
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
          Upload Image
        </div>
        <img
          src={`${user.profileImage}`}
          alt="image"
          ref={profileImageEle}
          // fill
        />
      </label>

      <input
        type="file"
        id="uploadImg"
        accept=".jpg, .png, .jpeg"
        hidden
        onChange={handleImageChange}
      />
      <button
        className="btn-light mt-5 max-lg:center lg:w-full px-10"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default EditProfileImage;
