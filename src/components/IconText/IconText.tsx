import {FC, ReactElement} from "react";
import {observer} from "mobx-react-lite";
import "./../../assets/scss/spinner.scss"

interface IIconTextProps {
    classes?: string,
    text: string,
    icon?: ReactElement,
    onClick?: () => void
}

const IconText: FC<IIconTextProps> = observer(({classes, text, icon, onClick}) => {
    return (
        <div
            className={classes}
            onClick={onClick}
        >
            {icon}
            {text}
        </div>
    )
})

export default IconText