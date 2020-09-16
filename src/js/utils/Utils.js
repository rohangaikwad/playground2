module.exports = {
    sortAlphabetically: (arr, key) => {
        arr.sort((a, b) => {
            if (a[key] < b[key]) { return -1; }
            if (a[key] > b[key]) { return 1; }
            return 0;
        })
    },
    getPropValue: (propName) => {
        return getComputedStyle(document.documentElement).getPropertyValue(propName).trim();
    },
    setPropValue: (propName, value) => {
        document.documentElement.style.setProperty(propName, value);
    }
}