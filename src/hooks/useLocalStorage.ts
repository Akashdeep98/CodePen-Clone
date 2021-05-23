import {useEffect, useState} from "react";

const defaultKeyPrefix = "code-pen-clone-";

const useLocalStorage = (key: string, initialValue: (string | (() => string))) => {

    const [value, setValue] = useState<string>(() => {
        const localStorageData = localStorage.getItem(defaultKeyPrefix + key);
        if (localStorageData) {
            return JSON.parse(localStorageData);
        }
        if (typeof initialValue === "string") {
            return initialValue;
        } else {
            return initialValue();
        }
    });

    useEffect(() => {
        localStorage.setItem(defaultKeyPrefix + key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export default useLocalStorage;