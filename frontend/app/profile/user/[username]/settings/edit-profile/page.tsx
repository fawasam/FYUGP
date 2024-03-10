"use client";
import Loader from "@/components/common/Loader";
import AnimationWrapper from "@/components/common/page-animation";
import InputBox from "@/components/ui/InputBox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  let bioLimit = 150;

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [characterLeft, setCharacterLeft] = useState(bioLimit);
  const [updatedProfileImg, setupdatedProfileImg] = useState(null);
  let profileImageEle = useRef<HTMLImageElement>();
  let editProfileForm = useRef<HTMLFormElement>(null);

  const { toast } = useToast();
  const dispatch = useDispatch();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;
  let { fullname, email, username, joinedAt, bio, role } = user;

  const handleImagePreview = (e: any) => {
    setCharacterLeft(bioLimit - e.target.value.length);
  };
  const handleImageUpload = () => {};
  const handleCharacterChange = () => {};
  const handleSubmit = () => {};
  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <form action="" ref={editProfileForm}>
          <h1 className="max-md:hidden">Edit Profile</h1>
          <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
            <div className="max-lg:center mb-5">
              <label
                htmlFor="uploadImg"
                id="profileImgLable"
                className="relative block w-48 h-48 bg-[#F3F3F3] rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                  Upload Image
                </div>
                {/* <img src={} alt="" ref={profileImageEle} /> */}
              </label>
              <input
                type="file"
                id="uploadImg"
                accept=".jpg, .png, .jpeg"
                hidden
                onChange={handleImagePreview}
              />
              <button
                className="btn-light mt-5 max-lg:center lg:w-full px-10"
                onClick={handleImageUpload}
              >
                Upload
              </button>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div>
                  <InputBox
                    name={"fullname"}
                    type={"text"}
                    value={fullname}
                    placeholder={"Full Name"}
                    disable={true}
                    icon={"fi fi-rr-user"}
                  />
                </div>
                <div>
                  <InputBox
                    name={"email"}
                    type={"email"}
                    value={email}
                    placeholder={"Email"}
                    disable={true}
                    icon={"fi fi-rr-envelope"}
                  />
                </div>
              </div>
              <InputBox
                type={"text"}
                name={"username"}
                value={username}
                placeholder={"Username"}
                icon={"fi fi-rr-at"}
              />
              <p className="text-dark-grey -mt-3">
                Username will use to search user and will be visible to all
                users{" "}
              </p>
              <textarea
                name="bio"
                maxLength={bioLimit}
                defaultValue={bio}
                className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
                placeholder="Bio"
                onChange={handleCharacterChange}
              ></textarea>
              <p className="mt-1 text-dark-grey">
                {characterLeft} characters left
              </p>
              {/* <p className="my-6 text-dark-grey">
                Add your social handles below{" "}
              </p> */}
              {/* social link  */}
              {/* <div className="md:grid md:grid-cols-2 gap-x-6">
                {Object.keys(social_links).map((key, i) => {
                  let link = social_links[key];
                  <i
                    className={`fi ${
                      key != "website" ? "fi-brands-" + key : "fi-rr-globe"
                    } text-xl hover:text-black`}
                  ></i>;
                  return (
                    <InputBox
                      key={i}
                      name={key}
                      type={"text"}
                      value={link}
                      placeholder={"https://"}
                      icon={
                        "fi " +
                        (key != "website" ? "fi-brands-" + key : " fi-rr-globe")
                      }
                    />
                  );
                })}
              </div> */}

              <Button
                className="btn-dark w-auto px-10  mt-4"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      )}
    </AnimationWrapper>
  );
};

export default EditProfile;
