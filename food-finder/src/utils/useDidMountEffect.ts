import React, { useEffect, useRef } from "react";

// https://stackoverflow.com/a/57941438
const useDidMountEffect = (func: Function, deps: any[]) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};

export default useDidMountEffect;
