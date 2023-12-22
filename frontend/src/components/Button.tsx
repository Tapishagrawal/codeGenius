import { Link } from "react-router-dom"

interface ButtonProps {
    text: String,
    link: any
}
export const Button: React.FC<ButtonProps> = ({ text, link }) => {
    return (
        <Link to={link} className="bg-indigo-500 hover:bg-indigo-600 py-3 px-4 rounded-md font-bold">{text}</Link>
    )
}
