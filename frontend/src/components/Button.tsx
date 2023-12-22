interface ButtonProps {
    text: String
}
export const Button: React.FC<ButtonProps> = ({ text }) => {
    return (
        <button>{text}</button>
    )
}
