import React, {FC} from "react";
import styles from "./Button.module.scss";

type ButtonTypeType = "button" | "input"

interface ButtonProps {
    icon?: React.ReactNode;
    text: string;
    type?: ButtonTypeType;
}

const Button: FC<ButtonProps> = ({icon, text, type = "button"}) => {
    return (
        type === "input" ?
            <>
                <label htmlFor="file-upload" className={styles.button__white}>
                    {icon}
                    {text}
                </label>
                <input id="file-upload" type="file"/>
            </> :
            <button className={styles.button__white}>
                {icon}
                {text}
            </button>


    )
}

export default Button