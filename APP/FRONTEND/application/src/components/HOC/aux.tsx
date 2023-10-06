import React, {ReactNode} from "react";

function Aux<P extends AuxProps<ReactNode>>(props: P): ReactNode {
    return props.children
}

export default Aux;