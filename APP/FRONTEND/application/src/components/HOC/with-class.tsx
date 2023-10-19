import React, { ReactNode } from "react";

import { WithClassProps } from "@types";

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