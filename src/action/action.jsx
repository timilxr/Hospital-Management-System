
export const extractionByRole = (data, role) => {
    let output = [];
    data.map(user=>{
        if (user.role === role) {
            output.push(user)
        }
    });
    return output;
}

// const extractionBy = (data, role) => {
//     let output = [];
//     data.map(user=>{
//         if (user.role === role) {
//             output.push(user)
//         }
//     });
//     return output;
// }
