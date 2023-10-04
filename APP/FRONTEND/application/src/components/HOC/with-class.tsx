import React, { ReactNode } from "react";

function WithClass<P extends WithClassProps>(props: P): ReactNode {
    return (
        <div
            className={props.classes}
        >
            {props.children}
        </div>
    )
}

export default WithClass;