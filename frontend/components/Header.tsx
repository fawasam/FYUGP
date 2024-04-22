"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useRedirect from "@/hooks/useRedirect";
import Image from "next/image";
import dynamic from "next/dynamic";
var Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});
import BookAnimatedHeader from "@/components/assets/books_animated_3.json";
import Icon from "@/components/assets/1.png";
import Icon2 from "@/components/assets/2.png";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Pathway",
    href: "/learn/degree",
    description: "Degree Pathway step to the Degree",
  },
  {
    title: "Colleges",
    href: "/college",
    description:
      "Colleges under Calicut University student can view college offering all courses and syllabus",
  },
  {
    title: "Community",
    href: "/community",
    description:
      "Discussion forum where all students and others can ask and share their thought",
  },
  {
    title: "Ask Me",
    href: "/learn/ask",
    description: "Enquiry and feedbacks",
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Enquiry and feedbacks",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Enquiry and feedbacks",
  },
  // {
  //   title: "Scroll-area",
  //   href: "/docs/primitives/scroll-area",
  //   description: "Visually or semantically separates content.",
  // },
  // {
  //   title: "Tabs",
  //   href: "/docs/primitives/tabs",
  //   description:
  //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  // },
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  let isAuthenticated = useSelector((state: RootState) => state.auth.userToken);
  let user = useSelector((state: RootState) => state.auth.userInfo);

  const userProfile: {
    title: string;
    href?: string;
  }[] = [
    {
      title: "Dashboard",
      href: `/profile/${user?.role}/${user?.username}/dashboard`,
    },
    {
      title: "Settings",
      href: `/profile/${user?.role}/${user?.username}/settings/edit-profile`,
    },
    {
      title: "Logout",
      href: `/`,
    },
  ];

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: BookAnimatedHeader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <header className="md:py-8 py-4 w-full m-auto  border-b flex-no-wrap fixed top-0 z-20  shadow-md shadow-black/5 lg:flex-wrap lg:justify-start  bg-background">
      <div className="flex items-center justify-between  sm:w-[75%] w-[90%] m-auto">
        <Link href={"/"} className="flex ">
          <Image
            src={theme === "dark" ? Icon : Icon2}
            alt={"icon"}
            width={200}
            height={100}
            className="w-100 md:w-200"
          />
          {/* <div className="flex flex-col">
            <span className="self-center text-md md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              MyDegree
            </span>
            <span>The student Partner</span>
          </div> */}
        </Link>
        <NavigationMenu className="hidden space-x-4 md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="">
                <span className="  text-base">Getting Started</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[700px] lg:grid-cols-[.75fr_1fr] h-full md:h-[400px] ">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/learn/what-is-fyugp"
                      >
                        <Lottie options={defaultOptions} />

                        <div className="mb-2 mt-4 text-lg font-medium">
                          What is FYUGP
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          FYUGP is fourth year undergraduated programme
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    href={"/learn/design-of-fyugp"}
                    title="Design of CU-FYUGP"
                  >
                    (CU-FYUGP) includes various components and options for
                    students to tailor their academic journey based on their
                    interests and goals. Here are some key aspects of the design
                  </ListItem>
                  <ListItem
                    href={"/learn/different-academic-pathways"}
                    title="Different Academic Pathways"
                  >
                    (CU-FYUGP) offers different academic pathways for students
                    to customize their educational experience based on their
                    interests and career goals
                  </ListItem>
                  <ListItem
                    href={"/learn/courses-and-credits"}
                    title="Course and Credit Structure"
                  >
                    (CUFYUGP) involve various components and guidelines to
                    ensure a comprehensive and structured academic experience
                    for students.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <span className="  text-base">Degree</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[700px] md:grid-cols-2 lg:w-[600px]  h-full md:h-[400px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {user?.role == "user" ? (
              <>
                {/* <NavigationMenuItem>
                  <Link href={`/community`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {" "}
                      <span className=" text-[16px]">Community</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/learn/ask`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <span className=" text-[16px]">Aks me</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem> */}
              </>
            ) : (
              ""
            )}
            <NavigationMenuItem>
              <Link href="/faq" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className=" text-base">FAQ</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className=" text-base">Contact</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* username header  */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <div className="flex space-x-2 items-center text-center">
                {!isAuthenticated ? (
                  <Button>
                    <Link href={"/auth/register"}>
                      <i className="fi fi-rr-user mr-2"></i>
                      SignUp
                    </Link>
                  </Button>
                ) : (
                  <>
                    <NavigationMenuTrigger className=" z-100">
                      <div className="flex flex-row items-center justify-center">
                        <Image
                          src={user.profileImage}
                          alt=""
                          className="w-6 h-6 object-cover rounded-lg"
                          width={6}
                          height={6}
                        />
                        {/* <i className="fi fi-rr-user mr-2"></i> */}
                        <span className="ml-2">{user.username}</span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4  md:grid-cols-1  ">
                        {user?.role == "user" ? (
                          <ListItem
                            title="Profile"
                            href={`/profile/${user?.username}`}
                          ></ListItem>
                        ) : (
                          ""
                        )}
                        {userProfile.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component?.href}
                          ></ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
                <div className="sm:block hidden  ">
                  {theme === "light" ? (
                    <i
                      className="fi fi-rr-moon h-6 w-6  text-xl"
                      onClick={() => setTheme("dark")}
                    ></i>
                  ) : (
                    <i
                      className="fi fi-rr-sun h-6 w-6  text-xl"
                      onClick={() => setTheme("light")}
                    ></i>
                  )}
                </div>
                <Sheet>
                  <SheetTrigger className="sm:hidden">
                    <i className="fi fi-br-menu-burger text-xl"></i>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                      {/* <SheetTitle>Are you absolutely sure?</SheetTitle>
                      <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </SheetDescription> */}
                    </SheetHeader>
                    <div className="flex flex-col mt-6">
                      <NavigationMenu>
                        <NavigationMenuList className="text-left flex-col">
                          <NavigationMenuItem>
                            <Link href="/contact" legacyBehavior passHref>
                              <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                              >
                                <span className=" text-base">
                                  Getting Started
                                </span>
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <Link href="/colleges" legacyBehavior passHref>
                              <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                              >
                                <span className=" text-base">Colleges</span>
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, onClick, ...props }, ref?: any) => {
  const dispatch = useDispatch();
  const { redirectTo, redirectToHomeIfLoggedIn } = useRedirect();
  let userData = useSelector((state: RootState) => state.auth);
  let { userInfo: user, userToken, isAuthenticated } = userData;

  const handleLogout = () => {
    redirectTo("/");
    dispatch(logout());
  };

  return (
    <li>
      <NavigationMenuLink asChild>
        {title == "Logout" ? (
          <Dialog>
            <DialogTrigger>
              <Button className="ml-2">
                <i className=" mr-2 fi fi-rr-sign-out-alt"></i>Logout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to logout?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => redirectTo("/")}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button onClick={handleLogout}>Logout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            href={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-base font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        )}
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Header;
