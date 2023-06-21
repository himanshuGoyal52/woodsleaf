const getError = (err) => err.response && err.response.data && err.response.data.message 
? err.response.data.message
: err.message;

const dateConvert = (date) => {
    const months = ["January",  "February",  "March", "April"  , "May", "June", "July" , "August" , "September" , "October" , "November",  "December" ];
    let ans = "";
    ans = ans + date.slice(8,10) + " ";
    ans = ans + months[Number(date.slice(6,7))] + " ";
    ans = ans + date.slice(0,4);
    return ans;

}

export {getError , dateConvert};