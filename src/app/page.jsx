import { RiNextjsLine } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import UserCard from "@/components/UserCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthButton from "@/components/AuthButton";
export default async function Home() {
  //useCard kaj ta server kortechi
  //getting started docs
  //getServerSession user korle .env te NEXTAUTH_SECRET = key set korthe hoy jodi set na kore tahole user dekthe pabe na
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center gap-5 ">
      {/* server ui */}
      <p className="text-4xl font-bold text-center"> SERVER USER UI </p>
      <div className="border-2   p-3 text-center">
        <h1 className="text-indigo-100 text-center">{JSON.stringify(session)}</h1>
      </div>
      {/* userCard mardome amra user er information dekabo */}
      <UserCard />
      <div className=" flex gap-5 space-x-4 items-center">
        <FaReact size={40} className="animate-spin duration-1000 text-sky-400"></FaReact>
        <IoShieldCheckmarkSharp size={50} className="text-yellow-500" />
        <RiNextjsLine size={50}></RiNextjsLine>
        <SiMongodb size={50} className="text-green-600"></SiMongodb>
      </div>
      <div className="relative">
        <h2 className="text-5xl">NEXT AUTH</h2>
      </div>
      <div className="flex gap-5">
        <AuthButton />
      </div>
    </div>
  );
}
