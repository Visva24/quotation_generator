import React from 'react'
type ButtonColor = "red" | "blue" | "green" | "yellow" | "purple" | "pink" | "gray" | "black";

interface CustomButtonProps {
    name: string;
    color: ButtonColor;
    onclick?: () => void;
}
const Custombutton = ({ name, color, onclick }: CustomButtonProps) => {

    const colorClassMap: Record<ButtonColor, string> = {
        red: "bg-red-500 text-white",
        blue: "bg-blue-500 text-white",
        green: "bg-green-500 text-white",
        yellow: "bg-yellow-500 text-white",
        purple: "bg-purple-500 text-white",
        pink: "bg-pink-500 text-white",
        gray: "bg-gray-500 text-white",
        black: "bg-black text-white",
    };
    return (
        <>
            <button className={`flex justify-center items-center px-[15px] py-0.5 text-[14px] rounded-[4px] ${colorClassMap[color] || undefined}`} onClick={onclick}>
                {name}
            </button>
        </>
    )
}

export default Custombutton