import pic1 from "../assets/pic1.jpg";
import { MdCheckCircle } from "react-icons/md";
import { BsPatchQuestionFill } from "react-icons/bs";
import { Footer } from "../components/Footer";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { HiOutlineDesktopComputer } from "react-icons/hi";

export const Home = () => {
    return (
        <div className="mt-28">
            <div className="mx-20">
                <div className="flex justify-center gap-20 items-center">
                    <div className="w-[45%]">
                        <h1 className=" mb-3 text-xl font-semibold">Welcome to <span className="text-indigo-500 text-2xl">CodeGenius –</span> <br />Where Innovation Meets Talent!</h1>
                        <p className="text-justify text-[1.1rem] text-zinc-300">At CodeGenius, we revolutionize the interview experience by harnessing the power of artificial intelligence. Our platform offers a cutting-edge, virtual interview solution that seamlessly blends technology and talent assessment. Say goodbye to traditional interview preparation and embrace a smarter, more efficient approach to your interview preparation.</p>
                    </div>
                    <div className="w-[45%]">
                        <img src={pic1} alt="interview poster" className="rounded-lg w-full" />
                    </div>
                </div>

                <div className="flex justify-center gap-20 items-center mt-28">
                    <div className="w-[45%]">
                        <img src={"https://cdn-iecbn.nitrocdn.com/GzFfiCiTDmTNrBbfBlfuFujqcUvPwRZl/assets/images/optimized/rev-882af3b/wp-content/uploads/2023/08/Untitled-design-25.png"} alt="interview poster" className="rounded-lg w-full" />
                    </div>
                    <div className="w-[45%]">
                        <h1 className=" mb-3 text-2xl font-semibold">How it work –</h1>
                        <p className="text-lg my-2 text-zinc-300">Experience interviews like never before with our state-of-the-art AI interview platform. Our intelligent system dynamically tailors questions based on candidate responses, ensuring a personalized and comprehensive evaluation. </p>
                        <ul className="flex flex-col gap-4 mt-5">
                            <li className="text-lg flex items-center gap-5"> <span className="rightPoint text-3xl"><MdCheckCircle /></span> <span>Create an Account</span></li>
                            <li className="text-lg flex items-center gap-5"> <span className="rightPoint text-3xl"><MdCheckCircle /></span> <span>Selete Course</span></li>
                            <li className="text-lg flex items-center gap-5"> <span className="rightPoint text-3xl"><MdCheckCircle /></span> <span>AI Interview Experience</span> </li>
                            <li className="text-lg flex items-center gap-5"> <span className="rightPoint text-3xl"><MdCheckCircle /></span> <span>Data Analysis and Reporting</span></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-28 mb-40">
                    <h1 className="my-14 text-4xl font-semibold text-center">Tailored solution to make you <br /><span className="text-indigo-300">Interview Ready</span></h1>
                    <div className="flex justify-between">
                        <div className="w-[24%] border border-indigo-500 p-5 rounded-2xl shadow-xl shadow-indigo-500/20">
                            <div className="qustionIcon text-5xl my-3"><BsPatchQuestionFill /></div>
                            <h3 className="font-semibold text-lg mb-2">Tailored interview questions</h3>
                            <p className="text-sm leading-6">Receive customised interview and follow-up questions aligned with the skills or role you’re practicing for.</p>
                        </div>
                        <div className="w-[24%] border border-indigo-500 p-5 rounded-2xl shadow-xl shadow-indigo-500/20">
                            <div className="qustionIcon text-5xl my-3"><LuMessagesSquare /></div>
                            <h3 className="font-semibold text-lg mb-2">Interactive interviews</h3>
                            <p className="text-sm leading-6">Experience realistic and dynamic interview sessions , that adapts to your responses.</p>
                        </div>
                        <div className="w-[24%] border border-indigo-500 p-5 rounded-2xl shadow-xl shadow-indigo-500/20">
                            <div className="qustionIcon text-5xl my-3"><FaRegStar /></div>
                            <h3 className="font-semibold text-lg mb-2">Comprehensive Feedback</h3>
                            <p className="text-sm leading-6">Gain insights on your interview performance, get tailored suggestions to enhance your interview skills.</p>
                        </div>
                        <div className="w-[24%] border border-indigo-500 p-5 rounded-2xl shadow-xl shadow-indigo-500/20">
                            <div className="qustionIcon text-5xl my-3"><HiOutlineDesktopComputer /></div>
                            <h3 className="font-semibold text-lg mb-2">Practice anytime, anywhere
                            </h3>
                            <p className="text-sm leading-6">Receive customised interview and follow-up questions aligned with the skills or role you’re practicing for.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
