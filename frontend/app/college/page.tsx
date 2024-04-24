"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/common/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AnimationWrapper from "@/components/common/page-animation";
import {
  useGetAllCollegeMutation,
  useSearchCollegeMutation,
} from "@/redux/services/collegeApi";
import { setCollege } from "@/redux/features/collegeSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataMessage from "@/components/common/Nodata";

const College = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [searchKey, setSearchKey] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [allColleges, setallColleges] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [
    getAllCollege,
    { isLoading, error, isSuccess },
  ] = useGetAllCollegeMutation();
  const [searchCollege] = useSearchCollegeMutation();

  let collegesData = useSelector((state: RootState) => state.college);
  let { collegeInfo: colleges } = collegesData;
  const filteredColleges = allColleges?.filter((college) =>
    college.collegename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = async (e: any) => {
    if (searchKey == "") {
      toast({
        title: "Please Provide place or college name",
      });
    } else {
      const response: any = await searchCollege(searchKey);
      dispatch(setCollege(response?.data));
    }
  };
  useEffect(() => {
    const getAllColleges = async () => {
      const response: any = await getAllCollege("");
      console.log(response);

      setallColleges(response?.data?.data?.colleges);

      dispatch(setCollege(response?.data));
    };
    getAllColleges();
    clearTimeout(typingTimeout);

    if (searchKey !== "") {
      const timeoutId: any = setTimeout(() => {
        getAllColleges();
      }, 500); // Adjust the delay (in milliseconds) as needed

      setTypingTimeout(timeoutId);
    }
  }, [searchKey, getAllCollege, dispatch]);

  return (
    <AnimationWrapper className="sm:w-[70%] w-[90%] m-auto min-h-[100vh]  py-[20px]">
      <section className="max-w-[1060px] m-auto   flex-grow   ">
        <div className=" flex items-center justify-center min-h-[240px] w-full bg-background text-center rounded-sm">
          <div className="flex items-center justify-center h-full">
            <h1 className="md:text-[48px] text-[36px] font-bold tracking-tighter text-center">
              Colleges Under Calicut University
            </h1>
          </div>
        </div>
        {isSuccess ? (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <Input
              type="text"
              className="px-3 py-2 "
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // onChange={(e: any) => setSearchKey(e.target.value)}
            />
            <Button className="px-3 py-2" onClick={handleSearch}>
              Search
            </Button>
          </div>
        ) : (
          ""
        )}
        {isLoading ? (
          <Loader />
        ) : !isSuccess ? (
          <NoDataMessage
            message={"Enquiry Data Unavailable!"}
            icon={"fi fi-rr-search-alt"}
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-12">
            {filteredColleges?.length === 0 ? <h2>No college Data</h2> : null}
            {filteredColleges?.map((college: any, i: number) =>
              college?.published ? (
                <div key={i}>
                  {isLoading ? (
                    <>
                      <Skeleton className=" w-full h-[200px] rounded-xl" />
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-[200px] mt-2" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </>
                  ) : (
                    <Link
                      // href={`/college/${college?.collegename.replace(/ /g, "-")}`}
                      href={`/college/${college?._id}`}
                      className="group flex flex-col justify-between"
                    >
                      <div className=" ">
                        <div className="border w-full h-[200px]  overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          {college?.picture ? (
                            <Image
                              priority
                              src={college?.picture}
                              alt={college?.collegename}
                              className="object-cover w-full h-full  group-hover:opacity-75 border"
                              width={300}
                              height={300}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700 uppercase">
                          {college.collegename}
                        </h3>
                        {/* <Badge variant="secondary" className="capitalize">
                      {college.type}
                    </Badge> */}
                        <p className="mt-1 text-lg font-medium text-gray-900 capitalize">
                          {college.place}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              ) : (
                ""
              )
            )}
          </div>
        )}
      </section>
    </AnimationWrapper>
  );
};

export default College;
