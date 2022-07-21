const formatPrice = (price) => {
    let formattedPrice;
    const arr = price.toString().split(".");
    if (arr.length > 1)
      formattedPrice = `${Number(arr[0]).toLocaleString()}.${arr[1]}`;
    else formattedPrice = Number(arr[0]).toLocaleString();

    return formattedPrice;
};

export default formatPrice;